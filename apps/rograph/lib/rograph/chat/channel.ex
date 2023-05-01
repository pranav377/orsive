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

    # for handling message requests
    field(:hidden, :boolean)

    many_to_many(:users, Rograph.Auth.User, join_through: "users_channels")
    many_to_many(:typing_users, Rograph.Auth.User, join_through: "typing_users_channels")
    has_many(:messages, Rograph.Chat.Message)
    has_many(:read_messages, Rograph.Chat.MessageRead)
    timestamps()

    # validation virtual fields
    field(:self_user_id, :string, virtual: true)
    field(:user_ids, {:array, :string}, virtual: true)
  end

  @doc false
  def changeset(channel, attrs) do
    channel
    |> cast(attrs, [:id, :type, :name, :avatar, :banner, :bio, :self_user_id, :user_ids])
    |> validate_required([:id, :type, :self_user_id, :user_ids])
    |> validate_inclusion(:type, ["group", "single"])
    |> check_user_ids()
    |> check_users_exist()
    |> add_users()

    # |> generate_id()
  end

  defp check_user_ids(changeset) do
    user_ids = get_change(changeset, :user_ids)
    self_user_id = get_change(changeset, :self_user_id)

    if Enum.member?(user_ids, self_user_id) do
      add_error(changeset, :user_ids, "user_ids cannot contain your own user id")
    else
      changeset
    end
  end

  defp check_users_exist(changeset) do
    user_ids = get_change(changeset, :user_ids)
    self_user_id = get_change(changeset, :self_user_id)

    all_user_ids = [self_user_id | user_ids]

    with {:ok, user_count} <-
           Rograph.DataStore.Mongodb.Methods.Profile.get_users_count(all_user_ids) do
      if length(all_user_ids) == user_count do
        changeset
      else
        add_error(changeset, :user_ids, "1 or more users don't exist")
      end
    else
      _ ->
        add_error(changeset, :user_ids, "1 or more IDs is invalid")
    end
  end

  defp add_users(changeset) do
    user_ids = get_change(changeset, :user_ids)
    self_user_id = get_change(changeset, :self_user_id)

    all_user_ids = [self_user_id | user_ids]

    with {:ok, users} <- Rograph.DataStore.Mongodb.Methods.Profile.get_users(all_user_ids) do
      put_assoc(changeset, :users, users)
    else
      _ ->
        add_error(changeset, :user_ids, "1 or more IDs is invalid")
    end
  end

  # defp generate_id(changeset) do
  #   type = get_change(changeset, :type)
  #   user_ids = get_change(changeset, :user_ids)
  #   self_user_id = get_change(changeset, :self_user_id)

  #   all_user_ids = [self_user_id | user_ids]

  #   case type do
  #     "group" ->
  #       id = UUID.uuid1()

  #       put_change(changeset, :id, id)

  #     "single" ->
  #       id = Enum.sort(all_user_ids) |> Enum.join("-")

  #       put_change(changeset, :id, id)
  #   end
  # end
end
