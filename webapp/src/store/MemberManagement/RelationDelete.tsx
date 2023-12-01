// DataContext.jsx
import React, {createContext, useEffect, useState} from 'react';
import {Gender, RelType} from "relatives-tree/lib/types";
import {User} from "../../_helpers/const";

const RelationDataContext = createContext<any>({});

export const RelationDeleteDataProvider: React.FC<{children:any}> = ({children}) => {

  enum FamilyType {
    root, child, parent, spouse
  }

  type Dto = {
    userId: string,
    relation: {id:string, type: RelType | string} | null,
    familyType: FamilyType | string
  }

  const [data, setData] = useState<Dto>({userId:"", relation:null, familyType: ""});

  const [users, setUsers] = useState<{leftUser:User | null, rightUser:User|null}>({leftUser:null, rightUser:null});

  const handleUsers = (form:{leftUser:User | null, rightUser:User|null}) => {
    setUsers(prevState => form);
  };

  const handleData = (form:Dto) => {
    setData(prevState => form);
  };

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  return (
    <RelationDataContext.Provider value={{data, handleData, users, handleUsers }}>
      {children}
    </RelationDataContext.Provider>
  )
}

export default RelationDataContext;
