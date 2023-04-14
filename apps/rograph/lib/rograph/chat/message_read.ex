defmodule Rograph.Chat.MessageRead do
  use Ecto.Schema
  import Ecto.Changeset

  schema "message_reads" do
    belongs_to(:channel, Rograph.Chat.Channel)
    belongs_to(:user, Rograph.User)
    belongs_to(:message, Rograph.Chat.Message)
    timestamps()
  end
end
