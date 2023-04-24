defmodule RographWeb.Graphql.EctoParsers.ChannelParser do
  import Ecto.Query
  alias Rograph.Chat.ChannelUser
  alias Rograph.Repo

  def parse(
        channel = %{
          id: id,
          name: _name,
          avatar: _avatar,
          banner: _banner,
          bio: _bio,
          type: type
        },
        self_user_id
      ) do
    %{
      id: id,
      type: type,
      metadata: channel |> generate_metadata(self_user_id),
      last_message: nil
    }
  end

  defp generate_metadata(
         %{
           id: channel_id,
           name: name,
           avatar: avatar,
           banner: banner,
           bio: bio,
           type: type
         },
         self_user_id
       ) do
    # handling is_active, is_pinned, who_is_typing, unread_count

    case type do
      "group" ->
        %{
          name: name,
          avatar: avatar,
          banner: banner,
          bio: bio
        }

      "single" ->
        generate_metadata_single(%{
          channel_id: channel_id,
          self_user_id: self_user_id
        })
    end
  end

  defp generate_metadata_single(%{
         channel_id: channel_id,
         self_user_id: self_user_id
       }) do
    opp_user_query =
      from(u in ChannelUser,
        where: u.user_id != ^self_user_id and u.channel_id == ^channel_id,
        select: u,
        preload: [:user]
      )

    %{user: opp_user} = Repo.one(opp_user_query)

    %{
      name: opp_user.name,
      avatar: opp_user.avatar,
      banner: opp_user.banner,
      bio: opp_user.bio
    }
  end
end
