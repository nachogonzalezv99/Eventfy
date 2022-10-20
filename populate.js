import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import Job from './models/Job.js'
import Activity from './models/Activity.js'
import Event from './models/Event.js'

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await Job.deleteMany()
        await Activity.deleteMany()

        const jsonJobs = JSON.parse(
            await readFile(new URL('./jobs-mock-data.json', import.meta.url))
        )
 
        const jsonActivities = JSON.parse(
            await readFile(new URL('./activities-mock-data.json', import.meta.url))
        )

        await Job.create(jsonJobs)
        await Activity.create(jsonActivities)
        console.log('Success!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()