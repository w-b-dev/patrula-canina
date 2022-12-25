# WHAT'S TO EXPECT HERE?

You can find the folder structure, the main endpoints, the scripts and useful information about the API here.

## Folder structure

```text
- ./api
    - ./scripts
    - ./src
        - ./GET
        - ./POST
        - ./PUT
        - ./PATCH
        - ./DELETE
  - ./README.md
```

## Scripts

We have scripts to upload the code to AWS Lambda, and scripts to call the AWS API Gateway endpoints as well as the Astra database directly.

### script to update code

```bash
./scripts/upload-lambda.sh go
```

### script to call API Gateway

> **ATTENTION**: THESE SCRIPTS ARE NOT UP-TO-DATE

Changes needed:

- [ ] hardcoded token must be replaced with ENV
- [x] current hardcoded token has been revoked

example:

```bash
./scripts/call-api.sh get chase
```

# API ENDPOINTS

currently I am working on 4 methods

## GET all categories

This is python code.

[x] working

## GET a single category (all entries)

This is python code.

[x] working

## GET one entry (thus one category)

This is python code.

[ ] 🇽 NOT working

## POST a new entry (thus in a category, existing or new)

This is javascript code.

[x] working

## PATCH an existing entry's properties

This is Go code.

[ ] 🇽 NOT working
