import mongoose from 'mongoose'

export const connect = async() =>{
    try {
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB | Could not be connected to mongodb')
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | try connecting ')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | connected to mongodb')       
        })
        mongoose.connection.once('open', ()=>{
            console.log('MongoDB | connected to database')
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB | reconnected to mongodb')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB | disconnected')
        })

        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50,
                serverSelectionTimeoutMS:5000
            }
        )
    } catch (err) {
        console.error('Database failed', err)
    }
}