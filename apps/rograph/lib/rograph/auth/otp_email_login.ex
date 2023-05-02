defmodule Rograph.Auth.OtpEmailLogin do
  use Ecto.Schema
  import Ecto.Changeset

  alias Rograph.Auth.User

  schema "otp_email_login" do
    field(:otp, :string)
    field(:email, :string)

    timestamps()
  end

  @doc false
  def changeset(channel, attrs) do
    channel
    |> cast(attrs, [:otp, :email])
    |> validate_required([:otp, :email])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:otp, is: 7)
  end
end
