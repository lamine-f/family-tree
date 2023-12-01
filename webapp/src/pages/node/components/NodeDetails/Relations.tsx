import React, {memo, useCallback, useEffect, useState} from 'react';
import { Relation } from 'relatives-tree/lib/types';
import css from './Relations.module.css';
import {RelType} from "relatives-tree/src/types";
import {User} from "../../../../_helpers/const";

interface RelationsProps {
  title: string;
  items: readonly Relation[];
  onSelect: (nodeId: string) => void;
  onHover: (nodeId: string) => void;
  onClear: () => void;
  users:User[];
}

const toFrench = (rel:Relation):string => {
  if ( rel.type == "blood" )
    return "Sang"

  if ( rel.type == "married" )
    return "Marié(e)"
  return rel.type
}

export const Relations = memo(
  function Relations({ title, items, users , onSelect, onHover, onClear }: RelationsProps) {
    const selectHandler = useCallback((id: string) => () => onSelect(id), [onSelect]);
    const hoverHandler = useCallback((id: string) => () => onHover(id), [onHover]);
    const clearHandler = useCallback(() => onClear(), [onClear]);
    const [usersData, setUsersData ] = useState(users);

    useEffect( () => {
      setUsersData(u => users)
    } , [users])

    if (!items.length) return null;

    return (
      <div>
        <h4 className={css.title} >{title}</h4>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={css.item}
            onClick={selectHandler(item.id)}
            onMouseEnter={hoverHandler(item.id)}
            onMouseLeave={clearHandler}
          >
            <div className={css.name} >{usersData.filter(user => user.id === item.id)[0].firstName} {usersData.filter(user => user.id === item.id)[0].lastName}</div>
            ({toFrench(item) })
          </div>
        ))}
      </div>
    );
  },
);
