import { createTheme } from '@vanilla-extract/css';
import {colors} from "test-azenka/tokens"

export const [themeClass, vars] = createTheme({
  color: {
    ...colors
  },
  font: {
    body: 'arial'
  }
});