defmodule Rograph.Repo.Migrations.NullabeFieldsInChannels do
  use Ecto.Migration

  def change do
    alter table(:channels) do
      modify(:name, :text, null: true)
      modify(:avatar, :text, null: true)
      modify(:banner, :text, null: true)
      modify(:bio, :text, null: true)
    end
  end
end
