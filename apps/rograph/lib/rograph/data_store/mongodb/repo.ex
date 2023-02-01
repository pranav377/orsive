defmodule Rograph.DataStore.Mongodb.Repo do
  use Mongo.Repo,
    otp_app: :rograph,
    topology: :mongo
end
