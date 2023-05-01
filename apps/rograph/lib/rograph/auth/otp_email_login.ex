defmodule Rograph.Auth.OtpEmailLogin do
  use Ecto.Schema
  import Ecto.Changeset

  alias Rograph.Auth.User

  schema "otp_email_login" do
    field(:otp, :string)
    belongs_to(:user, Rograph.Auth.User, type: :string)

    timestamps()

    # validation virtual fields
    field(:user_id, :string, virtual: true)
  end

  @doc false
  def changeset(channel, attrs) do
    channel
    |> cast(attrs, [:otp, :user_id])
    |> validate_required([:otp, :user_id])
    |> validate_length(:otp, is: 7)
    |> add_user()
  end

  defp add_user(changeset) do
    user_id = get_change(changeset, :user_id)

    case Repo.get(User, user_id) do
      nil ->
        add_error(changeset, :user_id, "user does not exist")

      user ->
        put_assoc(changeset, :user, user)
    end
  end
end
