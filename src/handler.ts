import { createServer, IncomingMessage, ServerResponse } from "http";
import { Response, Request } from "express";
import { Dirent, readFile} from "fs";
import { join } from "path";
import {listDirectories, downloadAFile} from "./directories"




export const handler = async (req: Request, res: Response) => {
    const files = await listDirectories()
    console.log(req.url);
    res.render("index", {files})

}

export const getFile = async (req: Request, res: Response) => {
    console.log(req.url);
    readFile(req.url, "utf8", (err, data) => {
        if(err) throw err
        console.log(data)
        downloadAFile(req.url, data)
    })

    res.redirect("/")
    
}