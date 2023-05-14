defmodule Rograph.Repo.Migrations.AddContentAndComments do
  use Ecto.Migration

  def change do
    create table(:images) do
      add(:image, :text)
      add(:width, :integer)
      add(:height, :integer)
      add(:description, :text, null: true)
    end

    create table(:orsics) do
      add(:title, :text, null: true)
      add(:content, :text)
    end

    create table(:comments) do
      add(:parent_comment_id, references(:comments, on_delete: :delete_all))
      add(:content, :text)
    end

    create table(:posts) do
      add(:user_id, references(:users, type: :text, on_delete: :delete_all))
      add(:orsic_id, references(:orsics, on_delete: :delete_all))
      add(:image_id, references(:images, on_delete: :delete_all))
      add(:comment_id, references(:comments, on_delete: :delete_all))
      add(:slug, :text)

      timestamps()
    end

    create(unique_index(:posts, [:slug]))

    alter table(:comments) do
      add(:parent_post_id, references(:posts, on_delete: :delete_all))
    end
  end
end
