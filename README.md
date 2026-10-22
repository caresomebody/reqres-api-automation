# ReqRes API Automation

API test automation project for the ReqRes Users API, built with **JavaScript, Cucumber.js, and Playwright**. This project demonstrates Behavior-Driven Development (BDD), reusable API request methods, response validation, positive and negative test scenarios, and Continuous Integration (CI) using GitHub Actions.

## Tech Stack

- **JavaScript (ES Modules)** — Test implementation
- **Cucumber.js** — BDD framework and Gherkin scenarios
- **Playwright APIRequestContext** — HTTP API requests
- **Node.js and npm** — Runtime and package management
- **dotenv** — Environment variable configuration
- **GitHub Actions** — Automated test execution and CI reporting

## Project Structure

```text
reqres-api-automation/
├── .github/
│   └── workflows/
│       └── api-tests.yml
├── clients/
│   └── users.client.js
├── reports/
│   └── cucumber-report.html
├── support/
│   ├── world.js
│   └── hooks.js
├── tests/
│   ├── features/
│   │   └── user.feature
│   └── steps/
│       └── users.steps.js
├── .env
├── .gitignore
├── cucumber.js
├── package-lock.json
├── package.json
└── README.md
```

### Directory Overview

| Path | Purpose |
|---|---|
| `.github/workflows/api-tests.yml` | Configures automated test execution in GitHub Actions |
| `clients/users.client.js` | Encapsulates API requests for user operations |
| `tests/features/user.feature` | Defines test scenarios using Gherkin |
| `tests/steps/users.steps.js` | Implements Gherkin steps and response assertions |
| `support/world.js` | Stores scenario-specific API context and response data |
| `support/hooks.js` | Initializes and disposes the API request context |
| `cucumber.js` | Configures feature discovery, step imports, and reporting |
| `reports/` | Stores the generated HTML test report |

## Prerequisites

- Node.js and npm
- Git (optional, for cloning the repository)
- A valid ReqRes API key for the configured API environment

## Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd reqres-api-automation
```

Alternatively, navigate to your existing project directory.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
BASE_URL=https://reqres.in
API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your own ReqRes API key.

**Security:** Add `.env` to `.gitignore`. Never commit API keys or other credentials to the repository.

### 4. Verify the Cucumber configuration

The `cucumber.js` configuration should discover feature files and step definitions:

```javascript
export default {
  paths: ['tests/features/**/*.feature'],
  import: [
    './support/**/*.js',
    './tests/steps/**/*.js',
  ],
  format: [
    'progress',
    'html:reports/cucumber-report.html',
  ],
  parallel: 1,
  retry: 0,
};
```

## API Test Coverage

The test suite covers three user operations.

### 1. Create User — POST

Endpoint: `POST /api/users`

Scenarios:

- Create a user successfully
- Create a user without a name
- Create a user with empty name and job fields

Validations:

- HTTP status code
- Returned name and job
- Generated user ID
- Creation timestamp
- Missing-field and empty-field response behavior

### 2. Read Users — GET

Endpoints:

- `GET /api/users/{id}`
- `GET /api/users?page=1`

Scenarios:

- Retrieve an existing user successfully
- Retrieve all users
- Retrieve a user that does not exist

Validations:

- HTTP status code
- Returned user ID
- Valid email address
- User list structure

### 3. Update User — PUT

Endpoint: `PUT /api/users/{id}`

Scenarios:

- Update an existing user successfully
- Update a user without a name
- Update a user with empty name and job fields

Validations:

- HTTP status code
- Updated name and job
- Update timestamp
- Missing-field and empty-field response behavior

## Running the Tests Locally

Run the complete test suite:

```bash
npm test
```

Run selected scenarios using Cucumber tags:

```bash
npx cucumber-js --tags "@create"
npx cucumber-js --tags "@get"
npx cucumber-js --tags "@update"
```

Run only negative scenarios:

```bash
npx cucumber-js --tags "@negative"
```

## Continuous Integration with GitHub Actions

The project uses GitHub Actions to execute API automation tests automatically and publish the test report as a workflow artifact.

### Workflow Location

```text
.github/workflows/api-tests.yml
```

### Workflow Triggers

The workflow runs automatically when:

- Code is pushed to the `main` or `master` branch
- A pull request targets the `main` or `master` branch

It can also be triggered manually using `workflow_dispatch` from the GitHub Actions tab.

### Workflow Steps

1. Check out the repository.
2. Set up Node.js 20.
3. Install dependencies using `npm ci`.
4. Create the reports directory.
5. Execute the Cucumber test suite using `npm test`.
6. Upload the HTML test report as a GitHub Actions artifact.

### Configure GitHub Secrets

To allow the workflow to authenticate with ReqRes:

1. Open the GitHub repository.
2. Navigate to **Settings → Secrets and variables → Actions**.
3. Select **New repository secret**.
4. Add the following secret:

| Secret name | Value |
|---|---|
| `REQRES_API_KEY` | Your ReqRes API key |

The workflow maps this secret to the `API_KEY` environment variable used by the existing test setup.

The base URL is configured directly in the workflow as `https://reqres.in`.

