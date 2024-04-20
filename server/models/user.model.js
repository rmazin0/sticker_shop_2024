import { Schema, model } from "mongoose";
import mongooseModelValidator from "mongoose-unique-validator";
import validator from "validator";
import bcrypt from "bcrypt";

const {isEmail} = validator
const UserSchema = new Schema({
    username: {
        type:String,
        required: [true, 'Username is required!'],
        unique: [true, 'Username is already taken!']
    },
    email: {
        type:String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email is already taken!'],
        validate: [isEmail, 'invalid email']
    },
    password : {
        type:String,
        required: [true, 'Password is required!'],
        minLength: [8, 'Password must be at least 8 characters']
    },
    isAdmin : {
        type:Boolean,
        default:false
    }
}, {timestamps: true})
UserSchema.plugin(mongooseModelValidator);

UserSchema.virtual('confirmPassword')
    .get(function() {
        return this._confirmPassword
    })
    .set(function(value) {
        this._confirmPassword = value
    })

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match!')
    }
    next()
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 8)
        .then(hash => {
            this.password = hash
            next()
        })
})

const User = model('User', UserSchema)
export default User;