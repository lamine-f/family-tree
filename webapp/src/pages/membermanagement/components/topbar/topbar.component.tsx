import css from "./topbar.module.css";
import React from "react";

export const TopbarComponent: React.FC<{title: string}> = ({title}) => {

  return (
    <div className={css.wrapper} >
      <div className={css.container}>
        <div className={css.title} > {title} </div>
      </div>
    </div>
  )
}