import React from "react";
import css from "./userprofil.module.css"
import {User} from "../../../../_helpers/const";

type UserProfilComponentProps = {
  user: User
}
export const UserProfilComponent: React.FC<UserProfilComponentProps> = ({user}) => {
  return (
        <div className={css.wrapper} >
          <div className={css.avatarContainer}>
            <img className={css.avatar}  src={user.picture} />
          </div>
          <div className={css.userName}>
            {user.firstName} {user.lastName}
          </div>
        </div>
  )
}