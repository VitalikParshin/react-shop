# HELLO

## Install & Start

### Run project locally

1. Clone the project git repository
1. Copy `.env.default` file to `.env`. This will be your local settings.
1. Install `yarn` globally
1. Install packages by running in project root `yarn`
1. Open in Chrome `http://localhost:3000/`

## Google Chrome DevTools

### React

1. In Chrome install [React DevTools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
1. After that you will have "React" tab in Debug Toolbar.

### Redux

1. In Chrome install [Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
1. After that you will have "Redux" tab in Debug Toolbar.

### Apollo

1. In Chrome install [Apollo DevTools extension](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)
1. After that you will have "Apollo" tag in Debug Toolbar.

## UI

### Translate UI library `antd-mobile` from Chinesse to English

1. Open in Chrome `https://mobile.ant.design/`
1. Right click "Translate to English"

### Work with icons

1. You can find 1M+ icons here `http://iconfont.cn/`
1. Put the icon to you component folder
1. Use JSX syntax like this

```JSX
import { Icon, List } from "antd-mobile";
...

<Icon type={require("!svg-sprite-loader!./relative/path/to/icon.svg")} />
...
<List.Item thumb={require("!svg-sprite-loader!./relative/path/to/icon.svg")} />
...
```

## Configure [Visual Studio Code](https://code.visualstudio.com/) (optional)

### Sync project settings, keybindings and extensions

1. Install extension  [Visual Studio Code Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
    * Press `cmd` + `P` and pass `ext install code-settings-sync`
1. Generate your GitHub "Personal acess token" with gist scope using this [manual](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync#steps-to-get-the-github-key)
1. Download settings, keybindings and extensions
    * press `cmd`+`P` and run action `Sync : Download Settings`.
    * past you "Personal acess token" value and then use Gist public ID: `968c3e5d7bb21f44ac9c8f7638bc4618`
