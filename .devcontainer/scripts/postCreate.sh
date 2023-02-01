# Setup elixir tools fof Phoenix
sudo apt-get update
sudo apt-get install -y inotify-tools
mix local.hex --force 
mix archive.install hex phx_new --force

npm install

cd apps/api

npx prisma generate