defmodule Rograph.DataStore.Mongodb.Collections.Profile do
  use Mongo.Collection

  collection "Profile" do
    attribute(:username, String.t())
    attribute(:email, String.t())
    attribute(:name, String.t())
    attribute(:joined, DateString.t())
  end

  # get user by id string
  def get_user(id) do
    {:ok, id} = BSON.ObjectId.decode(id)

    :mongo
    |> Mongo.find_one(@collection, %{@id => id})
    |> load()
  end
end
