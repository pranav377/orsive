defmodule RographWeb.Graphql.Schema.Types.AuthType do
  use Absinthe.Schema.Notation

  alias RographWeb.Graphql.Resolvers
  alias RographWeb.Graphql.Middleware

  object :otp_response do
    # login or signup
    field(:type, non_null(:string))
  end

  object :login_response do
    field(:user, non_null(:me_response))
    field(:token, non_null(:string))
  end

  object :me_response do
    field(:id, non_null(:id))
    field(:username, non_null(:string))
    field(:name, non_null(:string))
    field(:avatar, non_null(:string))
    field(:setup_complete, non_null(:boolean))
  end

  object :user do
    field(:id, non_null(:id))
    field(:username, non_null(:string))
    field(:name, non_null(:string))
    field(:avatar, non_null(:string))
  end

  object :auth_queries do
    @desc "Get current user"
    field :me, non_null(:me_response) do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      resolve(&Resolvers.AuthResolver.me/3)
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

    @desc "Setup languages"
    field :setup_languages, :me_response do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      arg(:languages, non_null(list_of(non_null(:string))))
      resolve(&Resolvers.AuthResolver.setup_languages/3)
    end
  end
end
