defmodule RographWeb.Graphql.Resolvers.ChatResolver do
  def send_message(_parent, args, %{context: context}) do
    {:ok,
     %{
       result: "ok"
     }}
  end
end
