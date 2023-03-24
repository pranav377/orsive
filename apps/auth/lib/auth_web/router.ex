defmodule AuthWeb.Router do
  use AuthWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", AuthWeb do
    pipe_through :api
  end
end
