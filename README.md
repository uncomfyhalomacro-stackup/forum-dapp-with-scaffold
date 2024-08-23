# Forum Dapp inspired by scaffold.eth

This project is an attempt to use some of the technologies used by
scaffold.eth. Scaffold.eth is, therefore, a huge project template.

We will build a forum dapp that uses some of the components but with one major change (?). we will be using Astro instead of NextJS and Biome over
Eslint and Prettier.

## Process of preparing this project

This project was generated with

```bash
npx create-eth@latest
```

And after further exploring, I decided to get it over with by creating a bare branch with no commits by running the following command

```bash
git restore .  # This will restore if there was something there that was modified
git switch --orphan scratch
```

Now that we are now in the bare branch with no commit history,  next is to prepare the repository.

### Creating the workspace

There are still some left over directories that are ignored by `.gitignore` of the main branch before we switched so let's delete those

```bash
rm -rfv .husky  # I don't use this so whatever?
rm -rfv packages  # some node_modules folder are there so let's just delete this for now
```

Next thing to do is preparing the new `.gitignore` with the following contents at the root of the project.

```gitignore
# dependencies
node_modules

# env files
*.env**

# yarn
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# eslint
.eslintcache

# misc
.DS_Store

# IDE
.vscode
.idea

# cli
dist
```

We did this because
1. `.env` files contain sensitive data.
2. `node_modules` contain dependencies that are recorded from `package.json` and `yarn.lock` plus thousands of content.

We will further add more on the `.gitignore` for anything not relevant or should not be tracked by our commit history.

Now that's out of the way, we will start preparing our project workspace by running the command at the root of the project

```bash
yarn init -w
```

This will also create a new directory called `packages` at the root of the project directory.

Heading over the `packages` directory, we will also initialise our [Foundry](https://getfoundry.sh/) project using the following command

```bash
forge init --



