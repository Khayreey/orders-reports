import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const ConnectDB = (url : string)=> {
    return mongoose.connect(url)
}

export default ConnectDB