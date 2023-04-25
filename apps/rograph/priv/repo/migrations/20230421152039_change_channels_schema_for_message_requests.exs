defmodule Rograph.Repo.Migrations.ChangeChannelsSchemaForMessageRequests do
  use Ecto.Migration

  def change do
    alter table(:channels) do
      # for handling message requests
      add(:hidden, :boolean)
    end
  end
end
