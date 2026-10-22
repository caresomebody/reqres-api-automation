
import {
  World,
  setWorldConstructor,
} from '@cucumber/cucumber';

export class CustomWorld extends World {
  constructor(options) {
    super(options);

    this.api = undefined;
    this.usersClient = undefined;
    this.response = undefined;
    this.responseBody = undefined;
  }

  async logResponse() {
    const status = this.response?.status();

    console.log('\n-------- API RESPONSE --------');
    console.log(`Status: ${status ?? 'No response'}`);

    if (this.responseBody !== undefined) {
      console.log(
        'Response Body:',
        JSON.stringify(this.responseBody, null, 2)
      );
    } else {
      console.log('Response Body: <empty>');
    }

    console.log('--------------------------------\n');
  }
}

setWorldConstructor(CustomWorld);
