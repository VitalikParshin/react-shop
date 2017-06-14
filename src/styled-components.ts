import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import ITheme from "./theme";

const {
    default: styled,
    css,
    injectGlobal,
    keyframes,
    ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
