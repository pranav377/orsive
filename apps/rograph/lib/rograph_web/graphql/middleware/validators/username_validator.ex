defmodule RographWeb.Graphql.Middleware.Validators.UsernameValidator do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    %{username: username} = resolution.arguments

    regex_check = ~r/[^a-zA-Z0-9-_~]/

    if !String.match?(username, regex_check) and username !== "" do
      resolution
    else
      resolution
      |> Absinthe.Resolution.put_result({:error, "Invalid username"})
    end
  end
end
