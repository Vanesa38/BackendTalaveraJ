import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const userCollection = "usuarios";
const docSchema = new mongoose.Schema({
    
    name: String,
    reference: String,
})

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type:String,
        unique:true,
    },
    age: Number,
    password: String,
    rol: {
        type: String,
        default: 'Usuario'
    },

    carts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },

    documents: [docSchema],
    last_connection: {
        type: Date,
        default: null
    }

});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
