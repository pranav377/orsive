defmodule Rograph.Repo.Migrations.Initial do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add(:id, :text, primary_key: true)
      add(:username, :text)
      add(:email, :text)
      add(:name, :text)
      add(:avatar, :text)
      add(:banner, :text, null: true)
      add(:bio, :text, null: true)
      # email / google / discord
      add(:auth_method, :text)
      add(:last_active, :utc_datetime, default: fragment("now()"), null: true)
      add(:joined, :utc_datetime, default: fragment("now()"))
    end

    create(unique_index(:users, [:id]))
    create(unique_index(:users, [:username]))
    create(unique_index(:users, [:email]))

    create table(:channels, primary_key: false) do
      add(:id, :text, primary_key: true)
      # for group only
      add(:name, :text)
      # for group only
      add(:avatar, :text)
      # for group only
      add(:banner, :text)
      # for group only
      add(:bio, :text)
      # group or single
      add(:type, :text)

      timestamps()
    end

    create(unique_index(:channels, [:id]))

    create table(:users_channels) do
      add(:user_id, references(:users, type: :text, on_delete: :delete_all))
      add(:channel_id, references(:channels, type: :text, on_delete: :delete_all))
    end

    create(unique_index(:users_channels, [:user_id, :channel_id]))

    create table(:messages, primary_key: false) do
      add(:id, :text, primary_key: true)
      add(:channel_id, references(:channels, type: :text, on_delete: :delete_all))
      add(:user_id, references(:users, type: :text, on_delete: :delete_all))
      add(:message, :text)
      add(:is_deleted, :boolean, default: false)

      timestamps()
    end

    create(unique_index(:messages, [:id]))

    create table(:message_reactions) do
      add(:message_id, references(:messages, type: :text, on_delete: :delete_all))
      add(:user_id, references(:users, type: :text, on_delete: :delete_all))
      add(:reaction, :text)
    end

    create(unique_index(:message_reactions, [:message_id, :user_id]))
  end
end
