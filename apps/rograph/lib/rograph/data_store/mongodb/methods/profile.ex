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
      Enum.map(
        ids,
        fn id ->
          with {:ok, bson_id} <- BSON.ObjectId.decode(id) do
            bson_id
          else
            _ ->
              nil
          end
        end
      )

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
    bson_ids =
      Enum.map(
        ids,
        fn id ->
          with {:ok, bson_id} <- BSON.ObjectId.decode(id) do
            bson_id
          else
            _ ->
              nil
          end
        end
      )

    users =
      MongoRepo.all(
        __MODULE__,
        %{
          "_id" => %{"$in" => bson_ids}
        }
      )

    {:ok, users}
  end
end
