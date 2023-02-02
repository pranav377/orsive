defmodule RographWeb.Router do
  use RographWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "" do
    pipe_through(:api)

    forward("/graphql", Absinthe.Plug, schema: RographWeb.Graphql.Schema)
  end
end
