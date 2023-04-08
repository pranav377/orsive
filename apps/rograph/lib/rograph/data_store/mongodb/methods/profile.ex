defmodule Rograph.DataStore.Mongodb.Methods.Profile do
  use Mongo.Collection
  alias Rograph.DataStore.Mongodb.Repo

  collection "Profile" do
    attribute(:username, String.t())
    attribute(:avatar, String.t())
    attribute(:email, String.t())
    attribute(:name, String.t())
    attribute(:joined, DateString.t())
  end

  # get user by id string
  def get_user(id) do
    with {:ok, id} <- BSON.ObjectId.decode(id) do
      with {:ok, user} <- Repo.fetch(__MODULE__, id) do
        {:ok, user}
      else
        _ -> {:error, "User not found"}
      end
    else
      _ -> {:error, "Invalid ID"}
    end
  end

  # get users count with list of ids
  def get_users_count(ids) do
    bson_ids =
      Enum.map(ids, fn id ->
        {:ok, bson_id} = BSON.ObjectId.decode(id)
        bson_id
      end)

    with {:ok, users_count} <-
           Repo.count(__MODULE__, %{
             "_id" => %{"$in" => bson_ids}
           }) do
      {:ok, users_count}
    else
      _ -> {:error, "Error getting users count"}
    end
  end
end
