// import packages
import  express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import cors from "cors"
//import connect dataBase
import ConnectDB from './config/ConnectDB';
//import our routes
import UserRoute from './routes/UserRoute'
// import our mddleware
import notFoundMiddelware from './middleware/notFoundMiddleWare';
import errorMiddelware from './middleware/errorMiddleware';
import ProductRoute from './routes/productRoute';
import authMiddelware from './middleware/authMiddleware';
import ShipRoute from './routes/shipRoute';
import OrderRoute from './routes/orderRoute';

// setUp cors options 
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

// our routes
app.use('/api/user' , UserRoute)
app.use('/api/product'  , ProductRoute)
app.use('/api/ship'  , ShipRoute)
app.use('/api/order' , authMiddelware , OrderRoute)
// app.use('/api/contacts' , authMiddelware , ContactsRoute)
// app.use('/api/chat' , authMiddelware , ChatRoute)


// our middleware
app.use(notFoundMiddelware)
app.use(errorMiddelware)

// our start fuction
const PORT = process.env.PORT || 5000
const start = async ()=>{
    console.log('ssss')
    try {
        if(!process.env.MONGO_URL) throw new Error('Key to Connect Is Missed')
        await ConnectDB(process.env.MONGO_URL)
        app.listen(PORT , ()=>{
            console.log(`app is listening on ${PORT} port`)
        })
    }
    catch (err){
       console.log(err)
    }
}
start()