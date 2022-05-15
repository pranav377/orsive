### Prerequisites

- `eget` Installation instructions: [here](https://github.com/zyedidia/eget). Make sure that `eget` command is accessible from the Command line
- `MongoDB` The easiest way is to use [MongoDB atlas](https://www.mongodb.com/cloud/atlas/register) and spin a free cluster

### Setup

```
npm install
npm run setup
```

The setup will install all necessary packages and setup external dependencies. After installing basic packages, the setup will ask to provide a MongoDB connection string. eg: `mongodb+srv://user:password@cluster0.iqods.mongodb.net/test-database?retryWrites=true&w=majority`.

The setup is meant to be run only once.

### Development

Once the setup is completed, you can start developing.

```
npm run dev
```

`localhost:3000`: Frontend Next.Js App
`localhost:4000`: GraphQL API
`localhost:7700`: Meilisearch Instance
`localhost:8088`: Gorse Instance
