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
    # email / google / discord
    field(:auth_method, :string)
    field(:oauth_provider_id, :string)

    field(:last_active, :utc_datetime)
    field(:joined, :utc_datetime)
    field(:setup_complete, :boolean, default: false)
    field(:preferred_languages, {:array, :string})
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
    |> cast(attrs, [
      :id,
      :username,
      :email,
      :name,
      :avatar,
      :banner,
      :bio,
      :auth_method,
      :oauth_provider_id,
      :setup_complete,
      :preferred_languages
    ])
    |> validate_required([:id, :username, :email, :name, :avatar, :auth_method])
    |> validate_length(:username, max: 20)
    |> unique_constraint(:id)
    |> unique_constraint(:email)
    |> unique_constraint(:username)
    |> unique_constraint(:oauth_provider_id)
    |> validate_subset(:preferred_languages, Application.get_env(:rograph, :languages))
  end
end
