const fromResponse = (message, res)=>{
    res 
    .status(message?.status ?? 200)
    .send(message ?? {message:"not exsist", data:[]})
}

module.exports=fromResponse