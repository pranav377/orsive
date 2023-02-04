defmodule ElixirGraphql.Guardian do
  use Guardian, otp_app: :rograph
  alias ElixirGraphql.Accounts

  def subject_for_token(%{id: id}, _claims) do
    # You can use any value for the subject of your token but
    # it should be useful in retrieving the resource later, see
    # how it being used on `resource_from_claims/1` function.
    # A unique `id` is a good subject, a non-unique email address
    # is a poor subject.
    id = to_string(id)
    {:ok, id}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(%{"id" => id}) do
    case Accounts.get_user!(id) do
      nil -> {:error, :resource_not_found}
      user -> {:ok, user}
    end
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end
