ARG VARIANT=latest
FROM elixir:${VARIANT}

ENV USERNAME=orsive
ENV USER_UID=1000
ENV USER_GID=$USER_UID

COPY .devcontainer/scripts/*.sh /tmp/scripts/

# Create non-root orsive user
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && bash /tmp/scripts/user.sh "$USERNAME" "$USER_UID" "$USER_GID" \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg

# Install Node.js
ENV NVM_DIR=/home/$USERNAME/.nvm
ENV NODE_VERSION="lts/*"

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    # Install common packages, non-root user, update yarn and install nvm
    && bash /tmp/scripts/node.sh "$NVM_DIR" "$NODE_VERSION" "$USERNAME" \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg

# Git Flow Setup
RUN apt-get update && apt-get install -y git-flow

# Cleanup scripts
RUN rm -rf /tmp/scripts