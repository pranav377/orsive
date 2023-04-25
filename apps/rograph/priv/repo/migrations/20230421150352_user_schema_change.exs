defmodule Rograph.Repo.Migrations.UserSchemaChange do
  use Ecto.Migration

  def change do
    create table(:relationships) do
      add(:user_id, references(:users, type: :text))
      add(:relation_id, references(:users, type: :text))
      timestamps()
    end

    create(index(:relationships, [:user_id]))
    create(index(:relationships, [:relation_id]))

    create(
      unique_index(
        :relationships,
        [:user_id, :relation_id],
        name: :relationships_user_id_relation_id_index
      )
    )

    create(
      unique_index(
        :relationships,
        [:relation_id, :user_id],
        name: :relationships_relation_id_user_id_index
      )
    )
  end
end
