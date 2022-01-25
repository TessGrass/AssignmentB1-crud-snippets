import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'The password must be of minimum length 8 characters.'],
    maxlength: [100, 'The password must be of maximum length 100 characters.']
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 *
 * @param {*} username 
 * @param {*} password 
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }

  return user
}

export const User = mongoose.model('User', userSchema)
