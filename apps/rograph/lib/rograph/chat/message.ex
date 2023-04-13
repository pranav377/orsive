defmodule Rograph.Chat.Message do
  use Ecto.Schema
  import Ecto.Changeset

  schema "messages" do
    field(:content, :string)
    belongs_to(:channel, Rograph.Chat.Channel)
    belongs_to(:user, Rograph.User)
    timestamps()
  end
end
