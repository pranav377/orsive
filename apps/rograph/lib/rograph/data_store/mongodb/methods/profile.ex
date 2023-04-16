defmodule Rograph.DataStore.Mongodb.Methods.Profile do
  use Mongo.Collection
  alias Rograph.DataStore.Mongodb.MongoRepo

  collection "Profile" do
    attribute(:username, String.t())
    attribute(:avatar, String.t())
    attribute(:email, String.t())
    attribute(:name, String.t())
    attribute(:bio, String.t())
    attribute(:banner, String.t())
    attribute(:joined, DateString.t())
  end

  # get user by id string
  def get_user(id) do
    with {:ok, id} <- BSON.ObjectId.decode(id) do
      with {:ok, user} <- MongoRepo.fetch(Rograph.DataStore.Mongodb.Methods.Profile, id) do
        {:ok, decode_mongo_result!(user)}
      else
        _ -> {:error, "User not found"}
      end
    else
      _ -> {:error, "Invalid ID"}
    end
  end

  # get users count with list of ids
  def get_users_count(ids) do
    bson_ids = bson_ids_from_string_ids!(ids)

    with {:ok, users_count} <-
           MongoRepo.count(__MODULE__, %{
             "_id" => %{"$in" => bson_ids}
           }) do
      {:ok, users_count}
    else
      _ -> {:error, "Error getting users count"}
    end
  end

  # get users with list of ids
  def get_users(ids) do
    bson_ids = bson_ids_from_string_ids!(ids)

    users =
      MongoRepo.all(
        __MODULE__,
        %{
          "_id" => %{"$in" => bson_ids}
        }
      )
      |> Enum.map(&decode_mongo_result!/1)

    {:ok, users}
  end

  defp decode_mongo_result!(result_struct) do
    Map.from_struct(result_struct)
    |> Map.new(fn
      {:_id, id} -> {:id, BSON.ObjectId.encode!(id)}
      pair -> pair
    end)
  end

  defp bson_ids_from_string_ids!(string_ids) do
    Enum.map(
      string_ids,
      fn id ->
        BSON.ObjectId.decode!(id)
      end
    )
  end
end
