defmodule Auth.DataStore.Mongodb.Repo do
  use Mongo.Repo,
    otp_app: :auth,
    topology: :mongo
end
