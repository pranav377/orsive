defmodule RographWeb.Graphql.Resolvers.ContentMutations do
  def create_image(
        _parent,
        %{
          title: title,
          image: image
        },
        %{
          context: %{
            user: user
          }
        }
      ) do
    IO.inspect(image)

    {:ok, %{}}
  end
end
