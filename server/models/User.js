const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  },
  mobileNo: {
      type: Number,
      required: true
  },
  phoneNo: {
      type: Number,
      required: true
  },
  address: {
      type: String,
      required: true
  },
    pic: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
    
},
{collection: 'users'}, {timestamps: true});

module . exports = mongoose.model('User', userSchema);
