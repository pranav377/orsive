defmodule RographWeb.Graphql.Middleware.BlockUnauthenticatedMiddleware do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    case resolution.context.is_authenticated do
      true ->
        resolution

      _ ->
        resolution
        |> Absinthe.Resolution.put_result(
          {:error,
           %{
             message: "User is not authenticated to perform this action",
             extensions: %{
               code: "FORBIDDEN"
             }
           }}
        )
    end
  end
end
