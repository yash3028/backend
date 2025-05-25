import { error } from 'console';
import app from './app'
import { data_source } from './database'
import dotenv from 'dotenv'
dotenv.config()
const port = Number(process.env.PORT) || 8000;
console.log('PORT:', process.env.PORT);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
data_source.initialize().then(()=>{
    app.listen(port,()=>{
        console.log("running on port")
          console.log(`Swagger docs at http://localhost:${port}/api-docs`);

    });
})
.catch((error)=>{
console.log(error)
})