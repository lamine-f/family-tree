// DataContext.jsx
import React, { createContext, useState } from 'react';
import {MemberAddDataProvider} from "../MemberManagement/MemberAdd";
import {MemberModifiedDataProvider} from "../MemberManagement/MemberModified";
import {RelationDataProvider} from "../MemberManagement/RelationAdd";
import {RelationDeleteDataProvider} from "../MemberManagement/RelationDelete";

const GlobalDataContext = createContext<any>({});

export const GlobalDataProvider: React.FC<{children:any}> = ({ children }) => {
  const [data, setData] = useState<any>({});

  return (
    <GlobalDataContext.Provider value={{ data, setData }}>
      <MemberAddDataProvider>
      <MemberModifiedDataProvider>

        <RelationDataProvider>
          <RelationDeleteDataProvider>
            {children}
          </RelationDeleteDataProvider>
        </RelationDataProvider>

      </MemberModifiedDataProvider>

      </MemberAddDataProvider>
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataContext;
