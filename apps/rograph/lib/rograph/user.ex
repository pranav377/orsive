defmodule Rograph.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :string, []}
  schema "users" do
    field(:username, :string)
    field(:email, :string)
    field(:name, :string)
    field(:avatar, :string)
    field(:banner, :string)
    field(:bio, :string)
    field(:is_online, :boolean, default: false)
    field(:joined, :utc_datetime)
    many_to_many(:channels, Rograph.Chat.Channel, join_through: "users_channels")
    many_to_many(:typing_channels, Rograph.Chat.Channel, join_through: "typing_users_channels")
    has_many(:read_messages, Rograph.Chat.MessageRead)
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:id, :username, :email, :name])
    |> unique_constraint(:id)
    |> unique_constraint(:email)
    |> unique_constraint(:username)
    |> validate_required([])
  end
end
