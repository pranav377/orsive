defmodule Rograph.DataStore.Mongodb.MongoRepo do
  use Mongo.Repo,
    otp_app: :rograph,
    topology: :mongo
end
