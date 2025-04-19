import { Dirent, createWriteStream } from "node:fs";
import { opendir, readdir } from "node:fs/promises";
import { FileEntry } from "./FineEntry";
import { get } from "node:http";
import { Readable } from "node:stream";

const logSeqDir: string = "/home/darth-roman/Documents/logsec/"

export const listDirectories = async () => {
    try{
        const dir = await opendir(logSeqDir)
        let fileEntries : FileEntry[] = []
        for await (const dirent of dir){
            let dirFiles = await readADirectory(dirent)
            if(dirFiles) {
                const fileEntry = new FileEntry(dirent, dirFiles)
                fileEntries.push(fileEntry)
            }
        }
        return fileEntries;
    }catch(error){
        console.log(error);
    }
}

export const readADirectory = async (dir: Dirent) => {
    try{
        const files = await readdir(`${logSeqDir}/${dir.name}`)
        return files
    }catch(error){
        console.log(error);
    }
}

export const downloadAFile = async (path: string, data: any) => {
    try{
        const fileMD = createWriteStream("newfile.md")
        const readable = new Readable({
            read(size) {
                return true
            },
        })

        readable.pipe(fileMD)

        fileMD.on("data", (data) => {
            fileMD.on("finish", ()=>{
                fileMD.close()
            })
        })

        // const request = get(path, (response) => {
        //     response.pipe(fileMD)

        //     fileMD.on("finish", () => {
        //         fileMD.close()
        //         console.log(fileMD);
        //     })
        // })

        console.log(fileMD);

    }catch(error){
        console.log(error);
    }
}