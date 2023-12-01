import React, {useContext} from "react";
import css from "./membermanagement.module.css"
import {Layout} from "../layout";
import {LeftSide} from "./components/leftside/leftside";
import {Outlet} from "react-router-dom";
import RelationDataContext from "../../store/MemberManagement/RelationAdd";


type MemberManagementProps = {
}
export const MemberManagement: React.FC<MemberManagementProps> = () => {

  return (
    <Layout pageName={"Gestion"}>
      <div className={css.wrapper} >
        <div className={css.container} >
          <div className={css.bar} >
            <LeftSide/>
          </div>
          <div className={css.content} >
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </Layout>
  )
}