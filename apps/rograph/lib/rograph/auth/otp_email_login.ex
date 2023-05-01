defmodule Rograph.Auth.OtpEmailLogin do
  use Ecto.Schema
  import Ecto.Changeset

  alias Rograph.Auth.User

  schema "otp_email_login" do
    field(:otp, :string)
    belongs_to(:user, Rograph.Auth.User, type: :string)

    timestamps()
  end

  @doc false
  def changeset(channel, attrs) do
    channel
    |> cast(attrs, [:otp, :user])
    |> validate_required([:otp, :user])
    |> validate_length(:otp, is: 7)
  end
end
