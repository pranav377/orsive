defmodule Rograph.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Rograph.Auth.User
  alias Rograph.Auth.Relationship

  @primary_key {:id, :string, []}
  schema "users" do
    field(:username, :string)
    field(:email, :string)
    field(:name, :string)
    field(:avatar, :string)
    field(:banner, :string)
    field(:bio, :string)
    field(:last_active, :utc_datetime)
    field(:joined, :utc_datetime)
    many_to_many(:channels, Rograph.Chat.Channel, join_through: "users_channels")
    many_to_many(:typing_channels, Rograph.Chat.Channel, join_through: "typing_users_channels")

    many_to_many(
      :blocked_users,
      User,
      join_through: Relationship,
      join_keys: [user_id: :id, relation_id: :id]
    )

    many_to_many(
      :reverse_blocked_users,
      User,
      join_through: Relationship,
      join_keys: [relation_id: :id, user_id: :id]
    )

    has_many(:read_messages, Rograph.Chat.MessageRead)
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
