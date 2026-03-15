# Publishing Guide

This guide shows how to turn `public-repo/` into a separate public GitHub repository.

## Option 1: Standard Git Commands

```powershell
cd public-repo
git init
git branch -M main
git add .
git commit -m "docs: add public project showcase"
git remote add origin https://github.com/<your-user>/<your-public-repo>.git
git push -u origin main
```

## Option 2: GitHub CLI

```powershell
cd public-repo
git init
git add .
git commit -m "docs: add public project showcase"
gh repo create <your-user>/<your-public-repo> --public --source=. --remote=origin --push
```

## Recommended Checks Before Publishing

- confirm the repository does not contain source code or internal automation
- confirm no secrets, tokens, webhook values, or customer data are present
- review `LICENSE` and `NOTICE`
- review `README.md` so the public description matches the intended product narrative

## Suggested Next Step

After the first push, configure the repository description and topics on GitHub so the public project page reads clearly and consistently.