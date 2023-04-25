defmodule Rograph.Repo.Migrations.AddTypingUsersAndUnreadCount do
  use Ecto.Migration

  def change do
    create table(:typing_users_channels) do
      add(:user_id, references(:users, type: :text, on_delete: :delete_all))
      add(:channel_id, references(:channels, type: :text, on_delete: :delete_all))
    end

    # many to many relations join table
    create(unique_index(:typing_users_channels, [:user_id, :channel_id]))

    create table(:message_reads) do
      add(:channel_id, references(:channels, type: :text, on_delete: :delete_all))
      add(:user_id, references(:users, type: :text, on_delete: :delete_all))
      add(:message_id, references(:messages, type: :text, on_delete: :delete_all))

      timestamps()
    end
  end
end
