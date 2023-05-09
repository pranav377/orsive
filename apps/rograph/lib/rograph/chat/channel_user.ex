defmodule Rograph.Chat.ChannelUser do
  use Ecto.Schema

  schema "users_channels" do
    belongs_to(:user, Rograph.Auth.User, type: :string)
    belongs_to(:channel, Rograph.Chat.Channel, type: :string)
  end
end
