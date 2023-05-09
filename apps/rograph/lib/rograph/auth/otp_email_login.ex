defmodule Rograph.Auth.OtpEmailLogin do
  use Ecto.Schema
  import Ecto.Changeset

  alias Rograph.Auth.User

  @timestamps_opts [type: :utc_datetime]

  schema "otp_email_login" do
    field(:otp, :string)
    field(:email, :string)
    field(:type, :string)

    timestamps()
  end

  @doc false
  def changeset(channel, attrs) do
    channel
    |> cast(attrs, [:otp, :email, :type])
    |> validate_required([:otp, :email, :type])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:otp, is: 7)
    |> validate_inclusion(:type, ["login", "signup"])
  end

  def is_valid?(otp_obj, user_given_otp) when is_bitstring(user_given_otp) do
    now = DateTime.utc_now()
    inserted_at = otp_obj.inserted_at
    generated_otp = otp_obj.otp

    diff = DateTime.diff(now, inserted_at, :minute)

    # 60 minutes = 1 hour
    diff <= 60 and generated_otp == user_given_otp
  end
end
