defmodule Rograph.Repo.Migrations.AddOtpLoginMethodTable do
  use Ecto.Migration

  def change do
    create table(:otp_email_login) do
      add(:otp, :text, null: false)
      add(:user_id, references(:users, type: :text, on_delete: :delete_all))

      timestamps()
    end
  end
end
