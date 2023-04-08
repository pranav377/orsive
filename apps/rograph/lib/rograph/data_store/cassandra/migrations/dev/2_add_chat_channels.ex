defmodule Rograph.DataStore.Cassandra.Migrations.Dev.AddChatChannels do
  alias Rograph.DataStore.Cassandra.Repo

  def up do
    Repo.execute("
    CREATE TABLE rograph_data.chat_channels (
      for_user_id uuid,
      avatar text,
      banner text,
      bio text,
      channel_id uuid,
      is_active boolean,
      is_pinned boolean,
      is_typing boolean,
      last_message text,
      last_message_time timestamp,
      name text,
      type text,
      unread_count int,
      PRIMARY KEY ((for_user_id), channel_id)
  );
  ")
  end

  def down do
    Repo.execute("DROP TABLE rograph_data.chat_channels;")
  end
end
