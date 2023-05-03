defmodule Rograph.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      RographWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Rograph.PubSub},
      Rograph.Repo,

      # Start the Endpoint (http/https)
      RographWeb.Endpoint,
      {Absinthe.Subscription, pubsub: RographWeb.Endpoint}
      # Start a worker by calling: Rograph.Worker.start_link(arg)
      # {Rograph.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Rograph.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    RographWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
