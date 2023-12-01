import React from "react";
import css from './layout.module.css'


type LayoutProps = {
  children:  JSX.Element[]
  | string
  | JSX.Element,
  pageName:string
}
export const Layout: React.FC<LayoutProps> = ({children, pageName}) => {


  return (
    <div className={css.wrapper}>
      <div className={css.container} >

        <div className={css.topNav}>
          <div className={css.pageName}> {pageName} </div>
        </div>

        <div className={css.content}>
          {children}
        </div>
      </div>
    </div>
  )
}