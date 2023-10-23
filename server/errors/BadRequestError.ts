import CustomError from "./customError";

class BadRequestError extends CustomError {
    
    constructor(msg : string , field? : string) {
        super(msg , 400 , field)
    }
}

const throwBadRequestError = (msg : string , field? : string) =>{
     throw new BadRequestError(msg , field)
}

export default throwBadRequestError