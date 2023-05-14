defmodule RographWeb.Graphql.Resolvers.ContentMutations do
  def create_image(
        _parent,
        %{
          description: title,
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
