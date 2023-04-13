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
    has_many(:channel_users, ChatApp.ChannelUser)
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
