defmodule AuthWeb.AuthController do
  use AuthWeb, :controller

  plug(Ueberauth)

  alias Ueberauth.Strategy

  def request(conn, %{params: %{provider: provider}}) do
    conn
    |> Strategy.authenticate(provider)
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _) do
    # handle successful authentication
    IO.inspect(auth)

    conn
    |> redirect(to: "/")
  end
end
