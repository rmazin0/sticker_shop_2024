import { Schema, model } from "mongoose";
import mongooseModelValidator from "mongoose-unique-validator";
import validator from "validator";
import bcrypt from "bcrypt";

const {isEmail} = validator
const UserSchema = new Schema({
    username: {
        type:String,
        required: [true, 'Username is required.'],
        unique: [true, 'Username is already taken.']
    },
    email: {
        type:String,
        required: [true, 'Email is required.'],
        unique: [true, 'Email is already taken.'],
        validate: [isEmail, 'Invalid Email.']
    },
    password : {
        type:String,
        required: [true, 'Password is required.'],
        minLength: [8, 'Password must be at least 8 characters.']
    },
    isAdmin : {
        type:Boolean,
        default:false
    }
}, {timestamps: true})
UserSchema.plugin(mongooseModelValidator, {message:'A user with this {PATH} already exists.'});

UserSchema.virtual('confirmPassword')
    .get(function() {
        return this._confirmPassword
    })
    .set(function(value) {
        this._confirmPassword = value
    })

UserSchema.pre('validate', function(next) {
    if(this.confirmPassword === ''){
        this.invalidate('confirmPassword', 'Confirm Password is required.')
    }
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match.')
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

UserSchema.virtual('adminPass')
    .get(function() {
        // console.log('get',this._adminPass);
        return this._adminPass
    })
    .set(function(value) {
        // console.log('set', value);
        this._adminPass = value
    })

UserSchema.pre('validate', function(next) {
    // console.log('validate adminPass',this.adminPass);
    if(this.adminPass === ''){
        this.invalidate('adminPass', 'Enter Key.')
    }
    if(process.env.ADMIN_SECRET_KEY !== this.adminPass){
        this.invalidate('adminPass', 'Invalid Key.')
    }
    next()
})

const User = model('User', UserSchema)
export default User;