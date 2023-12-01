import React, {memo, useCallback, useState} from 'react';
import classNames from 'classnames';
import type { Node } from 'relatives-tree/lib/types';
import { Relations } from './Relations';
import css from './NodeDetails.module.css';
import {User} from "../../../../_helpers/const";

interface NodeDetailsProps {
  node: Readonly<Node>;
  className?: string;
  users: User[];
  onSelect: (nodeId: string | undefined) => void;
  onHover: (nodeId: string) => void;
  onClear: () => void;

}

export const NodeDetails = memo(
  function NodeDetails({ node, users, className, ...props }: NodeDetailsProps) {
    const closeHandler = useCallback(() => props.onSelect(undefined), [props]);
    const [user, setUser ] = useState<User>(users.filter( (u, id) => u.id === node.id )[0]);

    return (
      <section className={classNames(css.root, className)}>


          <div className={css.pictureContainer} >
            <img className={css.picture} src={users.filter( (u, id) => u.id === node.id )[0].picture}/>
          </div>

        <div className={css.informations}>

            <div className={css.nameContainer}>
            <h3 className={css.title}>{users.filter( (u, id) => u.id === node.id )[0].firstName} {users.filter( (u, id) => u.id === node.id )[0].lastName}</h3>
          </div>

          <div className={css.relationsContainer} >
            <Relations users={users} {...props} title="parents" items={node.parents} />
            <Relations users={users} {...props} title="enfants" items={node.children} />
            <Relations users={users} {...props} title="frères & soeurs" items={node.siblings} />
            <Relations users={users} {...props} title="épouses" items={node.spouses} />
          </div>

        </div>


        <div className={classNames("primaryButton", css.cancelButton)} onClick={closeHandler}>Fermer</div>

      </section>


    );
  },
);
