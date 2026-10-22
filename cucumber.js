export default {
  paths: ["tests/features/**/*.feature"],

  import: ["./support/**/*.js", "./tests/steps/**/*.js"],

  format: ["progress", "html:reports/cucumber-report.html"],

  parallel: 1,
  retry: 0,
};
