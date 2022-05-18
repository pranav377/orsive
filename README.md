### History

I started making Orsive on 11 July, 2021. It was previously created with plan React(Frontend) and Django(Python Backend). It turned out to be the biggest mistake ever! I wasn't productive enough. And Django was not very flexible for me. I switched to Next.Js for Frontend and GraphQL with apollo-server for backend. A lot of things are coming up, so stay tuned!

### Todo for now

1. Moderator vote system
2. A page containing the people you follow
3. Setup Testing
4. Reactions?

### Small things to know about

1. If you notice cache problems when using apollo client for infinite scroll, use `useClearApolloCacheOnExit` hook present in `apps\web\hooks\app\useClearApolloCacheOnExit.tsx`

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org) app
- `api`: a GraphQL API made with apollo-server
- `belly`: a storage engine to handle file uploads for Local file storage and S3 cloud upload
- `gorse-starter`: A script which starts the Gorse instance
- `meilisearch-starter`: A script which starts the Meilisearch instance
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

All packages and apps are 100% [TypeScript](https://www.typescriptlang.org/). (Except starter packages.)

### Running locally / Development

See [here](DEVELOPMENT.md)

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```
