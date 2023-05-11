defmodule Rograph.Repo.Migrations.AddContentAndComments do
  use Ecto.Migration

  def change do
    create table(:images) do
      add(:image, :string)
      add(:width, :integer)
      add(:height, :integer)
      add(:title, :string, null: true)
    end

    create table(:orsics) do
      add(:title, :string, null: true)
      add(:content, :string)
    end

    create table(:comments) do
      add(:parent_comment_id, references(:comments, on_delete: :delete_all))
      add(:content, :string)
    end

    create table(:posts) do
      add(:user_id, references(:users, type: :text, on_delete: :delete_all))
      add(:orsic_id, references(:orsics, on_delete: :delete_all))
      add(:image_id, references(:images, on_delete: :delete_all))
      add(:comment_id, references(:comments, on_delete: :delete_all))
      add(:slug, :string)

      timestamps()
    end

    create(unique_index(:posts, [:slug]))

    alter table(:comments) do
      add(:parent_post_id, references(:posts, on_delete: :delete_all))
    end
  end
end
