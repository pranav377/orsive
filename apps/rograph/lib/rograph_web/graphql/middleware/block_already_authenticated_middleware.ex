defmodule RographWeb.Graphql.Middleware.BlockAlreadyAuthenticatedMiddleware do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    case resolution.context.is_authenticated do
      true ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "User is already authenticated"})

      _ ->
        resolution
    end
  end
end
