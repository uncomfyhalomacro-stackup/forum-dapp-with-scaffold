#!/usr/bin/just

build:
	just packages/foundry/compile
	yarn workspace @forum-dapp-with-scaffold/forum build

export-abi:
	just packages/foundry/export-abi

start:
	yarn workspace @forum-dapp-with-scaffold/forum dev

format:
	yarn workspace @forum-dapp-with-scaffold/forum format
	just packages/foundry/format

deploy-contract:
	just packages/foundry/deploy-and-verify

contract:
	just packages/foundry/all