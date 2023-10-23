import mongoose from 'mongoose'

const shipSchema = new mongoose.Schema({
    name : {
        type : String , 
        require : [true , 'you must provide ship name']
    } , 
    phone : {
        type : String , 
        required : [true , "You Must Provide Contact Phone"] , 
        maxLength : 11 ,
        minLength : 11 , 
        unique : true 
    }
})


const ShipModel = mongoose.model('Ship' , shipSchema)

export default ShipModel