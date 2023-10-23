/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose' 




const productSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , 'you must provide user']
    } , 
    type : 
    [
           {name : {
                 type : String , 
                 
             } , 
             quantity : {
                 type : Number , 
                 min: [0, 'Too few eggs'] ,
                 validate: {
                    validator: function(v : any) {
                      return v > 0;
                    },
                    message: (props :any) => `${props.value} is not a valid phone number!`
                  },
             }
          }
         ] , 
    quantity : {
        type : Number , 
        required : [true , 'you must provide quantity']
    }        
            
    
})

const ProductModel = mongoose.model('Product' , productSchema) 

export default ProductModel

 // 