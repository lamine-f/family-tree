import React, {useContext, useEffect, useState} from "react";
import css from "./otheruserpicker.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import RelationDataContext from "../../../../../../store/MemberManagement/RelationDelete";
import {User} from "../../../../../../_helpers/const";
import useAxios from "../../../../../../hooks/useAxios";
import {backend} from "../../../../../../api/instances";
import {Loading} from "../../../../../../components/Loading/Loading";
import {Relation, RelType} from "relatives-tree/lib/types";
import {FamilyType} from "../../../../../../store/GloalStore/types";

export const OtherUserPickerComponent: React.FC<{children?: string, reset:boolean, getUserWithRel(user: User, familyType: FamilyType, relType: RelType , id:string):void, id:string, user:User | null, leftUser: User | null }> = ({children, reset, getUserWithRel, id, user, leftUser}) => {

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

  function handleAddUser(user: User, familyType: FamilyType, relType: RelType) {
    setSelected(v=>!v);
    setUserSelected(user)
    getUserWithRel(user, familyType, relType, id);
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

        {selected && <SearchUserMenu handleAddUser={handleAddUser} cancel={handleSearchUser} user={leftUser} />}
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


const SearchUserMenu: React.FC<{handleAddUser(user: User, familyType: FamilyType, relType: RelType):any, cancel():void, user: User | null}> = ({handleAddUser, cancel, user}) => {

  const [searchValue, setSearchValue] = useState<string>("")
  const [usersWithRel, setUsersWithRel] = useState<{user: User, relation: Relation, type: FamilyType}[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User>();
  const [response, error, loading, fetch] = useAxios();


  useEffect(() => {
    fetch({axiosInstance: backend, url: "users/relations/"+user?.id, method: "GET", requestConfig: []})
  }, [])

  useEffect(() => {
    if (response){

      let resp: {user: User, relation: Relation, type: FamilyType}[] = response.dataResponse;
      setUsers(prevState => [...resp.map(el => el.user)])
      setUsersWithRel([...resp]);
    }
  }, [response]);


  function handleSearch(event:any) {
    const value = event.target.value
    setSearchValue(prevState => value )
  }

  function handleUserPick(user: User , familyType: FamilyType, relType: RelType) {
    setSelected(prevState => user);
    handleAddUser(user, familyType, relType);
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
            loading? (<Loading/>)
              : (usersWithRel.filter( (el, id) => (el.user.firstName+" "+el.user.lastName).toLowerCase().includes(searchValue.toLowerCase()) && (el.user.firstName+" "+el.user.lastName) != " " ).map((el, id) => {
                return <div className={css.SearchUserMenuElement} key={id} onClick={() => handleUserPick(el.user, el.type, el.relation.type)} >
                  <div className={css.SearchUserMenuAvatarContainer} > <img className={css.SearchUserMenuAvatar} src={el.user.picture} /> </div>
                  <div className={css.SearchUserMenuName} >{el.user.firstName} {el.user.lastName}</div>
                </div>
              }))
          }
        </div>
        <div className={"primaryButton"} style={{position: "absolute", bottom: "1em"}} onClick={handleCancel} > Annuler </div>
      </div>

    </div>
  )
}