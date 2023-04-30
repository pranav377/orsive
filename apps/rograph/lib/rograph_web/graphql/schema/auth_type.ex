defmodule RographWeb.Graphql.Schema.Types.AuthType do
  use Absinthe.Schema.Notation

  alias RographWeb.Graphql.Resolvers
  alias RographWeb.Graphql.Middleware

  object :otp_response do
    # login or signup
    field(:type, :string)
  end

  object :auth_mutations do
    @desc "Send OTP for login or signup"
    field :send_auth_otp, :otp_response do
      # middleware(Middleware.BlockAlreadyAuthenticatedMiddleware)
      middleware(Middleware.RateLimitingMiddleware, field: "send_auth_otp", limit: 5, period: 60)
      arg(:email, non_null(:string))
      resolve(&Resolvers.AuthResolver.send_auth_otp/3)
    end
  end
end
