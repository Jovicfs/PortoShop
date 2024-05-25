import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate:{
            validator: function(value){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: props => `${props.value} não é um e-mail válido!`
        }
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    isAdmin:{
       type: Boolean 
    }
})

const User = mongoose.model('User', userschema);

export default User;