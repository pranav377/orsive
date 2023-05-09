defmodule RographWeb.Graphql.Middleware.Validators.EmailValidator do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    %{email: email} = resolution.arguments

    case EmailChecker.valid?(email) do
      true ->
        resolution

      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "Invalid email"})
    end
  end
end
