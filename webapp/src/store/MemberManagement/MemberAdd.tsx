// DataContext.jsx
import React, {createContext, useEffect, useState} from 'react';
import {Gender} from "relatives-tree/lib/types";

const MemberAddDataContext = createContext<any>({});

export const MemberAddDataProvider: React.FC<{children:any}> = ({children}) => {

  type UserInformation = {
    firstName: string,
    lastName: string,
    gender: Gender | string,
    picture?: File | null
  }

  const [formData, setFormData] = useState<UserInformation>({gender:"", lastName: "", firstName: "", picture: null});



  const handleFormChange = (form:UserInformation) => {
    setFormData(prevState => form);
  };

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <MemberAddDataContext.Provider value={{formData, handleFormChange }}>
      {children}
    </MemberAddDataContext.Provider>
  )
}

export default MemberAddDataContext;
