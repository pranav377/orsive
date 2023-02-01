defmodule Rograph.DataStore.Mongodb.Collections.Profile do
  use Mongo.Collection

  document do
    attribute(:username, String.t())
    attribute(:email, String.t())
  end
end
