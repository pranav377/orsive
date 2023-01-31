defmodule RographWeb.Router do
  use RographWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", RographWeb do
    pipe_through :api
  end
end
