defmodule Rograph.Chat.Channel do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :string, []}
  schema "channels" do
    # for group only
    field(:name, :string)
    # for group only
    field(:avatar, :string)
    # for group only
    field(:banner, :string)
    # for group only
    field(:bio, :string)
    # group or single
    field(:type, :string)
    many_to_many(:users, Rograph.User, join_through: "users_channels")
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
