import css from "./Loading.module.css";
import React from "react";

export const Loading: React.FC<{children?: string, cancel: () => any}> = ({children, cancel}) =>  {



  // @ts-ignore
  return <div className={css.loadingWrapper}>
    <div className={css.loadingContainer} >
      <span className={css.loader}></span>
      <div className={css.textMessage} > {children} </div>
      <button onClick={() => {
        cancel!()
      }} >Annuler</button>
    </div>
  </div>;
}