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

# Install Python / Cassandra devlopment tools
RUN apt-get update && apt-get install -y python3 python3-dev python3-pip && pip3 install cqlsh

# Git Flow Setup
RUN apt-get update && apt-get install -y git-flow

# MongoDB client for debugging
RUN apt-get install gnupg
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" |  tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN apt-get update
RUN apt-get install -y mongodb-mongosh

# Installing PostgreSQL client for CockroachDB
RUN apt-get update && apt-get install -y postgresql-client

# Cleanup scripts
RUN rm -rf /tmp/scripts