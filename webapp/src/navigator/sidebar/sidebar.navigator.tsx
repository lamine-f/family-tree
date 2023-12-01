import React from "react";
import css from "./sidebar.module.css"
import {User} from "../../_helpers/const";
import {UserProfilComponent} from "./components/userprofile/userprofil.component";
import {
  SideMenuComponent,
  SideMenusComponent,
} from "./components/sidemenu/sidemenu.component";

import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faTree, faUsers} from "@fortawesome/free-solid-svg-icons";

type SidebarNavigatorProps = {
}
export const SidebarNavigator: React.FC<SidebarNavigatorProps> = () => {

  const connectedUser: User = {
    picture: "",
    id: "0",
    lastName: "Faye",
    firstName: "Mouhamed Lamine"
  }

  return (
    <div className={css.wrapper} >
      <div className={css.container} >

        <UserProfilComponent user={connectedUser} />
        <SideMenusComponent>
          <SideMenuComponent active={true} icon={<FontAwesomeIcon icon={faTree} />} title={"Arbre généalogique"} location={"node"}/>
          <SideMenuComponent active={false} icon={<FontAwesomeIcon icon={faUsers} />} title={"Gestion"} location={"member"} />
          <SideMenuComponent active={false} icon={<FontAwesomeIcon icon={faRightFromBracket} />} title={"Déconnexion"} location={"sign-out"} />
        </SideMenusComponent>

      </div>
    </div>
  )
}