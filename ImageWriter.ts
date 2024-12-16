import axios from "axios";
import { createWriteStream } from "fs";

export default class {
    private default_cache_path = "img_cache";
    
    constructor(private urls: string[]) {}

    public download() {
        this.urls.forEach(async (url) => {
            const req = await axios({ url, responseType: 'stream', method: 'get' });
            req.data.pipe(createWriteStream(this.default_cache_path));
        });
    }

    public getFiles() {
    
    }
}