defmodule RographWeb.Graphql.Middleware.Chat.Channel.ValidateUserIds do
  @behaviour Absinthe.Middleware

  alias Rograph.DataStore.Mongodb.Methods.Profile

  def call(resolution, _config) do
    %{user_ids: user_ids} = resolution.arguments

    %{
      user: %{
        _id: id
      }
    } = resolution.context

    {:ok, user_id} = BSON.ObjectId.encode(id)

    if Enum.member?(user_ids, user_id) do
      resolution
      |> Absinthe.Resolution.put_result({:error, "user_ids cannot contain your own user id"})
    else
      resolution |> check_if_users_exist(user_ids)
    end
  end

  defp check_if_users_exist(resolution, user_ids) do
    with {:ok, user_count} <- Profile.get_users_count(user_ids) do
      if length(user_ids) == user_count do
        resolution
      else
        resolution |> Absinthe.Resolution.put_result({:error, "1 or more users don't exist"})
      end
    else
      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "1 or more IDs is invalid"})
    end
  end
end
