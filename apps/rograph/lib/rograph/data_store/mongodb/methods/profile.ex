defmodule Rograph.DataStore.Mongodb.Methods.Profile do
  use Mongo.Collection

  collection "Profile" do
    attribute(:username, String.t())
    attribute(:email, String.t())
    attribute(:name, String.t())
    attribute(:joined, DateString.t())
  end

  # get user by id string
  def get_user(id) do
    case BSON.ObjectId.decode(id) do
      {:ok, id} ->
        user =
          :mongo
          |> Mongo.find_one(@collection, %{@id => id})
          |> load()

        case user do
          nil ->
            {:error, "User not found"}

          _ ->
            {:ok, user}
        end

      _ ->
        {:error, "Invalid ID"}
    end
  end
end
