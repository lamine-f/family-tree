import React, {useEffect, useMemo, useState} from "react";
import css from "./sidemenu.module.css"
import {useLocation, useNavigate, useNavigation} from "react-router-dom";



type SideMenuComponentProps = {
  active?: boolean,
  icon:any,
  title: String,
  location: string,
  root: string
}
export const SideMenuComponent: React.FC<SideMenuComponentProps> = ({active, title, icon, location, root}) => {

  const [isActive, setIsActive] = useState(active);
  useEffect(()=> {
    setIsActive(active)
  }, [active])

  const navigate = useNavigate()
  function handleClick() {
    navigate(location)
  }

  return (
    <div className={css.wrapper} onClick={handleClick} >
      <div className={active? css.active : css.container} >
        <div className={css.iconContainer} > {icon}  </div>
        <div className={css.title} >  {title} </div>
      </div>
    </div>
  )
}

type SideMenusComponentProps = {
  children:  JSX.Element[]
}
export const SideMenusComponent: React.FC<SideMenusComponentProps> = ({children}) => {

  const [isActive, setIsActive] = useState<boolean[]>([]);
  const navigate = useLocation();
  const pathname = useMemo(()=>navigate.pathname, [navigate.pathname])

  useEffect(()=> {
    setIsActive( (): boolean[] => children.map( (child, id) => {
        const props: SideMenuComponentProps = child.props
        return pathname === ("/"+props.root+"/"+props.location)
      } )
    )
  }, [children, pathname])


  return (
    <div className={css.content} >
      {children.map( (child, id) => {
        const props: SideMenuComponentProps = child.props
        return React.cloneElement(child, {key:id, ...props, active: isActive[id]})
      } )}
    </div>
  )
}

