### Prerequisites

- `eget` Installation instructions: [here](https://github.com/zyedidia/eget). Make sure that `eget` command is accessible from the Command line

- `MongoDB` The easiest way is to use [MongoDB atlas](https://www.mongodb.com/cloud/atlas/register) and spin a free cluster

Note: Orsive uses Prisma with MongoDB for ORM. Prisma requires a MongoDB three node replica cluster. Use MongoDB Atlas to setup a three node replica set easily.

### Setup

```
npm install

npm run setup
```

The setup will install all necessary packages and setup external dependencies. After installing basic packages, the setup will ask to provide a MongoDB connection string. eg: `mongodb+srv://user:password@cluster0.iqods.mongodb.net/test-database?retryWrites=true&w=majority`.

The setup is meant to be run only once.

The setup creates 6 test users for the application:

```json
[
  {
    "username": "bob",

    "name": "Bob",

    "email": "bob@orsive.com",

    "password": "1234"
  },

  {
    "username": "alice",

    "name": "Alice",

    "email": "alice@orsive.com",

    "password": "1234"
  },

  {
    "username": "harry",

    "name": "Harry",

    "email": "harry@orsive.com",

    "password": "1234"
  },

  {
    "username": "ron",

    "name": "Ron",

    "email": "ron@orsive.com",

    "password": "1234"
  },

  {
    "username": "hermione",

    "name": "Hermione",

    "email": "hermione@orsive.com",

    "password": "1234"
  },

  {
    "username": "voldemort",

    "name": "Voldemort",

    "email": "voldemort@orsive.com",

    "password": "1234"
  }
]
```

You can use these users for testing.

### Development

Once the setup is completed, you can start developing.

```

npm run dev

```

`localhost:3000`: Frontend Next.Js App

`localhost:4000`: GraphQL API

`localhost:7700`: Meilisearch Instance

`localhost:8088`: Gorse Instance
