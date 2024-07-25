import { ComplexStyleRule, style } from "@vanilla-extract/css";
import { themeClass, vars } from '../styles/theme.css';
import { ComponentProps, ReactNode } from "react";

type VarsType = typeof vars;

interface teste {
    children: ReactNode
    css?: (vars?:VarsType) => ComplexStyleRule
}

export function Button({ children, css}: teste) {

  let classNames = ""
  if(css){
    classNames = style(css(vars))
  }

  return (
      <div className={themeClass}>
          <button className={classNames}>
              {children}
          </button>
      </div>
  )
}

export type ButtonProps = ComponentProps<typeof Button>





// export const Button = styled('button', {
//   fontFamily: '$default',
//   backgroundColor: '$ignite300',
//   borderRadius: '$sm',
//   border: 0,
//   fontWeight: 'bold',
//   color: '$white',

//   variants: {
//     size: {
//       small: {
//         fontSize: 14,
//         padding: '$2 $4',
//       },
//       big: {
//         fontSize: 16,
//         padding: '$3 $6',
//       },
//     },
//   },

//   defaultVariants: {
//     size: 'small',
//   },
// })

// export type ButtonProps = ComponentProps<typeof Button>
