// DataContext.jsx
import React, {createContext, useEffect, useState} from 'react';
import {Gender, RelType} from "relatives-tree/lib/types";
import {User} from "../../_helpers/const";

const MemberModifiedDataContext = createContext<any>({});

export const MemberModifiedDataProvider: React.FC<{children:any}> = ({children}) => {

  type UserInformation = {
    id: string
    firstName: string,
    lastName: string,
    gender?: Gender | string,
    picture?: File | null
  }

  const [newUser, setNewUser] = useState<UserInformation>({gender:"", lastName: "", firstName: "", picture: null, id: ""});
  const [user, setUser] = useState<User | null>(null);

  const handleUser = (newUser:User | null) => {
    setUser(prevState => newUser);
  };

  const handleNewUser = (form:UserInformation) => {
    setNewUser(prevState => form);
  };



  return (
    <MemberModifiedDataContext.Provider value={{newUser, handleNewUser, user, handleUser }}>
      {children}
    </MemberModifiedDataContext.Provider>
  )
}

export default MemberModifiedDataContext;
