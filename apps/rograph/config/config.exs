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
  render_errors: [view: RographWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Rograph.PubSub,
  live_view: [signing_salt: "pD5yxBy5"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Configure the MongoDB database
config :rograph, Rograph.DataStore.Mongodb.Repo, url: System.get_env("DATABASE_URL")

# Configure Joken
config :joken, default_signer: System.get_env("JWT_SECRET")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
