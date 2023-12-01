import React, {useState} from "react";
import css from "./leftside.module.css"
import {SideMenuComponent, SideMenusComponent} from "./components/sidemenu/sidemenu.component";
import {faMinus, faPlus, faUserMinus, faUserPen, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type LeftSideProps = {
}
export const LeftSide: React.FC<LeftSideProps> = () => {

  const [root, _] = useState<string>("member")

  return (
    <div className={css.wrapper} >
      <div className={css.container} >
        <SideMenusComponent>
          <SideMenuComponent icon={<FontAwesomeIcon icon={faUserPlus} />} title={"Ajouter un membre"} root={root} location={"add"}/>
          <SideMenuComponent icon={<FontAwesomeIcon icon={faUserPen} />} title={"Modifier un membre"} root={root} location={"modify"} />
          <SideMenuComponent icon={<FontAwesomeIcon icon={faUserMinus} />} title={"Supprimer un membre"} root={root} location={"delete"} />
          <SideMenuComponent icon={<FontAwesomeIcon icon={faPlus} />} title={"Ajouter une relation"} root={root} location={"add-relation"} />
          <SideMenuComponent icon={<FontAwesomeIcon icon={faMinus} />} title={"Supprimer une relation"} root={root} location={"delete-relation"} />
        </SideMenusComponent>
      </div>
    </div>
  )
}