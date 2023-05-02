defmodule Rograph.Repo.Migrations.AddOtpLoginMethodTable do
  use Ecto.Migration

  def change do
    create table(:otp_email_login) do
      add(:otp, :text, null: false)
      add(:email, :text, null: false)
      add(:type, :text, null: false)

      timestamps()
    end
  end
end
