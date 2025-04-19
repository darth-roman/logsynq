import express, { Express } from "express";
import { handler, getFile } from "./handler";
import { join } from "path"; 


// Configure Express to use EJS


const expressApp : Express = express()
const PORT = 5001

expressApp.set( "views", join( __dirname, "views" ) );
expressApp.set( "view engine", "ejs" );

expressApp.get("/", handler)
expressApp.get("*splat", getFile)

// try{
// }catch(error){
//     console.log(error);
// }


expressApp.listen(PORT, () => {
    console.log(`Listening on: ${PORT}`);
})


