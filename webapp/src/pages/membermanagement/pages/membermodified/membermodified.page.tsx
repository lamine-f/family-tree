import React, {useContext, useEffect, useState} from "react";
import css from "./membermodified.module.css"
import {Gender, RelType} from "relatives-tree/lib/types";
import {User} from "../../../../_helpers/const";
import toast from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {TopbarComponent} from "../../components/topbar/topbar.component";
import useAxios from "../../../../hooks/useAxios";
import {backend} from "../../../../api/instances";
import {Loading} from "../../../../components/Loading/Loading";
import MemberModifiedDataContext from "../../../../store/MemberManagement/MemberModified";
import {UserPickerComponent} from "../../components/userpicker/userpicker.component";
import {ImagePickerComponent} from "../../components/imagepicker/imagepicker.component";

type MemberModifiedPageProps = {
}
type UserInformation = {
  id: string
  firstName: string,
  lastName: string,
  gender?: Gender | string,
  picture?: File | null
}
export const MemberModifiedPage: React.FC<MemberModifiedPageProps> = () => {

  const Context = useContext(MemberModifiedDataContext);
  const contextNewUser: UserInformation = Context.newUser;
  const contextUser: User | null = Context.user;

  const handleNewUser = Context.handleNewUser;
  const handleUser = Context.handleUser;

  const setDataUser = (data : User | null ) => {
    setUser(prevState => data);
    handleUser(data)
  }

  const setDataNewUser = (data : UserInformation ) => {
    setNewUser(prevState => data);
    handleNewUser(data)
  }


  const [user, setUser] = useState<User | null>(contextUser);
  const [newUser, setNewUser] = useState<UserInformation>(contextNewUser);
  const [reset, setReset] = useState<boolean>(true)
  const [response, error, loading, fetch] = useAxios();


  useEffect( () => {
    setUser(prevState => contextUser)
  } , [contextUser])

  useEffect( () => {
    setNewUser(prevState => (contextNewUser))
  } , [contextNewUser])

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
    if ( newUser.gender == "" || newUser.lastName == "" || newUser.lastName == ""  ) {
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
    }else {
      const formData  = new FormData();
      formData.append( "id", newUser.id );
      formData.append( "firstName", newUser.firstName );
      formData.append( "lastName", newUser.lastName );
      formData.append( "gender", newUser?.gender as string );
      formData.append("picture", newUser?.picture as Blob);
      fetch({url: "users", method: "PATCH", axiosInstance:backend, requestConfig:[formData]})
    }
  }

  const getUser = (user: User, id:string) => {
      setDataUser(user)
      setDataNewUser({firstName: user.firstName, lastName: user.lastName, gender: user.gender , picture: null, id: user.id})
  }
  const setDataReset = () => {
    setReset(v => !v)
    setResetImage(v => true)
    setDataUser(null)
    setDataNewUser({gender: "", lastName: "", firstName: "", picture: null, id:""})
  }

  const [resetImage, setResetImage] = useState<boolean>(false);
  const getPicture = ({pictureUrl, pictureFile}:{pictureUrl:string, pictureFile: File | null}) => {
    //get picture
    setDataNewUser({...newUser, picture: pictureFile})
  }

  return (
    <div className={css.wrapper} >
      {loading && <Loading/>}

      <TopbarComponent title={"Modifier un membre"}/>
      <div className={css.container} >

        <section className={css.content}>
          <UserPickerComponent getUser={getUser} reset={reset} id={"left"} user={user}>Choisir le membre</UserPickerComponent>
        </section>

        <hr style={{width: "90%"}}/>

        <section className={css.pictureSection}>
          <div className={css.labelContainer}>
            <div className={css.label} > Photo </div>
          </div>

          <ImagePickerComponent picture={user?.picture} change={resetImage} setPicture={getPicture} />
        </section>

        <hr style={{width: "90%"}}/>

        <section className={css.informationsSection}>
          <div className={css.labelContainer}>
            <div className={css.label} > Informations générales </div>
          </div>
          <div className={css.inputsContainer} >
            <div className={css.inputContainer}>
              <div className={css.labelForInput}> Prénom(s) </div>
              <input className={css.input} placeholder={"Mouhamed Lamine"} value={newUser.firstName} onChange={event => {
                setDataNewUser({...newUser, firstName: event.target.value})
              }} />
            </div>

            <div className={css.inputContainer}>
              <div className={css.labelForInput}> Nom </div>
              <input className={css.input} placeholder={"Faye"} value={newUser.lastName} onChange={event => {
                setDataNewUser( {...newUser, lastName: event.target.value} )
              }}/>
            </div>

            <select className={css.inputContainer} value={newUser.gender} onChange={event => {
              setDataNewUser({...newUser, gender: event.target.value} )
            }} >
              <option value={""}>Genre</option>
              <option value={"male"}>Masculin</option>
              <option value={"female"}>Féminin</option>
            </select>

          </div>
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