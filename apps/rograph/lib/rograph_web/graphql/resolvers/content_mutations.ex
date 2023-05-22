defmodule RographWeb.Graphql.Resolvers.ContentMutations do
  alias Rograph.Uploaders.ImageUploader
  alias Rograph.Content.Post
  alias Rograph.Content.Image
  alias Rograph.Content.Orsic
  alias Rograph.Content.Helper
  alias Rograph.Repo
  alias RographWeb.Graphql.HandleChangesetError
  import Ecto.Query

  def create_image(
        _parent,
        # no pattern matching here as description is optional
        args,
        %{
          context: %{
            user: user
          }
        }
      ) do
    image_url = ImageUploader.save_file!(args.image)

    {_, width, height, _} = ExImageInfo.info(File.read!(args.image.path))

    description = Map.get(args, :description)

    changeset =
      %Image{}
      |> Image.changeset(%{
        image: image_url,
        width: width,
        height: height,
        description: description,
        post: %{
          user: user,
          slug: Helper.generate_slug(description)
        }
      })
      |> Repo.insert()

    case changeset do
      {:ok, image} ->
        {:ok, image}

      {:error, changeset} ->
        {:error, HandleChangesetError.handle(changeset)}
    end
  end

  def update_image(
        _parent,
        # no pattern matching here as description and image are optional
        args,
        %{
          context: %{
            user: user
          }
        }
      ) do
    prev_image =
      Repo.one!(
        from(i in Image,
          join: p in assoc(i, :post),
          where: p.slug == ^args.slug,
          preload: [post: :user]
        )
      )

    %{image_url: image_url, width: width, height: height} =
      case Map.get(args, :image) do
        nil ->
          %{image_url: prev_image.image, width: prev_image.width, height: prev_image.height}

        _ ->
          image_url = ImageUploader.save_file!(args.image)

          {_, width, height, _} = ExImageInfo.info(File.read!(args.image.path))
          %{image_url: image_url, width: width, height: height}
      end

    changeset =
      prev_image
      |> Image.changeset(%{
        image: image_url,
        width: width,
        height: height,
        description: Map.get(args, :description, prev_image.description)
      })
      |> Repo.update()

    case changeset do
      {:ok, updated_image} ->
        {:ok, updated_image}

      {:error, changeset} ->
        {:error, HandleChangesetError.handle(changeset)}
    end
  end

  def create_orsic(
        _parent,
        %{
          content: content
        },
        %{
          context: %{
            user: user
          }
        }
      ) do
    post_changeset = %Post{}

    changeset =
      %Orsic{}
      |> Orsic.changeset(
        %{
          content: content
        },
        user,
        post_changeset
      )
      |> Repo.insert()

    case changeset do
      {:ok, orsic} ->
        {:ok, orsic}

      {:error, changeset} ->
        {:error, HandleChangesetError.handle(changeset)}
    end
  end
end
