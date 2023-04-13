defmodule Rograph.ChatFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Rograph.Chat` context.
  """

  @doc """
  Generate a channel.
  """
  def channel_fixture(attrs \\ %{}) do
    {:ok, channel} =
      attrs
      |> Enum.into(%{

      })
      |> Rograph.Chat.create_channel()

    channel
  end
end
