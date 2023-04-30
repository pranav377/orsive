defmodule RographWeb.Graphql.Middleware.RateLimitingMiddleware do
  @behaviour Absinthe.Middleware

  def call(resolution, config) do
    # get config
    field = Keyword.get(config, :field)
    limit = Keyword.get(config, :limit, 5)
    # in seconds
    period = Keyword.get(config, :period, 60)

    # get ip
    %{context: %{client_ip: client_ip}} = resolution

    identifier = "#{field}:#{client_ip}"

    case Hammer.check_rate(identifier, period * 1000, limit) do
      {:allow, _count} ->
        resolution

      _ ->
        # deny the request
        resolution
        |> Absinthe.Resolution.put_result({:error, "Too many requests, please try again later"})
    end
  end
end
