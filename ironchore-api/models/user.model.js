const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema =  new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}) 

// falta crear el avatar aqui uno para padre y otro para el hijo
//unirlo a creacion de tareas.
//unirlo Creacion de premios

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
      })
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error => next(error));
  }
  
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User; 