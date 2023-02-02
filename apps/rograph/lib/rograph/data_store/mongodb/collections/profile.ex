defmodule Rograph.DataStore.Mongodb.Collections.Profile do
  use Mongo.Collection

  collection "Profile" do
    attribute(:username, String.t())
    attribute(:email, String.t())
    attribute(:name, String.t())
    attribute(:joined, DateString.t())
  end
end
