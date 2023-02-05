import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :rograph, RographWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "k02G+mi1QQdeEBbcxa4pYQMvrh5IM8Z3qzIac4ZnyOA62auCWquvN+qam5zk5kkJ",
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
