defmodule RographWeb.Graphql.Resolvers.HelloResolver do
  def hello(_parent, _args, %{context: context}) do
    case context do
      %{is_authenticated: true} ->
        user = context.user
        {:ok, %{hello: "Hello #{user.username}!"}}

      _ ->
        {:ok, %{hello: "🤘"}}
    end
  end
end
