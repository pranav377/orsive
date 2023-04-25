defmodule Rograph.ChatTest do
  use Rograph.DataCase

  alias Rograph.Chat

  describe "channels" do
    alias Rograph.Chat.Channel

    import Rograph.ChatFixtures

    @invalid_attrs %{}

    test "list_channels/0 returns all channels" do
      channel = channel_fixture()
      assert Chat.list_channels() == [channel]
    end

    test "get_channel!/1 returns the channel with given id" do
      channel = channel_fixture()
      assert Chat.get_channel!(channel.id) == channel
    end

    test "create_channel/1 with valid data creates a channel" do
      valid_attrs = %{}

      assert {:ok, %Channel{} = channel} = Chat.create_channel(valid_attrs)
    end

    test "create_channel/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Chat.create_channel(@invalid_attrs)
    end

    test "update_channel/2 with valid data updates the channel" do
      channel = channel_fixture()
      update_attrs = %{}

      assert {:ok, %Channel{} = channel} = Chat.update_channel(channel, update_attrs)
    end

    test "update_channel/2 with invalid data returns error changeset" do
      channel = channel_fixture()
      assert {:error, %Ecto.Changeset{}} = Chat.update_channel(channel, @invalid_attrs)
      assert channel == Chat.get_channel!(channel.id)
    end

    test "delete_channel/1 deletes the channel" do
      channel = channel_fixture()
      assert {:ok, %Channel{}} = Chat.delete_channel(channel)
      assert_raise Ecto.NoResultsError, fn -> Chat.get_channel!(channel.id) end
    end

    test "change_channel/1 returns a channel changeset" do
      channel = channel_fixture()
      assert %Ecto.Changeset{} = Chat.change_channel(channel)
    end
  end
end
