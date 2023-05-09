defmodule RographWeb.Uploaders.Methods do
  def generate_identifier(name, length \\ 8) do
    identifier =
      :crypto.strong_rand_bytes(length)
      |> Base.encode16()
      |> String.slice(0, length)

    "#{identifier}_#{name}"
  end

  def generate_url(%{
        filename: filename,
        identifier: identifier,
        container: container
      })
      when is_bitstring(filename) and is_bitstring(identifier) do
    cdn_url = Application.get_env(:arc, :cdn)

    "#{cdn_url}/#{container}/#{identifier}/#{filename}"
  end
end
