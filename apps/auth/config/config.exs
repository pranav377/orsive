# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

# Configures the endpoint
config :auth, AuthWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [
    formats: [json: AuthWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Auth.PubSub,
  live_view: [signing_salt: "A5BghZLo"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Configure Ueberauth
config :ueberauth, Ueberauth,
  providers: [
    google:
      {Ueberauth.Strategy.Google,
       [
         client_id: System.get_env("GOOGLE_CLIENT_ID"),
         client_secret: System.get_env("GOOGLE_CLIENT_SECRET"),
         default_scope: "profile email"
       ]}
  ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
