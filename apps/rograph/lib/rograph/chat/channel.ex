defmodule Rograph.Chat.Channel do
  alias Rograph.DataStore.Mongodb.Methods.Profile
  alias Rograph.DataStore.Cassandra.CassandraRepo

  def create(%{channel_type: :single, user_ids: user_ids, user: curr_user, user_id: curr_user_id}) do
    chat_channel_single_insert = CassandraRepo.prepare!("
    INSERT INTO rograph_data.chat_channels (for_user_id, channel_id, avatar, banner, bio, created_at, is_active, name, type, unread_count)
    VALUES (:for_user_id, :channel_id, :avatar, :banner, :bio, :created_at, :is_active, :name, :type, :unread_count)
    ")

    channel_id = UUID.uuid1()
    channel_id = UUID.string_to_binary!(channel_id)
    created_at = DateTime.utc_now()

    [opposite_user_id] = user_ids
    {:ok, opposite_user} = Profile.get_user(opposite_user_id)

    # first, for the current user who sent the request
    for_curr_user = %{
      "for_user_id" => curr_user_id,
      "channel_id" => channel_id,
      "avatar" => opposite_user.avatar,
      "banner" => opposite_user.banner,
      "bio" => opposite_user.bio,
      "created_at" => created_at,
      "is_active" => false,
      "name" => opposite_user.name,
      "type" => "single",
      "unread_count" => 0
    }

    # then, for the opposite user
    for_opp_user = %{
      "for_user_id" => opposite_user_id,
      "channel_id" => channel_id,
      "avatar" => curr_user.avatar,
      "banner" => curr_user.banner,
      "bio" => curr_user.bio,
      "created_at" => created_at,
      "is_active" => false,
      "name" => curr_user.name,
      "type" => "single",
      "unread_count" => 0
    }

    batch =
      Xandra.Batch.new()
      |> Xandra.Batch.add(chat_channel_single_insert, for_curr_user)
      |> Xandra.Batch.add(chat_channel_single_insert, for_opp_user)

    {:ok, result} = CassandraRepo.execute(batch)

    IO.inspect(result)

    {:ok, %{}}
  end

  def create(%{channel_type: :group, user_ids: user_ids, user: user}) do
    IO.puts("group")

    {:ok, %{}}
  end
end
