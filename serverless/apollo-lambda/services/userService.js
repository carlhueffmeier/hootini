const bcrypt = require('bcryptjs');
const UserGateway = require('../gateways/userGateway');
const { mapKeys } = require('../lib/functionalUtils');
const { snakeCaseToCamelCase } = require('../lib/utils');

const toVM = mapKeys(snakeCaseToCamelCase);

class UserService {
  constructor(userId) {
    this.userId = userId;
    this.userGateway = new UserGateway();
  }

  getCurrentUser() {
    if (this.userId) {
      return this.userGateway.findOneById(this.userId).then(toVM);
    }
  }

  async createUser(vm) {
    const newUser = {
      email: vm.email,
      password: await bcrypt.hash(vm.password, 10),
      name: vm.name
    };
    return this.userGateway.insert(newUser).then(toVM);
  }

  async authenticate(credentials) {
    const user = await this.userGateway.findOneByEmail(credentials.email);
    if (!user) {
      throw new Error(`No user found for email ${credentials.email}.`);
    }
    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new Error(`Invalid password.`);
    }
    return toVM(user);
  }
}

module.exports = UserService;
