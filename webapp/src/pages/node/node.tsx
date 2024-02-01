import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ExtNode, Node} from "relatives-tree/lib/types";
import {NODE_HEIGHT, NODE_WIDTH, User} from "../../_helpers/const";
import ReactFamilyTree from "react-family-tree";
import {FamilyNode} from "./components/FamilyNode/FamilyNode";
import {GetNodeStyle} from "./utils";
import {NodeDetails} from "./components/NodeDetails/NodeDetails";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import css from "./node.module.css";

import {Layout} from "../layout";
import useAxios from "../../hooks/useAxios";
import {backend} from "../../api/instances";
import {Loading} from "../../components/Loading/Loading";

export default
React.memo(
  function NodePage() {

    const [nodes, setNodes] = useState<Node[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    // const firstNodeId = useMemo(() => nodes[0].id, [nodes]);
    const firstNodeId = useMemo(() => "1", [nodes]);
    const [rootId, setRootId] = useState(firstNodeId);

    const [selectId, setSelectId] = useState<string>();
    const [hoverId, setHoverId] = useState<string>();

    const resetRootHandler = useCallback(() => setRootId(firstNodeId), [firstNodeId]);

    const [node, nodeError, nodeLoading, nodeFetch] = useAxios();
    const [user, userError, userLoading, userFetch] = useAxios();

    const selected = useMemo(() => (
      nodes.find(item => item.id === selectId)
    ), [users, nodes, selectId]);

    useEffect(() => {
      nodeFetch({url: "nodes", method: "GET", axiosInstance:backend})
      userFetch({url: "users", method: "GET", axiosInstance:backend})
    }, [])

    useEffect(() => {
      if (node)
        setNodes(prevState => node.dataResponse)
    }, [node]);

    useEffect(() => {
      if (user)
        setUsers(prevState => user.dataResponse)
    }, [user]);


    return (
      <Layout pageName={"Arbre généalogique"}>
        <div className={css.root}>
          {nodes.length == 0 ? (<Loading/>) :(
              <TransformWrapper  >
                <TransformComponent wrapperClass={css.TransformWrapper} wrapperStyle={{minHeight: NODE_HEIGHT+"px", background: "white", borderRadius: "20px", width: "100%", height: "100%", display: "flow"}} contentClass={css.TransformContent} >
                  <ReactFamilyTree
                    nodes={nodes}
                    rootId={rootId}
                    width={NODE_WIDTH}
                    height={NODE_HEIGHT}
                    className={css.tree}
                    renderNode={(node: Readonly<ExtNode>) => {
                      return (<FamilyNode
                        key={node.id}
                        node={node}
                        isRoot={node.id === rootId}
                        isHover={node.id === hoverId}
                        onClick={setSelectId}
                        onSubClick={setRootId}
                        style={GetNodeStyle(node).style}
                        user={users.filter( (user, id) => user.id === node.id )[0]}
                      />)
                    }}
                  />
                </TransformComponent>
              </TransformWrapper>
          )}
          {rootId !== firstNodeId && (
            <button className={css.reset} onClick={resetRootHandler}>
              Reset
            </button>
          )}
          {selected && (
            <NodeDetails
              node={selected}
              users={users}
              className={css.details}
              onSelect={setSelectId}
              onHover={setHoverId}
              onClear={() => setHoverId(undefined)}
            />
          )}
        </div>
      </Layout>
    );
  }
);
