import React from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout/Layout";
import {MemberManagement} from "./pages/membermanagement/membermanagement.page";
import {MemberaddPage} from "./pages/membermanagement/pages/memberadd/memberadd.page";
import {RelationAddPage} from "./pages/membermanagement/pages/relationadd/relationadd.page";
import NodePage from './pages/node/node'
import GlobalDataContext, {GlobalDataProvider} from "./store/GloalStore/GlobalStore";
import {MemberAddDataProvider} from "./store/MemberManagement/MemberAdd";
import {RelationDataProvider} from "./store/MemberManagement/RelationAdd";
import MemberModified, {MemberModifiedDataProvider} from "./store/MemberManagement/MemberModified";
import {MemberModifiedPage} from "./pages/membermanagement/pages/membermodified/membermodified.page";
import {Loading} from "./components/Loading/Loading";
import {RelationDeletePage} from "./pages/membermanagement/pages/relationdelete/relationdelete.page";
import {RelationDeleteDataProvider} from "./store/MemberManagement/RelationDelete";

export default React.memo(
  function App() {
    return (
      <BrowserRouter>
        < GlobalDataProvider >
                <Routes>
                  <Route path={""} element={  <Layout/> } >
                    <Route path={"sign-out"} element={<>Déconnexion</>} />

                    <Route path={"node"} element={<NodePage/>} />
                    <Route path={"member"} element={<MemberManagement/>} >
                      <Route path={"add"} element={<MemberaddPage/>} />
                      <Route path={"modify"} element={<MemberModifiedPage/>} />
                      <Route path={"delete"} element={<>Rien à voir ici</>} />
                      <Route path={"add-relation"} element={<RelationAddPage/>} />
                      <Route path={"delete-relation"} element={<RelationDeletePage/>} />
                    </Route>
                  </Route>
                </Routes>
        </GlobalDataProvider>
      </BrowserRouter>
    )
  },
);
