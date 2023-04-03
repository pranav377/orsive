defmodule RographWeb.Graphql.Middleware.BlockUnauthenticatedMiddleware do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    IO.inspect(resolution)

    case resolution.context.is_authenticated do
      true ->
        resolution

      _ ->
        {:error, "User is not authenticated to perform this action"}
    end
  end
end
