# Release Surface

## Purpose

This document defines what may appear in the public repository or public release surface.

## Safe Public Release Content

Suitable public artifacts include:

- documentation
- example JSON payloads with placeholder values
- architecture diagrams without private endpoints
- ownership and security notices
- screenshots or mockups that do not reveal sensitive runtime information

## Unsafe Public Release Content

Do not publish:

- runtime bundles
- private dependency payloads
- local helper binaries
- implementation-specific release packaging
- secret-bearing configuration files
- internal environment-variable names if they reveal private operational design

## Public Release Standard

The public release surface should help a reviewer answer:

- what the product is
- what workflow it supports
- what trust boundaries exist
- what kinds of inputs and outputs are expected

It should not help a third party reconstruct the private system.
