//модель для добавление в базу задач
const {Schema, model} = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        minlength:[5, 'too few letters'],
        maxlength:[20, 'too more letters'],

    },
    name: {
        type: String,
        required: true,
        minlength:[2, 'too few letters'],
        maxlength:[15, 'too more letters'],

    },
    soname: {
        type: String,
        required: true,
        minlength:[3, 'too few letters'],
        maxlength:[20, 'too more letters'],

    },
    email: {
      type: String,
      required: true,
      minlength:[3, 'too few letters'],
      maxlength:[30, 'too more letters'],
  },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },

});

//методы создание пароля
UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };
  UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };
  UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      name:this.name,
      soname:this.soname,    
      login: this.login,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  }
  
  //метод для аутентификации
  UserSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      name:this.name,
      soname:this.soname,    
      login: this.login,
      token: this.generateJWT(),
    };
  };

module.exports = model('User',UserSchema);

