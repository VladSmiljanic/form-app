const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  created:{
    date: Date,
    default: Date.now
  },
  email:{
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: "Please provide an email!"
  },
  forms:[{
    type: Schema.Types.ObjectID,
    ref: "Forms"
  }]
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' }); //Allows method .register()
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
