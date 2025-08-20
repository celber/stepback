import { readdirSync, readFileSync, existsSync } from "fs";
import { basename } from "path";
import { parse } from "yaml";

export default class Example {
    id = null
    files = []
    manifest = {}

    constructor(directory, options = {}) {
        this.id = basename(directory);
        this.directory = directory;
        this.files = readdirSync(directory)
        this.manifest = this.loadManifest();

        this.name = this.manifest.name || this.id;
        this.description = this.manifest.description;
    }

    loadManifest() {
        let manifest = {};
        if (existsSync(this.directory+'/manifest.json')) {
            manifest = JSON.parse(readFileSync(this.directory+'/manifest.json', 'UTF-8'));
        } else if (existsSync(this.directory+'/manifest.yaml')) {
            manifest = parse(readFileSync(this.directory+'/manifest.yaml', 'UTF-8'));
        } else if (existsSync(this.directory+'/manifest.yml')) {
            manifest = parse(readFileSync(this.directory+'/manifest.yml', 'UTF-8'));
        }
        
        return manifest;
    }
}