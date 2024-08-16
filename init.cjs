const fs = require('fs');
const { execSync } = require('child_process');

const DIRECTORY = process.argv[2];
if (!DIRECTORY) {
  console.log('Please provide a folder name');
  process.exit(1);
}

// install deps
try {
  process.chdir(DIRECTORY);
  execSync('npm install @antfu/eslint-config -y', { stdio: 'inherit' });
  execSync('npm install', { stdio: 'inherit' });
  execSync('npm install -D typescript @types/three', { stdio: 'inherit' });
} catch (error) {
  console.error('Error: failed to install the dependencies.', error);
  process.exit(1);
}

// copy all config
try {
  process.chdir('..');
  fs.copyFileSync('.gitignore.inner', `${DIRECTORY}/.gitignore`);
  fs.copyFileSync('eslint.config.js', `${DIRECTORY}/eslint.config.js`);
  fs.copyFileSync('tsconfig.json.base', `${DIRECTORY}/tsconfig.json`);
  fs.copyFileSync('.editorconfig', `${DIRECTORY}/.editorconfig`);
} catch (error) {
  console.error('Error: failed to copy the config files to the correct location.', error);
  process.exit(1);
}

// add 'lint' and 'lint:fix' to the script section of the package.json
try {
  process.chdir(DIRECTORY);
  const pkg = JSON.parse(fs.readFileSync('package.json'));
  pkg.scripts = {
    ...pkg.scripts,
    build: 'tsc && vite build',
    lint: 'eslint .',
    'lint:fix': 'eslint --fix .',
  };
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
} catch (error) {
  console.error('Error: failed to update package.json.', error);
  process.exit(1);
}

// rename src/script.js to src/index.ts
try {
  fs.renameSync('src/script.js', 'src/index.ts');
  // replace script.js with index.ts in index.html
  const indexHtml = fs.readFileSync('src/index.html', 'utf8');
  fs.writeFileSync('src/index.html', indexHtml.replace('script.js', 'index.ts'));
} catch (error) {
  console.error('Error: failed to rename src/script.js to src/index.ts.', error);
  process.exit(1);
}

// if vite.config.js exists, prepend it with the explicit import of node:process
try {
  if (fs.existsSync('vite.config.js')) {
    const content = fs.readFileSync('vite.config.js', 'utf8');
    fs.writeFileSync('vite.config.js', `import process from 'node:process'\n\n${content}`);
  }
} catch (error) {
  console.error('Error: failed to prepend vite.config.js with the explicit import of node:process.', error);
  process.exit(1);
}

// run lint:fix
execSync('npm run lint:fix', { stdio: 'inherit' });
