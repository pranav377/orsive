defmodule AuthWeb.AuthController do
  use UeberauthExampleWeb, :controller

  plug(Ueberauth)

  alias Ueberauth.Strategy.Helpers
  alias UeberauthExample.UserFromAuth
end
