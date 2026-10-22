import {
  Before,
  After,
} from '@cucumber/cucumber';

import { request } from '@playwright/test';
import 'dotenv/config';

import { UsersClient } from '../clients/users.client.js';

Before(async function () {
  if (!process.env.API_KEY) {
    throw new Error(
      'API_KEY is missing. Configure it in your .env file.'
    );
  }

  this.api = await request.newContext({
    baseURL: process.env.BASE_URL || 'https://reqres.in',

    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY,
      'X-Reqres-Env': 'prod',
    },

    timeout: 15000,
  });

  this.usersClient = new UsersClient(this.api);
});

After(async function () {
  await this.api?.dispose();
});