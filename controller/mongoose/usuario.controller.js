const mongoose = require('mongoose')
const { Schema } = mongoose;

const userModel = require('../../models/user.model')

const options = {
    timestamps: { createdAt: 'created_at'}
}

const userSchema = new Schema(userModel);

const User = mongoose.model('User', userSchema)

module.exports = {User};

/* const admin = new User({
    id: uuidv4.v4(),
    username: 'deivit',
    email: 'admin@olddonkeygarage.com',
    password: '123',
    role: 'admin',
    asd: 'kñj'
}) */

/* admin.save((err, msg) => {
    if (err) return console.error(err)
    console.log(msg);
})
 */
