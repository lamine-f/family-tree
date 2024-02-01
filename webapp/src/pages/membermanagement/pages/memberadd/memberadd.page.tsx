import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import css from "./memberadd.module.css"
import {Gender} from "relatives-tree/lib/types";
import MemberAddDataContext from "../../../../store/MemberManagement/MemberAdd";
import toast from "react-hot-toast";
import {faCheck, faExclamationTriangle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TopbarComponent} from "../../components/topbar/topbar.component";
import useAxios from "../../../../hooks/useAxios";
import {backend} from "../../../../api/instances";
import {ImagePickerComponent} from "../../components/imagepicker/imagepicker.component";
import {Loading} from "../../../../components/Loading/Loading";

type MemberaddPageProps = {
}

type UserInformation = {
  firstName: string,
  lastName: string,
  gender: Gender | string,
  picture?: File | null
}


export const MemberaddPage: React.FC<MemberaddPageProps> = () => {

  const Context = useContext(MemberAddDataContext);
  const formData: UserInformation = Context.formData;
  const handleFormChange = Context.handleFormChange;

  const setFormData = (data : UserInformation) => {
    setData(prevState => data)
    handleFormChange(data)
  }

  const [data, setData] = useState<UserInformation>(formData);
  const [resetImage, setResetImage] = useState<boolean>(true);
  const [response, error, loading, fetch] = useAxios();


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
        reset()
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


  const getPicture = ({pictureUrl, pictureFile}:{pictureUrl:string, pictureFile: File | null}) => {
    setFormData({...data, picture: pictureFile })
  }

  const reset = () => {
    setResetImage(prevState => !prevState);
    setFormData({gender: "", lastName: "", firstName: "", picture: null});
  }

  const putData = () => {
    if ( data.gender == "" || data.firstName == "" || data.lastName == ""  ) {
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
      formData.append( "firstName", data.firstName );
      formData.append( "lastName", data.lastName );
      formData.append( "gender", data.gender );
      // @ts-ignore
      formData.append("picture", data.picture)
      fetch({url: "users", method: "PUT", axiosInstance:backend, requestConfig:[formData]})
    }
  }

  return (

    <div className={css.wrapper} >
      {loading && <Loading cancel={() => {}}/>}

      <div className={css.container} >

        <TopbarComponent title={"Ajouter un membre"}/>

        <section className={css.pictureSection}>
          <div className={css.labelContainer}>
            <div className={css.label} > Photo </div>
          </div>

          <ImagePickerComponent change={resetImage} setPicture={getPicture} />
        </section>

        <hr style={{width: "90%"}}/>

        <section className={css.informationsSection}>

          <div className={css.labelContainer}>
            <div className={css.label} > Informations générales </div>
          </div>
          <div className={css.inputsContainer} >
            <div className={css.inputContainer}>
              <div className={css.labelForInput}> Prénom(s) </div>
              <input className={css.input} placeholder={"Mouhamed Lamine"} value={data.firstName} onChange={event => {
                setFormData({...data, firstName: event.target.value})
              }} />
            </div>

            <div className={css.inputContainer}>
              <div className={css.labelForInput}> Nom </div>
              <input className={css.input} placeholder={"Faye"} value={data.lastName} onChange={event => {
                setFormData( {...data, lastName: event.target.value} )
              }}/>
            </div>

            <select className={css.inputContainer} value={data.gender} onChange={event => {
              setFormData({...data, gender: event.target.value} )
            }} >
              <option value={""}>Genre</option>
              <option value={"male"}>Masculin</option>
              <option value={"female"}>Féminin</option>
            </select>

          </div>
        </section>

        <section className={css.submitButtonsSection}>
          <div className={css.submitButtonsContainer} >
            <div  className={"secondaryButton"} onClick={event => {
              reset()
            }} >Reset</div>
            <div className={"primaryButton"} onClick={putData} >Enregistrer</div>
          </div>
        </section>

      </div>
    </div>
  )
}