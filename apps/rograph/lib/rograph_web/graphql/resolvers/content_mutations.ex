defmodule RographWeb.Graphql.Resolvers.ContentMutations do
  alias Rograph.Uploaders.ImageUploader
  alias Rograph.Content.Post
  alias Rograph.Content.Image
  alias Rograph.Content.Orsic
  alias Rograph.Repo
  alias RographWeb.Graphql.HandleChangesetError

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

    post_changeset = %Post{}

    changeset =
      %Image{}
      |> Image.changeset(
        %{
          image: image_url,
          width: width,
          height: height,
          description: Map.get(args, :description)
        },
        user,
        post_changeset
      )
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
        # no pattern matching here as both fields can be null
        args,
        %{
          context: %{
            user: user
          }
        }
      ) do
    %{image_url: image_url, width: width, height: height} =
      case args.image do
        nil ->
          %{image_url: nil, width: nil, height: nil}

        _ ->
          image_url = ImageUploader.save_file!(args.image)

          {_, width, height, _} = ExImageInfo.info(File.read!(args.image.path))
          %{image_url: image_url, width: width, height: height}
      end

    changeset =
      %Image{}
      |> Image.changeset(%{
        image_url: image_url,
        width: width,
        height: height,
        description: Map.get(args, :description)
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
