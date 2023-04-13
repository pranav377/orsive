defmodule Rograph.Chat.ChannelUser do
  use Ecto.Schema
  import Ecto.Changeset

  schema "channel_users" do
    belongs_to(:channel, Rograph.Chat.Channel)
    belongs_to(:user, Rograph.User)
  end
end
