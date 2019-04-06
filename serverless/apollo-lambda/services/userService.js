const userRepository = require('../repositories/userRepository');
const User = require('../models/User');

class UserService {
  
  constructor(user) {
    this.user = user;
  }

  getCurrentUser() {
    if (this.user) {
      return userRepository.findByEmail(this.user);
    }
  }

  async createUser(vm) {
    const newUser = new User();
    newUser.email = vm.email;
    newUser.password = vm.password;
    newUser.name = vm.name;
    return newUser.save();
  }

  async authenticate(credentials) {
    const user = await userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error(`No user found for email ${credentials.email}.`);
    }
    if (!await user.isValidPassword(credentials.password)) {
      throw new Error(`Invalid password.`);
    }
    return user;
  }
}

module.exports = UserService;
