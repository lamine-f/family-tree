import css from "../../pages/memberadd/memberadd.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useRef, useState} from "react";

type ImagepickerComponentProps = {
  setPicture({pictureUrl, pictureFile}:{pictureUrl:string, pictureFile: File | null}):void,
  change: boolean,
  picture?:string,
}

export const ImagePickerComponent : React.FC<ImagepickerComponentProps> = ({setPicture, change, picture}) => {

  const [files, setFiles] = useState<FileList | null>();

  const [pictureUrl, setPictureUrl] = useState<string|undefined>(picture);
  const filePicker = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ( picture ) {
      setPictureUrl(picture)
    }else {
      setPictureUrl("/pictures/img.png")
    }
  }, []);



  useEffect( () => {
    if ( files?.length === 1 ) {
      const file = files?.item(0);
      if (file !== null) {
        setPicture({pictureFile: file, pictureUrl: URL.createObjectURL(file)})
        setPictureUrl(URL.createObjectURL(file))
      }
    }
  } , [files] )

  // useEffect(() => {
  //     handleDeletePicture()
  // }, [change]);

  function handlePickImage() {
    filePicker.current?.click()
  }

  function handleDeletePicture() {
    // @ts-ignore
    const file: File | null = files?.item(0);
    // if (files !== null) {
      setPicture({pictureFile: null, pictureUrl: "/pictures/img.png"})
      setPictureUrl("/pictures/img.png")
      setFiles(null)
    console.log("delet")
    // }
    // setPictureUrl("/pictures/img.png")
  }


  return (
    <div className={css.inputsContainer} >
      <div className={css.choosePictureContainer}>

        <div className={css.avatarContainer}>
          <img className={css.avatar} src={pictureUrl} />
        </div>

        <div className={css.buttonsContainer} >
          <input ref={filePicker} type={"file"} accept={"image/png image/jpg image/jpeg"} hidden={true} onChange={event => {setFiles(event.target.files)}} />
          <div className={"primaryButton"} onClick={handlePickImage} > UPLOAD </div>
          <div> <FontAwesomeIcon style={{color: "red", fontSize: "20px" }} icon={faTrash} onClick={() => handleDeletePicture()} /> </div>
        </div>

      </div>
    </div>
  )
}