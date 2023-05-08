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

# Configure Guardian
config :rograph, Rograph.Auth,
  issuer: "Orsive",
  secret_key: System.get_env("JWT_SECRET"),
  success_redirect_url: System.get_env("OAUTH_SUCCESS_REDIRECT_URL")

# Configure Swoosh
config :rograph, Rograph.Mailer,
  adapter: Swoosh.Adapters.Sendinblue,
  api_key: System.get_env("SENDINBLUE_API_KEY") || "my-api-key",
  email_login_template_id: String.to_integer(System.get_env("EMAIL_LOGIN_TEMPLATE_ID") || "1"),
  email_signup_template_id: String.to_integer(System.get_env("EMAIL_SIGNUP_TEMPLATE_ID") || "2")

# Configure Rate Limiter
config :hammer,
  backend: {Hammer.Backend.ETS, [expiry_ms: 60_000 * 60 * 4, cleanup_interval_ms: 60_000 * 10]}

# Configure Ueberauth
config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, [default_scope: "profile email"]},
    discord: {Ueberauth.Strategy.Discord, [default_scope: "identify email"]}
  ]

# Configure Ueberauth providers
config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: {System, :get_env, ["GOOGLE_CLIENT_ID"]},
  client_secret: {System, :get_env, ["GOOGLE_CLIENT_SECRET"]}

config :ueberauth, Ueberauth.Strategy.Discord.OAuth,
  client_id: System.get_env("DISCORD_CLIENT_ID"),
  client_secret: System.get_env("DISCORD_CLIENT_SECRET")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
