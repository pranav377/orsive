import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :rograph, RographWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "LZNmyt+qB2vzl08gMvR9zr5qd92XlVQoZN0zIJeiEGBV9xp57NLJ8SnJzCTy24et",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
