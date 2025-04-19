import { Dirent } from "fs";
import { join } from "path";

export class FileEntry {
    dir: Dirent 
    files: string[]

    constructor(dir: Dirent, files: string[]){
        this.dir = dir
        this.files =files
    }
}

