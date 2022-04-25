#!/bin/bash

touch .gitignore
echo "node_modules
dist
.vscode
.nyc_output
notes.md
scripts.md
rules.md
coverage" >> .gitignore

npm init -yes

touch tsconfig.json

echo "{
  \"exclude\": [
    \"test\",
    \"node_modules\",
    \"dist\"
  ],
  \"compilerOptions\": {
    \"target\": \"ES2020\",
    \"module\": \"commonjs\",
    \"declaration\": true,
    \"outDir\": \"./dist\",
    \"esModuleInterop\": true,
    \"forceConsistentCasingInFileNames\": true,
    \"strict\": true,
    \"skipLibCheck\": true
  }
}" >> tsconfig.json

mkdir src
mkdir test

npm insatll -g eslint
eslint --init
sed -i '$d' .eslintrc.json
sed -i '$d' .eslintrc.json
echo "
    \"require-jsdoc\": \"off\",
        \"valid-jsdoc\": \"off\",
        \"eol-last\": \"off\"
    }
}" >> .eslintrc.json


npm install --save-dev tsc-watch

npm install typedoc

npm install --save-dev mocha chai @types/mocha @types/chai ts-node

touch .mocharc.json
echo "{
  \"extension\": [\"ts\"],
  \"spec\": \"test/**/*.spec.ts\",
  \"require\": \"ts-node/register\"
}" >> .mocharc.json

touch typedoc.json
echo "{
  \"entryPoints\": [
    \"src\"
  ],
  \"out\": \"./docs\"
}" >> typedoc.json

npm install --save-dev typescript

npm install

npm install nyc

touch notes.md
echo "# $1" >> notes.md
echo "Should add scripts in package.json" >> notes.md
echo "Should add entryPoint in typedoc.json" >> notes.md
echo "Should change _config info" >> notes.md
echo "Should configure GitHub Actions and Secrets" >> notes.md
echo "Should configure GitHub Pages" >> notes.md
echo "Should configure sonar-project.properties file" >> notes.md

touch sonar-project.properties

touch scripts.md
echo "# $1" >> scripts.md
echo "'test': 'mocha'," >> scripts.md
echo "'coverage': 'nyc npm test'," >> scripts.md
echo "'coveralls': 'nyc npm test && nyc report --reporter=lcov'," >> scripts.md
echo "'start': 'tsc-watch --onSuccess \"node dist/*.js\"'," >> scripts.md
echo "'doc': 'typedoc'," >> scripts.md
echo "'make': 'node ./dist/*.js'" >> scripts.md

touch _config.yml
echo "title: Práctica X" >> _config.yml
echo "description: ________________" >> _config.yml
echo "theme: jekyll-theme-cayman" >> _config.yml

mkdir .github
mkdir .github/workflows
touch tests.yml
echo "# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node" >> tests.yml
echo "# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions" >> tests.yml
echo "\n" >> tests.yml
echo "name: Tests" >> tests.yml
echo "\n" >> tests.yml
echo "on:" >> tests.yml
echo "  push:" >> tests.yml
echo "    branches: [ main ]" >> tests.yml
echo "  pull_request:" >> tests.yml
echo "    branches: [ main ]" >> tests.yml
echo "\n" >> tests.yml
echo "jobs:" >> tests.yml
echo "  tests:" >> tests.yml
echo "\n" >> tests.yml
echo "    runs-on: ubuntu-latest" >> tests.yml
echo "\n" >> tests.yml
echo "    strategy:" >> tests.yml
echo "      matrix:" >> tests.yml
echo "        node-version: [12.x, 14.x, 16.x]" >> tests.yml
echo "        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/" >> tests.yml
echo "\n" >> tests.yml
echo "    steps:" >> tests.yml
echo "    - uses: actions/checkout@v2" >> tests.yml
echo "    - name: Use Node.js ${{ matrix.node-version }}" >> tests.yml
echo "      uses: actions/setup-node@v2" >> tests.yml
echo "      with:" >> tests.yml
echo "        node-version: ${{ matrix.node-version }}" >> tests.yml
echo "    - run: npm install" >> tests.yml
echo "    - run: npm test" >> tests.yml

touch coveralls.yml
echo "name: Coveralls" >> coveralls.yml
echo "\n" >> coveralls.yml
echo "on:" >> coveralls.yml
echo "  push:" >> coveralls.yml
echo "    branches: [ main ]" >> coveralls.yml
echo "  pull_request:" >> coveralls.yml
echo "    branches: [ main ]" >> coveralls.yml
echo "\n" >> coveralls.yml
echo "jobs:" >> coveralls.yml
echo "  coveralls:" >> coveralls.yml
echo "\n" >> coveralls.yml
echo "    runs-on: ubuntu-latest" >> coveralls.yml
echo "\n" >> coveralls.yml
echo "    steps:" >> coveralls.yml
echo "    - name: Cloning repo" >> coveralls.yml
echo "      uses: actions/checkout@v2" >> coveralls.yml
echo "    - name: Use Node.js 16.x" >> coveralls.yml
echo "      uses: actions/setup-node@v2" >> coveralls.yml
echo "      with:" >> coveralls.yml
echo "        node-version: 16.x" >> coveralls.yml
echo "    - name: Installing dependencies" >> coveralls.yml
echo "      run: npm install" >> coveralls.yml
echo "    - name: Generating coverage information" >> coveralls.yml
echo "      run: npm run coveralls" >> coveralls.yml
echo "    - name: Coveralls GitHub Actions" >> coveralls.yml
echo "      uses: coverallsapp/github-action@master" >> coveralls.yml
echo "      with: " >> coveralls.yml
echo "        github-token: ${{ secrets.GITHUB_TOKEN }}" >> coveralls.yml

touch sonarcloud.yml
echo "name: Sonar-Cloud" >> sonarcloud.yml
echo "\n" >> sonarcloud.yml
echo "on:" >> sonarcloud.yml
echo "  push:" >> sonarcloud.yml
echo "    branches: [ main ]" >> sonarcloud.yml
echo "  pull_request:" >> sonarcloud.yml
echo "    branches: [ main ]" >> sonarcloud.yml
echo "\n" >> sonarcloud.yml
echo "jobs:" >> sonarcloud.yml
echo "  sonarcloud:" >> sonarcloud.yml
echo "    name: SonarCloud" >> sonarcloud.yml
echo "    runs-on: ubuntu-latest" >> sonarcloud.yml
echo "    steps:" >> sonarcloud.yml
echo "      - name: Cloning repo" >> sonarcloud.yml
echo "        uses: actions/checkout@v2" >> sonarcloud.yml
echo "        with:" >> sonarcloud.yml
echo "          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis" >> sonarcloud.yml
echo "      - name: Use Node.js 16.x" >> sonarcloud.yml
echo "        uses: actions/setup-node@v2" >> sonarcloud.yml
echo "        with:" >> sonarcloud.yml
echo "          node-version: '16.x'" >> sonarcloud.yml
echo "      - name: Installing dependencies" >> sonarcloud.yml
echo "        run: npm install" >> sonarcloud.yml
echo "      - name: Generating coverage report" >> sonarcloud.yml
echo "        run: npm run coveralls" >> sonarcloud.yml
echo "      - name: SonarCloud Scan" >> sonarcloud.yml
echo "        uses: SonarSource/sonarcloud-github-action@master" >> sonarcloud.yml
echo "        env:" >> sonarcloud.yml
echo "          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any" >> sonarcloud.yml
echo "          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}" >> sonarcloud.yml

npm install --save-dev @types/node

npm install chalk@4.1.2

npm install yargs
npm install --save-dev @types/yargs