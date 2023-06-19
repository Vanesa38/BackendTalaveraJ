import mongoose from "mongoose";
import User from "../public/users.js";
import Assert from "assert"

mongoose.connect("mongodb")

const assert = Assert.strict;
describe('Testing Users Dao', ()=>{
    before(function (){
        this.users = new User()
    })

    it('El users debe poder obtener los usuarios en formato de arreglo', ()=>{
        console.log(this.users)
    })
    beforeEach ( function () {
        this.timeout(5000)
    })
})