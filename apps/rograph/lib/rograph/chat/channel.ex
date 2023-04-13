defmodule Rograph.Chat.Channel do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :string, []}
  schema "channels" do
    field(:name, :string)
    has_many(:channel_users, Rograph.Chat.ChannelUser)
    has_many(:messages, Rograph.Chat.Message)
    timestamps()
  end

  @doc false
  def changeset(channel, attrs) do
    channel
    |> cast(attrs, [:id])
    |> unique_constraint(:id)
    |> validate_required([])
  end
end
