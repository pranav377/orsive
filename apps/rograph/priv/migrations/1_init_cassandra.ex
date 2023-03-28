defmodule Rograph.DataStore.Cassandra.Repo.Migrations.InitCassandra do
  alias Rograph.DataStore.Cassandra.Repo

  def up do
    Repo.execute("CREATE KEYSPACE rograph_data WITH REPLICATION = {'class': Simple Strategy'};")
  end

  def down do
    Repo.execute("DROP KEYSPACE rograph_data")
  end
end
