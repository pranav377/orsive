# Setup elixir tools for Phoenix
sudo apt-get update
sudo apt-get install -y inotify-tools
mix local.hex --force 
mix archive.install hex phx_new --force

# git flow setup
git flow init -d

git config gitflow.branch.master main
git config gitflow.branch.develop development

npm install

cd apps/api

npx prisma generate

cd ..

cd rograph

mix deps.get