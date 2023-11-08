import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId , 
                ref : 'Product' ,
                required : [true , 'لابد من توافر المنتج']
            }, 
            type : {
                type : mongoose.Schema.Types.ObjectId ,
                ref :  'Product.type' ,
                 
            } ,
            quantity : {
               type : Number , 
               required : [true , "لابد من توافر الكمية"] , 
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
        enum: ['معلق', 'قيد التشغيل' , 'تم التسليم' , 'تسليم جزئي' , 'مرتجع'] ,
        required : [true , 'Must Provide Status']
    } ,
    address : {
        type : String ,
    } , 
    notes : {
        type : String , 
    } , 
    country : {
        type : String , 
        required : [true , 'لابد من اضافة المحافظة / المركز']    
    }
})

const OrderModel = mongoose.model('Order' , orderSchema)

export default OrderModel