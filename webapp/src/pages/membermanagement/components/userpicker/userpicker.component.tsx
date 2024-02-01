import React, {useContext, useEffect, useState} from "react";
import css from "./userpicker.module.css";
import {User} from "../../../../_helpers/const";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import MemberAddDataContext from "../../../../store/MemberManagement/MemberAdd";
import RelationDataContext from "../../../../store/MemberManagement/RelationAdd";
import useAxios from "../../../../hooks/useAxios";
import {backend} from "../../../../api/instances";
import {Loading} from "../../../../components/Loading/Loading";

export const UserPickerComponent: React.FC<{children?: string, reset:boolean, getUser(user: User, id:string):void, id:string, user:User | null }> = ({children, reset, getUser, id, user}) => {

  const Context = useContext(RelationDataContext);
  const handleUsers = Context.handleUsers
  const users = Context.users

  const [selected, setSelected] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User|null>(user);

  useEffect(() => {
    setUserSelected(null)
  }, [reset])


  useEffect(() => {
    setUserSelected(user)
  }, [user])
  const getStyle = () => {
    return userSelected? "#cefbce":"#ffc1c1";
  }

  function handleAddUser(user: User) {
    setSelected(v=>!v);
    setUserSelected(user)
    getUser(user, id);
  }

  function handleSearchUser() {
    setSelected(v=>!v);
  }

  function handleDeleteUser() {
    setUserSelected(null)
    if ( id === "left" )
      handleUsers( {...users, leftUser: null })
    else if ( id === "right" )
      handleUsers( {...users, rightUser: null })
  }

  return (
    <div className={css.wrapper}  style={{background: getStyle()}}>
      <div className={css.container}  >

        {selected && <SearchUserMenu handleAddUser={handleAddUser} cancel={handleSearchUser} />}
        {
          userSelected ? (
            <div className={css.userSelectedContainer}>

              <div className={css.deleteUser} onClick={handleDeleteUser} ><FontAwesomeIcon style={{color: "red", fontSize: "20px" }} icon={faTrash} /></div>

              <div className={css.avatarContainer} >
                <img className={css.avatar} src={userSelected.picture} />
              </div>

              <div className={css.name}>
                {userSelected.firstName} {userSelected.lastName}
              </div>

            </div>
          ): (
            <div onClick={event => handleSearchUser()} style={{cursor: "pointer"}} >{children}</div>
          )
        }
      </div>
    </div>
  )
}


const SearchUserMenu: React.FC<{handleAddUser(user: User):any, cancel():void}> = ({handleAddUser, cancel}) => {

  const [searchValue, setSearchValue] = useState<string>("")
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User>();
  const [response, error, loading, fetch] = useAxios();


  useEffect(() => {
    fetch({axiosInstance: backend, url: "users", method: "GET", requestConfig: []})
  }, [])

  useEffect(() => {
    if (response)
      setUsers(prevState => [...response.dataResponse])
  }, [response]);


  function handleSearch(event:any) {
    const value = event.target.value
    setSearchValue(prevState => value )
  }

  function handleUserPick(user: User) {
    setSelected(prevState => user);
    handleAddUser(user);
    return user;
  }

  function handleCancel() {
    cancel()
  }

  return (
    <div className={css.SearchUserMenuWrapper}>

      <div className={css.SearchUserMenuContainer}>
        <div className={css.SearchUserMenuSearchBarContainer}>
          <input className={css.input} placeholder={"Mar Faye"} value={searchValue}
                 onChange={event => handleSearch(event)}/>
          <div><FontAwesomeIcon icon={faSearch} /></div>

        </div>


        <div className={css.SearchUserMenuResultsContainer}>
          {
            loading? (<Loading cancel={ () => {} }/>)
              : (users.filter( (user, id) => (user.firstName+" "+user.lastName).toLowerCase().includes(searchValue.toLowerCase()) && (user.firstName+" "+user.lastName) != " " ).map((user, id) => {
                  return <div className={css.SearchUserMenuElement} key={id} onClick={() => handleUserPick(user)} >
                    <div className={css.SearchUserMenuAvatarContainer} > <img className={css.SearchUserMenuAvatar} src={user.picture} /> </div>
                    <div className={css.SearchUserMenuName} >{user.firstName} {user.lastName}</div>
                  </div>
                }))
          }
        </div>
          <div className={"primaryButton"} style={{position: "absolute", bottom: "1em"}} onClick={handleCancel} > Annuler </div>
      </div>

    </div>
  )
}