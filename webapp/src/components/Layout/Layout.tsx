import React from "react";
import css from './Layout.module.css'
import {Outlet} from "react-router-dom";
import {SidebarNavigator} from "../../navigator/sidebar/sidebar.navigator";
import {Toaster} from "react-hot-toast";
export const Layout: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.container} >

        <div className={css.bar}>
          <SidebarNavigator />
        </div>

        <div className={css.content} >
          <Toaster position={"top-right"}  />

          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}