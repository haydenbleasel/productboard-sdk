# productboard-sdk

[![Version](https://img.shields.io/npm/v/productboard-sdk.svg)](https://www.npmjs.org/package/productboard-sdk) [![Build Status](https://github.com/haydenbleasel/productboard-sdk/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/productboard-sdk/actions?query=branch%3Amain)

A type-safe Typescript client for the Productboard REST API, powered by [ky](https://github.com/sindresorhus/ky).

> [!WARNING]
> This SDK is still under development and not ready for production use. It's currently a stub for "list all" endpoints.

## Installation

```bash
pnpm add productboard-sdk
```

## Usage

```ts
import { Productboard } from 'productboard-sdk';

const productboard = new Productboard('your-api-token');

// List companies
const companies = await productboard.company.list();

// List components
const components = await productboard.component.list();

// List custom field values for a specific custom field
const customFieldValues = await productboard.customFieldValue.list('custom-field-id');

// List custom fields
const customFields = await productboard.customField.list();

// List feature release assignments
const featureReleaseAssignments = await productboard.featureReleaseAssignment.list();

// List feature statuses
const featureStatuses = await productboard.featureStatus.list();

// List features
const features = await productboard.feature.list();

// List Jira integrations
const jiraIntegrations = await productboard.jiraIntegration.list();

// List Jira links for a specific integration
const jiraLinks = await productboard.jiraLink.list('integration-id');

// List notes
const notes = await productboard.note.list();

// List products
const products = await productboard.product.list();

// List releases
const releases = await productboard.release.list();

// List users
const users = await productboard.user.list();
```