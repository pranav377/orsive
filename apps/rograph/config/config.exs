# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

# Configures the endpoint
config :rograph, RographWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [
    formats: [json: RographWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Rograph.PubSub,
  live_view: [signing_salt: "HQXwM8I7"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Configure the MongoDB database client
config :rograph, Rograph.DataStore.Mongodb.Repo, url: System.get_env("DATABASE_URL")

# Configure the ScyllaDB database client
# Usage -> Xandra.execute(:scylla_conn, query)
config :rograph, :xandra,
  name: :scylla_conn,
  nodes: [System.get_env("SCYLLADB_URL")]

# Configure Joken
config :joken, default_signer: System.get_env("JWT_SECRET")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
