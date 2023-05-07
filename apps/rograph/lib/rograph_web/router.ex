defmodule RographWeb.Router do
  use RographWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
    plug(RographWeb.Plugs.Context)
  end

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  scope "/" do
    pipe_through(:api)

    forward("/graphql", Absinthe.Plug,
      schema: RographWeb.Graphql.Schema,
      socket: RographWeb.Graphql.RographSocket
    )

    # graphiql only available in dev
    if Mix.env() == :dev do
      forward("/graphiql", Absinthe.Plug.GraphiQL,
        schema: RographWeb.Graphql.Schema,
        socket: RographWeb.Graphql.RographSocket
      )
    end
  end

  scope "/auth", RographWeb do
    pipe_through(:browser)

    get("/:provider", AuthController, :request)
    get("/:provider/callback", AuthController, :callback)
  end
end
