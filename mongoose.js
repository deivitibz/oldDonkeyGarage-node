const mongoose = require("mongoose");
const uuidv4 = require("uuid");

const mongooseInit = () => {

    mongoose.connect("mongodb://172.40.2.3:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=> console.log('mongoose connected'));

}

module.exports = {mongooseInit}