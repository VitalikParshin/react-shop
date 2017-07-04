# Shop starter kit for mobile devices. [Online demo](http://shop.serga.name/)

_WARNING! It's experimental project just for fun!_

## Big future goal

1. Single crossplatform front-end (i.e. monorepo using [Lerna](https://github.com/lerna/lerna) to share code beetween platforms):
    * Mobile web (react + antd-mobile)
    * Web (react + ant-mobile)
    * Android and iOS native apps (react-native + antd-mobile)
1. Single crossplatform back-end (GraphQL server)

## Principle

* rapid crossplatform prototyping
* share code as much as posible (DRY)
* get from tooling (IDE, DevTools, linters) as much as posible

## Current technology stack (mobile web)

### Front-end

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/) to manage app's state
* [Apollo Client](http://dev.apollodata.com/) to manage GraphQL
* [Webpack 3](https://webpack.js.org/) with [React Hot Loader](http://gaearon.github.io/react-hot-loader/)
* [CSS-Modules](https://github.com/css-modules/css-modules)
* [TypeScript](https://www.typescriptlang.org/)

### Back-end

* [GraphQL](http://graphql.org/) API using [Python Graphene](http://graphene-python.org/)

## How to install

### Run project locally

1. [Install `yarn`](https://yarnpkg.com/lang/en/docs/install/) globally
1. Clone git project and `cd` to it
1. Copy `.env.default` file to `.env` with command `cp .env.default .end`. This will be your local settings
1. Install packages by running in project root `yarn`
1. Open in Chrome browser [http://localhost:3000/](http://localhost:3000/) and enable [mobile device simulator](https://developers.google.com/web/tools/chrome-devtools/device-mode/) in DevTools

## Debugging

### GraphiQL

* An in-browser IDE for exploring GraphQL API. Try [this query](http://shop.serga.name/graphiql?query=query%20%7B%0A%20%20allProducts(categoryId%3A62%2C%20first%3A2%2C%20offset%3A0)%20%7B%0A%20%20%20%20total%0A%20%20%20%20products%20%7B%0A%20%20%20%20%20%20category%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20brand%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20images%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20src%0A%20%20%20%20%20%20%20%20isTitle%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%09attributes%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20values%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%20%20%20%20%20%20%0A%20%20%20%20%20%20subProducts%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20article%0A%20%20%20%20%20%20%20%20attributes%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20values%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=).

### React DevTools

1. In Chrome install [React DevTools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
1. After that, you will have "React" tab in Debug Toolbar.

### Redux DevTools

1. In Chrome install [Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
1. After that, you will have "Redux" tab in Debug Toolbar.

### Apollo DevTools

1. In Chrome install [Apollo DevTools extension](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)
1. After that, you will have "Apollo" tag in Debug Toolbar.

## Configure Visual Studio Code (optional)

### Sync project settings, keybindings and extensions

1. Install [VSCode](https://code.visualstudio.com/)
1. Open it and install extension [Visual Studio Code Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
    * Press `cmd` + `P` and pass `ext install code-settings-sync`
1. Generate your GitHub "Personal acess token" with gist scope using this [manual](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync#steps-to-get-the-github-key)
1. Download settings, keybindings and extensions
    * press `cmd`+`Символ клавиши Shift`+`P` and run action `Sync : Download Settings`.
    * past you "Personal acess token" value and then use Gist ID: `968c3e5d7bb21f44ac9c8f7638bc4618`

## UI with [Ant Mobile](https://ant.design/) and [Ant Design Mobile](https://mobile.ant.design/)

### Why ant-design and antd-mobile

* Based on React, written in TypeScript
* Dozens of features
* Subjectively one of the most mature UI library
* Intensively developed and powered by Alibaba
* Crossplatform support:
  * [Ant Design](https://ant.design/) for web + desktop native
  * [Ant Design Mobile](https://mobile.ant.design/) for mobile web + mobile native
