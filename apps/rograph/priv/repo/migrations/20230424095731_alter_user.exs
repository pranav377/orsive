defmodule Rograph.Repo.Migrations.AlterUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:last_active, :utc_datetime, default: fragment("now()"), null: true)
      remove(:is_online)
    end
  end
end
