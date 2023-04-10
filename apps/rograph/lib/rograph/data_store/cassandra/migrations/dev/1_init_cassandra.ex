defmodule Rograph.DataStore.Cassandra.Migrations.Dev.InitCassandra do
  alias Rograph.DataStore.Cassandra.CassandraRepo

  def up do
    CassandraRepo.execute(
      "CREATE KEYSPACE rograph_data WITH REPLICATION = {'class': 'SimpleStrategy'};"
    )
  end

  def down do
    CassandraRepo.execute("DROP KEYSPACE rograph_data")
  end
end
