import { createServer, IncomingMessage, ServerResponse } from "http";
import { Response, Request } from "express";
import { Dirent, readFile} from "fs";
import { join } from "path";
import {listDirectories, downloadAFile} from "./directories"
import { platform, machine} from "os";




export const handler = async (req: Request, res: Response) => {
    const files = await listDirectories()
    console.log(req.url);
    console.log(machine());
    res.render("index", {files})

}

export const notFoundHandler = (req: Request, res: Response) => {
    res.writeHead(404, "Not Found")
}

export const getFile = async (req: Request, res: Response) => {
    console.log(req.url);
    const fileName = req.params.splat[req.params.splat.length - 1]
    readFile(req.url, "utf8", (err, data) => {
        if(err) throw err
        console.log(fileName);
        downloadAFile(req.url,fileName,  data)
    })

    res.redirect("/")
    
}