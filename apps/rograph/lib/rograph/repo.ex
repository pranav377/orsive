defmodule Rograph.Repo do
  use Ecto.Repo,
    otp_app: :rograph,
    adapter: Ecto.Adapters.Postgres
end
