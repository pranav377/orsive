defmodule RographWeb.Graphql.Resolvers.HelloResolver do
  def hello(_parent, _args, _ctx) do
    {:ok, %{hello: "🤘"}}
  end
end
