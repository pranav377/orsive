import Config

# For production, don't forget to configure the url host
# to something meaningful, Phoenix uses this information
# when generating URLs.

# Do not print debug messages in production
config :logger, level: :info

# Runtime production configuration, including reading
# of environment variables, is done on config/runtime.exs.
config :arc,
  storage: Arc.Storage.S3,
  bucket: {:system, "S3_BUCKET_NAME"},
  cdn: "https://cdn.orsive.com/uploads"

config :ex_aws,
  access_key_id: [{:system, "S3_ACCESS_KEY"}],
  secret_access_key: [{:system, "S3_SECRET_KEY"}],
  region: "us-east-1",
  s3: [
    scheme: "https://",
    host: "nyc3.digitaloceanspaces.com",
    region: "us-east-1"
  ]
