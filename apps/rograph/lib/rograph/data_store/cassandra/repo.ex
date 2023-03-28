defmodule Rograph.DataStore.Cassandra.Repo do
  @conn :cassandra_conn

  def execute(query_statement) do
    @conn |> Xandra.execute(query_statement)
  end

  def execute(query_statement, params) do
    @conn |> Xandra.execute(query_statement, params)
  end
end
