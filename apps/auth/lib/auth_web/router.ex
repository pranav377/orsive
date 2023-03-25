defmodule AuthWeb.Router do
  use AuthWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/auth", AuthWeb do
    pipe_through(:api)

    get("/:provider", AuthController, :request)
    get("/:provider/callback", AuthController, :callback)
  end
end
