defmodule RographWeb.Graphql.Resolvers.ChatResolver do
  alias Rograph.Chat
  alias RographWeb.Graphql.HandleChangesetError
  alias RographWeb.Graphql.EctoParsers.ChannelParser

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

  def create_single_channel(_parent, %{user_id: user_id}, %{
        context: %{
          user_id: self_user_id
        }
      }) do
    all_user_ids = [self_user_id, user_id]
    id = Enum.sort(all_user_ids) |> Enum.join("-")

    case Chat.get_channel(id) do
      nil ->
        case Chat.create_channel(%{
               type: "single",
               self_user_id: self_user_id,
               user_ids: [user_id],
               id: id
             }) do
          {:ok, channel} ->
            {:ok, ChannelParser.parse(channel)}

          {:error, changeset} ->
            HandleChangesetError.handle(changeset)
        end

      channel ->
        {:ok, ChannelParser.parse(channel, self_user_id)}
    end
  end
end
