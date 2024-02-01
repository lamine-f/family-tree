import React, {useContext, useEffect, useState} from "react";
import css from "./relationadd.module.css"
import {RelType} from "relatives-tree/lib/types";
import {UserPickerComponent} from "../../components/userpicker/userpicker.component";
import {User} from "../../../../_helpers/const";
import RelationDataContext from "../../../../store/MemberManagement/RelationAdd";
import toast from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {TopbarComponent} from "../../components/topbar/topbar.component";
import useAxios from "../../../../hooks/useAxios";
import {backend} from "../../../../api/instances";
import {Loading} from "../../../../components/Loading/Loading";

type RelationAddPageProps = {
}
export const RelationAddPage: React.FC<RelationAddPageProps> = () => {

  const Context = useContext(RelationDataContext);
  const contextData: Dto = Context.data;
  const contextUsers: {leftUser:User | null, rightUser:User|null} = Context.users;

  const handleData = Context.handleData;
  const handleUsers = Context.handleUsers;

  const setFormData = (data : Dto ) => {
    setData(prevState => data);
    handleData(data)
  }

  const setUserData = (data : {leftUser:User | null, rightUser:User|null} ) => {
    setUsers(prevState => data);
    handleUsers(data)
  }
  enum FamilyType {
    root, child, parent, spouse
  }

  type Dto = {
    userId: string,
    relation: {id:string, type: RelType | ""} | null,
    familyType: FamilyType | string
  }


  const [users, setUsers] = useState<{leftUser:User | null, rightUser:User|null}>(contextUsers);
  const [data, setData] = useState<Dto>(contextData);
  const [reset, setReset] = useState<boolean>(true)
  let [response, error, loading, fetch] = useAxios();


  useEffect( () => {
    setUsers(prevState => ({...prevState, ...contextUsers}))
  } , [contextUsers])

  useEffect( () => {
    setData(prevState => ({...prevState, ...contextData}))
  } , [contextData])


  useEffect(() => {
    if (response) {
      toast('Success', {
        duration: 4000,
        position: 'bottom-left',

        // Styling
        style: {},
        className: '',

        // Custom Icon
        icon: <FontAwesomeIcon style={{color: "green"}} icon={faCheck} />,

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },

        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      setDataReset()
    }
  }, [response]);

  useEffect(() => {
    if (error)
      toast(error.message, {
        duration: 4000,
        position: 'bottom-left',

        // Styling
        style: {},
        className: '',

        // Custom Icon
        icon: <FontAwesomeIcon style={{color: "red"}} icon={faExclamationTriangle} />,

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },

        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
  }, [error]);

  const putData = () => {
    if ( !(data.userId != "" && data.relation?.type != "" && data.relation?.id != "") ) {
      toast('Veuillez renseigner tous les champs', {
        duration: 4000,
        position: 'bottom-left',

        // Styling
        style: {},
        className: '',

        // Custom Icon
        icon: <FontAwesomeIcon style={{color: "red"}} icon={faExclamationTriangle} />,

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },

        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } else {
      fetch({url: "nodes/relation", method: "PUT", axiosInstance:backend, requestConfig:[data, { header: {"Content-Type": "application/json"}}]})
    }
  }
  const getUser = (user: User, id:string) => {
    if (id === "left") {
      setFormData( {...data, userId: user.id})
      setUserData({...users, leftUser:user})
    }
    if (id === "right") {
      setFormData( {...data, relation: {id: user.id, type: ""}})
      setUserData({...users, rightUser:user})
    }
  }
  const setDataReset = () => {
    setReset(v => !v)
    setFormData({relation:{id: "", type: ""},  familyType: "", userId: ""})
    setUserData({leftUser: null, rightUser: null})
  }

  return (
    <div className={css.wrapper} >
      {loading && <Loading cancel={() => { alert("cc") }}  />}

      <div className={css.container} >

        <TopbarComponent title={"Ajouter une relation"}/>


        <section className={css.content}>
          <div>*Parent</div>
          <UserPickerComponent getUser={getUser} reset={reset} id={"left"} user={users.leftUser}>Choisir un membre</UserPickerComponent>
            <select className={css.relationSelector} value={data.familyType} onChange={event => setFormData( {...data, familyType: event.target.value})} >
              <option value={""}>Relation</option>
              <option value={"spouse"}>Epoux(se)</option>
              <option value={"child"}>Enfant</option>
            </select>
          <select className={css.relationSelector} value={data.relation?.type} onChange={event => setFormData( {...data, relation: {id: data.relation!.id, type:event.target.value as RelType }})} >
            <option value={""}>Lien</option>
            { data.familyType == "child" && <option value={"blood"}>Sang</option>}
            { data.familyType == "child" && <option value={"half"}>A moitié</option>}
            {/*<option value={"adopted"}>Adoption</option>*/}
            {/*<option value={"divorced"}>Divorce</option>*/}
            { data.familyType == "spouse" && <option value={"married"}>Mariage</option>}
          </select>
          <div>*Enfant</div>
          <UserPickerComponent getUser={getUser} reset={reset} id={"right"} user={users.rightUser}>Choisir un membre</UserPickerComponent>
        </section>

        <section className={css.submitButtonsSection}>
          <div className={css.submitButtonsContainer} >
            <div  className={"secondaryButton"} onClick={event => setDataReset()} >Reset</div>
            <div className={"primaryButton"} onClick={putData} >Enregistrer</div>
          </div>
        </section>

      </div>
    </div>
  )
}