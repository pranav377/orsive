defmodule RographWeb.Graphql.Resolvers.ChatResolver do
  alias Rograph.Chat.Channel

  def send_message(_parent, %{channel_id: channel_id, message: message}, %{context: context}) do
    IO.puts("channel_id: #{channel_id} || message: #{message}")
    IO.inspect(context.user)

    {:ok,
     %{
       result: "ok"
     }}

    #  logic
    # check if channel exists , if not -> error
    # check if user exists in channel, if not -> error
    # finally -> send message to the channel
  end

  def create_channel(_parent, %{user_ids: user_ids}, %{
        context: %{
          user: user,
          user_id: user_id,
          channel_type: channel_type
        }
      }) do
    Channel.create(%{
      channel_type: channel_type,
      user_ids: user_ids,
      user: user,
      user_id: user_id
    })
  end
end