Do not store API credentials directly in the workflow file.

### View Workflow Results

1. Open your repository on GitHub.
2. Select the **Actions** tab.
3. Open the latest `ReqRes API Automation` workflow run.
4. Review the job logs and scenario results.
5. Download the `cucumber-api-test-report` artifact from the completed run.

The HTML report artifact is configured to be retained for **14 days**. The workflow attempts to upload it even if the test step fails, which helps with debugging unsuccessful runs.

### Continuous Integration Configuration

| Setting | Configuration |
|---|---|
| Workflow | ReqRes API Automation |
| Operating system | Ubuntu |
| Node.js version | 20 |
| Dependency installation | `npm ci` |
| Test command | `npm test` |
| Report | Cucumber HTML |
| Artifact name | `cucumber-api-test-report` |
| Artifact retention | 14 days |

**Note:** `npm ci` requires a committed `package-lock.json`. Ensure the lockfile is included in the repository before running the workflow.

## Test Logging and Reporting

The framework logs the HTTP response status and response body after each API request. This helps with debugging failed scenarios and examining the actual API behavior.

The HTML report is generated at:

```text
reports/cucumber-report.html
```

Locally, open the report after execution. In GitHub Actions, download the `cucumber-api-test-report` artifact from the workflow run.

The CI job will be marked as failed if the test suite fails, while the report upload step still runs when possible.

## Design Approach

The project uses a layered structure to keep the automation maintainable:

- **Feature layer:** Describes expected behavior using readable Gherkin scenarios.
- **Step-definition layer:** Executes test actions and assertions.
- **Client layer:** Encapsulates HTTP requests and endpoint paths.
- **Support layer:** Manages scenario context, request setup, cleanup, and shared utilities.
- **CI layer:** Automates test execution and preserves test reports through GitHub Actions.

This separation reduces duplicated request logic and makes the suite easier to maintain and extend.

## Known Limitations

ReqRes's legacy demo endpoints simulate certain user operations rather than behaving like a fully persistent user-management backend.

- A successful create request may return a generated user ID without storing the user for subsequent retrieval.
- Update responses do not necessarily indicate that the underlying seeded data was modified.
- Missing or empty fields may be accepted by the demo API even if a production API would reject them.
- A create-then-read scenario for a newly created user may return `404` because the resource was not persisted.

The negative scenarios document the behavior of the configured ReqRes endpoints; they do not necessarily represent production validation requirements.

GitHub Actions runs the same tests as the local environment. CI does not eliminate API limitations, so a test expecting `200` after retrieving a non-persisted user may still fail.

## Scope

This project focuses on API automation for the three requested operations: **Create, Read, and Update**.

It demonstrates:

- BDD-style test design with Cucumber
- Reusable API requests with Playwright
- Positive and negative test scenarios
- HTTP response and payload assertions
- Environment-based configuration
- HTML test reporting
- Automated CI execution using GitHub Actions

---

**Author:** Ali Naufal Ammarullah (alinaufal00@gmail.com)

**Project:** ReqRes API Automation  
**Language:** JavaScript  
**Framework:** Cucumber.js + Playwright  
**CI/CD:** GitHub Actions
