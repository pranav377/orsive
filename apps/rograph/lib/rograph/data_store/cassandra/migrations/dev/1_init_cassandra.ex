defmodule Rograph.DataStore.Cassandra.Repo.Migrations.Dev.InitCassandra do
  alias Rograph.DataStore.Cassandra.Repo

  def up do
    Repo.execute("CREATE KEYSPACE rograph_data WITH REPLICATION = {'class': 'SimpleStrategy'};")
  end

  def down do
    Repo.execute("DROP KEYSPACE rograph_data")
  end
end
