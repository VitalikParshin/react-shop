# React + Redux + GraphQL

## Technology stack

### Front-end

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/) to manage app's state
* [Apollo Client](http://dev.apollodata.com/) to manage GraphQL
* [Webpack 3](https://webpack.js.org/) with [React Hot Loader](http://gaearon.github.io/react-hot-loader/)
* [CSS-Modules](https://github.com/css-modules/css-modules) to forget about BEM
* [TypeScript](https://www.typescriptlang.org/) to add powerfull tools to IDE, document and cover you code with type definitions

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

* An in-browser IDE for exploring GraphQL. Try [this query](http://buybag.com.ua/graphiql?query=query%20%7B%0A%20%20allProducts(categoryId%3A62%2C%20first%3A2%2C%20offset%3A0)%20%7B%0A%20%20%20%20total%0A%20%20%20%20products%20%7B%0A%20%20%20%20%20%20category%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20brand%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20images%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20src%0A%20%20%20%20%20%20%20%20isTitle%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%09attributes%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20values%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%20%20%20%20%20%20%0A%20%20%20%20%20%20subProducts%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20article%0A%20%20%20%20%20%20%20%20attributes%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20values%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=).

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

1. Install [VSCode ](https://code.visualstudio.com/)
1. Open it and install extension [Visual Studio Code Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
    * Press `cmd` + `P` and pass `ext install code-settings-sync`
1. Generate your GitHub "Personal acess token" with gist scope using this [manual](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync#steps-to-get-the-github-key)
1. Download settings, keybindings and extensions
    * press `cmd`+`P` and run action `Sync : Download Settings`.
    * past you "Personal acess token" value and then use Gist public ID: `968c3e5d7bb21f44ac9c8f7638bc4618`

## UI with [Ant Design Mobile](https://mobile.ant.design/) lib

### Work with icons

1. You can find 1M+ icons here `http://iconfont.cn/`
1. Put the icon to you component folder
1. Use JSX syntax like this

```JSX
import { Icon, List } from "antd-mobile";

// Example 1
<Icon type={require("!svg-sprite-loader!./icon.svg")} />

// Example 2
<List.Item thumb={require("!svg-sprite-loader!./icon.svg")} />

```

### Translate docs from Chinesse to English

1. Open in Chrome [https://mobile.ant.design/](https://mobile.ant.design/)
1. Right click "Translate to English". And don't panic, tranlation in progress!
