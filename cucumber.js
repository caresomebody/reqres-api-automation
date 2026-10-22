export default {
  default: {
    paths: ['features/**/*.feature'],
    import: [
      'support/**/*.js',
      'step-definitions/**/*.js',
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
    ],
    parallel: 1,
    retry: 0,
  },
};