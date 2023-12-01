import css from "./Loading.module.css";
import React from "react";

export const Loading: React.FC<{children?: string}> = ({children}) =>  {
  return <div className={css.loadingWrapper}>
    <div className={css.loadingContainer} >
      <span className={css.loader}></span>
      <div className={css.textMessage} > {children} </div>
    </div>
  </div>;
}