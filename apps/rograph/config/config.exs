# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :rograph, Rograph.Repo,
  database: "rograph_repo",
  username: "user",
  password: "pass",
  hostname: "localhost"

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
config :rograph, Rograph.DataStore.Mongodb.MongoRepo, url: System.get_env("DATABASE_URL")

# Configure Ecto for CockroachDB
config :rograph,
  ecto_repos: [Rograph.Repo]

config :rograph, Rograph.Repo,
  database: "rograph",
  username: "root",
  hostname: "crdb",
  port: "26257",
  ssl: false,
  migration_lock: false

# Configure Joken
config :joken, default_signer: System.get_env("JWT_SECRET")

# Configure Swoosh
config :rograph, Rograph.Mailer,
  adapter: Swoosh.Adapters.Sendinblue,
  api_key: "my-api-key"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
