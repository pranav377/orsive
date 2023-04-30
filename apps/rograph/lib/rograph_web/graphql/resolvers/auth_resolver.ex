defmodule RographWeb.Graphql.Resolvers.AuthResolver do
  def send_auth_otp(_, _, _) do
    {:ok, %{}}
  end
end
