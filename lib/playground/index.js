#!/usr/bin/env node

import yargs from 'yargs';
import { parse as parseYaml } from 'yaml';
import { hideBin } from 'yargs/helpers';
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, cpSync } from 'fs';
import { normalize, resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { render } from 'ejs';
import cpy from 'cpy';
import imageToBase64 from 'image-to-base64';

import Example from './src/example.mjs';

const argv = yargs(hideBin(process.argv)).parse();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let config = {
    template: join(__dirname, `template/`),
    styles: [],
    runtime: []
}

if (argv.config) {
    config = {
        ...config,
        ...parseYaml(readFileSync(resolve(argv.config), 'UTF-8'))
    }
}

if (argv.src) {
    config = {
        ...config,
        src: argv.src
    }
}

if (argv.out) {
    config = {
        ...config,
        out: argv.out
    }
}

if (!config.src) {
    throw "No source directory is set!"
}

if (!config.out) {
    throw "No output directory is set!"
}

if (config.logo) {
    config.logo = await imageToBase64(resolve(config.logo));
    config.logo = `data:image/png;base64,${config.logo}`;
}

const examples = readdirSync(resolve(config.src))
    .map(dir => new Example(resolve(join(config.src), dir)) );

await cpy(`${config.src}/**`, `${resolve(normalize(`${config.out}/`))}/entries`);
await cpy(`${config.template}/**`, `${resolve(normalize(`${config.out}/`))}/`);

for (let style of config.styles) {
    
}

const userstyles = await Promise.allSettled(config.styles.map( style => {
    const userstyle = cpy(resolve(style), `${resolve(normalize(`${config.out}/userstyles`))}/`)
        .then(file => {
            return file[0].replace(resolve(config.out), '')
        });

    return userstyle;
})).then(results => results.map(result => result.value));

await cpy(join(__dirname, './template/logo.png'), resolve(normalize(`${config.out}/`)));
await cpy(join(__dirname, './template/favicon.png'), resolve(normalize(`${config.out}/`)));

writeFileSync(
    resolve(normalize(`${config.out}/index.html`)),
    render(readFileSync(join(__dirname, './template/index.ejs'), 'UTF-8'), {
        examples,
        userstyles,
        runtime: JSON.stringify(config.runtime),
        logo: config.logo,
        title: config.title
    })
);