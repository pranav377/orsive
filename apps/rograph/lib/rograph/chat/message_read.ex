defmodule Rograph.Chat.MessageRead do
  use Ecto.Schema
  import Ecto.Changeset

  schema "message_reads" do
    belongs_to(:channel, Rograph.Chat.Channel, type: :string)
    belongs_to(:user, Rograph.Auth.User, type: :string)
    belongs_to(:message, Rograph.Chat.Message, type: :string)
    timestamps()
  end
end
