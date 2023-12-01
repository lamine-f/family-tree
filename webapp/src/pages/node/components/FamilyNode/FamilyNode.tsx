import React, { useCallback } from 'react';
import classNames from 'classnames';
import css from './FamilyNode.module.css';
import {ExtNode} from "relatives-tree/lib/types";
import {User} from "../../../../_helpers/const";

interface FamilyNodeProps {
  node: ExtNode;
  isRoot: boolean;
  isHover?: boolean;
  onClick: (id: string) => void;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
  user:User;
}

export const FamilyNode = React.memo(
  function FamilyNode({ node, isRoot, isHover, onClick, onSubClick, style, user }: FamilyNodeProps) {
    const clickHandler = useCallback(() => onClick(node.id), [node.id, onClick]);
    const clickSubHandler = useCallback(() => onSubClick(node.id), [node.id, onSubClick]);


    return (
      <div className={css.root} style={style}>
        <div
          className={classNames(
            css.inner,

            isRoot && css.isRoot,
            isHover && css.isHover,
          )}
          onClick={clickHandler}
        >
          <div className={css.content} >
            <div className={classNames(css.pictureContainer, css[node.gender])} >
              <img className={css.picture} src={user?.picture} />
            </div>

            <div className={css.name}>
              {user?.firstName} {user?.lastName}
            </div>
          </div>
        </div>
        {node.hasSubTree && (
          <div
            className={classNames(css.sub, css[node.gender])}
            onClick={clickSubHandler}
          />
        )}
      </div>
    );
  },
);
