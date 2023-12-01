import type { CSSProperties } from 'react';
import type { ExtNode } from 'relatives-tree/lib/types';
import { NODE_HEIGHT, NODE_WIDTH } from '../../_helpers/const';
import {useEffect, useState} from "react";

export function GetNodeStyle( { left, top }: {left: number, top: number}  ): { style:CSSProperties, heighter:number } {

  const [heighter, setHeighter] = useState<number>(0)

  useEffect(() => {
    if (top>heighter)
      setHeighter(top);
  }, [top]);



  return {
    style: {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      transform: `translate(${(left * (NODE_WIDTH / 2))}px, ${(top * (NODE_HEIGHT / 2))}px)`,
    },
    heighter: heighter
  };
}
