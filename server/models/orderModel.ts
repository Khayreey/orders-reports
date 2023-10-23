import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId , 
                ref : 'Product' ,
                required : [true , 'you must provide product']
            } , 
            quantity : {
               type : Number , 
               required : [true , "You Must Provide Product quantity"] , 
               minLength : 1 , 
               default : 1
            }
        }
    ] ,
    shipId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Ship' , 
        required : [true , 'you must provide Ship Responsible']
    } ,
    status : {
        type : String ,
        enum: ['now', 'pending' , 'done' , 'halfDone' , 'return'] ,
        required : [true , 'Must Provide Status']
    } ,
    address : {
        type : String ,
    } , 
    notes : {
        type : String , 
    }
})

const OrderModel = mongoose.model('Order' , orderSchema)

export default OrderModel