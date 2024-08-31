#!/usr/bin/just

dev:
	#!/bin/sh
	pushd stackup-forums
	yarn dev

compile:
	#!/bin/sh
	pushd foundry
	forge compile