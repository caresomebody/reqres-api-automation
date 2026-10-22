import { When, Then } from "@cucumber/cucumber";

import assert from "node:assert/strict";

When(
  "I create a user with name {string} and job {string}",
  async function (name, job) {
    this.response = await this.usersClient.createUser(name, job);

    this.responseBody = await this.response.json();
    this.createdUserId = this.responseBody.id;
    await this.logResponse();
  },
);

When("I request user with ID {int}", async function (id) {
  this.response = await this.usersClient.getUser(id);
  this.responseBody = await this.response.json();
  await this.logResponse();
});

When(
  "I update user with ID {int} to name {string} and job {string}",
  async function (id, name, job) {
    this.response = await this.usersClient.updateUser(id, name, job);

    this.responseBody = await this.response.json();
    await this.logResponse();
  },
);

Then("the response status should be {int}", function (status) {
  assert.equal(this.response.status(), status);
});

Then("the response should contain name {string}", function (name) {
  const user = this.responseBody.data ?? this.responseBody;

  assert.equal(user.name ?? user.first_name, name);
});

Then("the response should contain job {string}", function (job) {
  assert.equal(this.responseBody.job, job);
});

Then("the response should contain user ID {int}", function (id) {
  const user = this.responseBody.data ?? this.responseBody;

  assert.equal(Number(user.id), id);
});

Then("the response should contain a generated user ID", function () {
  assert.ok(this.responseBody.id !== undefined);
  assert.notEqual(String(this.responseBody.id), "");
});

Then("the response should contain a creation timestamp", function () {
  assert.ok(
    Number.isFinite(Date.parse(this.responseBody.createdAt)),
    "Expected a valid createdAt timestamp",
  );
});

Then("the response should contain an update timestamp", function () {
  assert.ok(
    Number.isFinite(Date.parse(this.responseBody.updatedAt)),
    "Expected a valid updatedAt timestamp",
  );
});

Then("the response should contain a valid email address", function () {
  const user = this.responseBody.data ?? this.responseBody;

  assert.match(user.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

When("I create a user with payload:", async function (payload) {
  const requestBody = JSON.parse(payload);

  this.response = await this.usersClient.createUserWithPayload(requestBody);

  this.responseBody = await this.response.json();
  await this.logResponse();
});

Then("the response should not contain field {string}", function (field) {
  const user = this.responseBody.data ?? this.responseBody;

  assert.equal(
    Object.hasOwn(user, field),
    false,
    `Expected response not to contain field "${field}"`,
  );
});

When("I update user with payload for ID {int}:", async function (id, payload) {
  const requestBody = JSON.parse(payload);

  this.response = await this.usersClient.updateUserWithPayload(id, requestBody);

  this.responseBody = await this.response.json();
  await this.logResponse();
});

When("I request all users", async function () {
  this.response = await this.usersClient.getAllUsers();
  this.responseBody = await this.response.json();
  await this.logResponse();
});

Then("the response should contain a list of users", function () {
  assert.ok(
    Array.isArray(this.responseBody.data),
    "Expected response body to contain a data array",
  );

  assert.ok(
    this.responseBody.data.length > 0,
    "Expected at least one user in the list",
  );
});

When("I request the user I just created", async function () {
  assert.ok(
    this.createdUserId,
    "No created user ID found. Create a user first.",
  );

  this.response = await this.usersClient.getUser(this.createdUserId);
  this.responseBody = await this.response.json();
  await this.logResponse();
});

Then("the response should contain the created user", function () {
  const user = this.responseBody.data ?? this.responseBody;

  assert.equal(
    String(user.id),
    String(this.createdUserId),
    "Expected the returned user ID to match the created user ID",
  );
});
