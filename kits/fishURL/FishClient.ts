import axios from "axios";

export default class {
    public domains: string[] = [];
    public url: string = "https://api.fishfish.gg/v1";
    
    public async pullDomains() {
        const res = await axios.get(`${this.url}/domains`);
    }
}