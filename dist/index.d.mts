import * as react_jsx_runtime from 'react/jsx-runtime';
import { ComplexStyleRule } from '@vanilla-extract/css';
import { ComponentProps, ReactNode } from 'react';

declare const vars: {
    color: {
        white: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        black: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gray100: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gray200: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gray400: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gray500: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gray600: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gray700: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gray800: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gray900: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ignite300: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ignite500: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ignite700: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ignite900: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    font: {
        body: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
};

type VarsType = typeof vars;
interface teste {
    children: ReactNode;
    css?: (vars?: VarsType) => ComplexStyleRule;
}
declare function Button({ children, css }: teste): react_jsx_runtime.JSX.Element;
type ButtonProps = ComponentProps<typeof Button>;

export { Button, type ButtonProps };
