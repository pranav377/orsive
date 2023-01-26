USERNAME=${3:-"orsive"}
export NVM_DIR=${1:-"/home/$USERNAME/.nvm"}
export NODE_VERSION=${2:-"lts/*"}

set -e

# install all dependencies
apt-get update \
    && apt-get install -y curl ca-certificates tar gnupg2 \
    && apt-get -y autoclean

# install nvm
su ${USERNAME} -c "mkdir $NVM_DIR"
su ${USERNAME} -c "curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash"

# install node and npm
su ${USERNAME} -c "source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g npm"