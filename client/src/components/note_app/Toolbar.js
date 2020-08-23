import React from 'react';
import Menu from './Menu'
import { css, cx } from 'emotion'

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        padding: 1px 18px 17px;
        border-bottom: 2px solid #eee;
        margin-bottom: 20px;
      `
    )}
  />
))