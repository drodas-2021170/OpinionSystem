import { initServer } from "./configs/app.js"
import { config } from "dotenv"
import { connect } from "./configs/mongo.js"
import { defaultCategory } from "./src/category/category.controller.js"
import { defaultAdmin } from './src/auth/auth.controller.js'

config()
initServer()
connect()
//Se llama la categoria Defaul
defaultCategory()
//Se llama el admin por defecto
defaultAdmin()