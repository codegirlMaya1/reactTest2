const NodeEnvironment = require('jest-environment-node');

class MyCustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    // Custom setup
    this.global.myGlobalVar = 'some value';
  }

  async teardown() {
    // Custom teardown
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = MyCustomEnvironment;
