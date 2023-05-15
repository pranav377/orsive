defmodule RographWeb.Graphql.Resolvers.ContentQueries do
  alias Rograph.Content.Image
  alias Rograph.Content.Post
  alias Rograph.Repo
  import Ecto.Query

  def get_image(
        _parent,
        %{
          slug: slug
        },
        _info
      ) do
    case Repo.one(
           from(i in Image,
             join: p in assoc(i, :post),
             where: p.slug == ^slug,
             preload: [post: :user]
           )
         ) do
      nil ->
        {:error, "Image not found"}

      image ->
        {:ok, image}
    end
  end
end
