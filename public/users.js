/*import userModel from './models/userModel.js';
import cartModel from './models/cart.js';

class Userdb{

    constructor(){}

    async addNewUser(userToBeAdded){
        let cart = await cartModel.create({});

        userToBeAdded.cart = cart["_id"];

        return userModel.create(userToAdd);
    }

    findUser(email, pass){
        return userModel.find({email, password:pass});
    }

}

export default Userdb;*/