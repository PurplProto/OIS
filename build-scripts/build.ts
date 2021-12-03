#!/usr/bin/env ts-node

import { magenta, red } from 'colors/safe';
import { Command } from 'commander';
import * as figlet from 'figlet';
import { readFile } from 'fs';
import { resolve } from 'path';
import { PackageJson } from 'type-fest';

console.log(
  magenta(figlet.textSync('OIS - Build Script', { horizontalLayout: 'full' }))
);

const paths = {
  packageJson: [ __dirname, '..', 'package.json' ]
};

let packageJson: PackageJson;
const program = new Command();

readFile(resolve(...paths.packageJson), { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    console.error(
      red(`Unable to find package.json! We looked for it here: ${paths.packageJson.join('/')}`)
    );
    process.exit(1);
  }

  packageJson = JSON.parse(data);
  bootstrap();
});



function bootstrap() {
  
}
