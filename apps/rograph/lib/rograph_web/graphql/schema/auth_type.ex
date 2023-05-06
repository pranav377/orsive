defmodule RographWeb.Graphql.Schema.Types.AuthType do
  use Absinthe.Schema.Notation

  alias RographWeb.Graphql.Resolvers
  alias RographWeb.Graphql.Middleware

  object :otp_response do
    # login or signup
    field(:type, non_null(:string))
  end

  object :login_response do
    field(:user, :chat_user)
    field(:token, :string)
  end

  object :check_username_response do
    field(:available, :boolean)
  end

  object :auth_queries do
    @desc "Check if username already exists"
    field :check_username, :check_username_response do
      middleware(Middleware.BlockAlreadyAuthenticatedMiddleware)
      arg(:username, non_null(:string))
      resolve(&Resolvers.AuthResolver.check_username/3)
    end
  end

  object :auth_mutations do
    @desc "Send OTP for login or signup"
    field :send_auth_otp, :otp_response do
      middleware(Middleware.BlockAlreadyAuthenticatedMiddleware)
      middleware(Middleware.RateLimitingMiddleware, field: "send_auth_otp", limit: 2, period: 60)
      middleware(Middleware.Validators.EmailValidator)
      arg(:email, non_null(:string))
      resolve(&Resolvers.AuthResolver.send_auth_otp/3)
    end

    @desc "Login with email"
    field :login_auth_email, :login_response do
      middleware(Middleware.BlockAlreadyAuthenticatedMiddleware)
      middleware(Middleware.RateLimitingMiddleware, field: "send_auth_otp", limit: 50, period: 60)
      middleware(Middleware.Validators.EmailValidator)
      arg(:email, non_null(:string))
      arg(:otp, non_null(:string))
      resolve(&Resolvers.AuthResolver.login_auth_email/3)
    end

    @desc "Signup with email"
    field :signup_auth_email, :login_response do
      middleware(Middleware.BlockAlreadyAuthenticatedMiddleware)
      middleware(Middleware.RateLimitingMiddleware, field: "send_auth_otp", limit: 50, period: 60)
      middleware(Middleware.Validators.EmailValidator)
      middleware(Middleware.Validators.UsernameValidator)
      arg(:email, non_null(:string))
      arg(:username, non_null(:string))
      arg(:name, non_null(:string))
      arg(:otp, non_null(:string))
      resolve(&Resolvers.AuthResolver.signup_auth_email/3)
    end
  end
end
