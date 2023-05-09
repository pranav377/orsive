defmodule Rograph.Chat.Message do
  use Ecto.Schema
  import Ecto.Changeset

  @timestamps_opts [type: :utc_datetime]

  schema "messages" do
    field(:content, :string)
    belongs_to(:channel, Rograph.Chat.Channel, type: :string)
    belongs_to(:user, Rograph.Auth.User, type: :string)
    timestamps()
  end
end
