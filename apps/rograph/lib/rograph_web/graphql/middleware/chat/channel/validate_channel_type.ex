defmodule RographWeb.Graphql.Middleware.Chat.Channel.ValidateChannelType do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    case resolution.arguments do
      %{user_ids: user_ids} when user_ids != [] ->
        # change context in resolution to add type of channel. If length of user_ids is 1, then it is a single channel. If length is > 1, then it is a group channel
        Map.put(
          resolution,
          :context,
          Map.put(
            resolution.context,
            :channel_type,
            if(length(user_ids) == 1, do: :single, else: :group)
          )
        )

      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "user_ids must contain atleast 1 user_id"})
    end
  end
end
