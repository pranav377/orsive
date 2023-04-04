defmodule RographWeb.Graphql.Resolvers.ChatResolver do
  def send_message(_parent, %{channel_id: channel_id, message: message}, %{context: context}) do
    IO.puts("channel_id: #{channel_id} || message: #{message}")
    IO.inspect(context.user)

    {:ok,
     %{
       result: "ok"
     }}
  end
end
