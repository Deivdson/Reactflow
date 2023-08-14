import { useState } from "react";
import { Handle } from "react-flow-renderer";
import { getNode } from "@/core/repos/Components";

import AbstractComponent from "../components/AbstractComponent";

import { InputGroup } from "@blueprintjs/core";

export default function InputComponent(props: any) {
  const [componentValue, setComponentValue] = useState(props.data.value);
  const [isConnteted, setIsConnected] = useState(false);

  const updateTarget = (value: string) => {
    let targetId = props.id + 1;
    let target = getNode(targetId);
    target.data.execute(target, value);
  };

  const changeValue = (e: any) => {
    setComponentValue(e.target.value);
    if (isConnteted) {
      updateTarget(e.target.value);
    } else {
      return;
    }
  };

  const transmit = (params: any) => {
    setIsConnected(true);
    let target = getNode(params.target);
    target.data.execute(target, componentValue);
  };

  return (
    <>
      <AbstractComponent title={"Input"}>
        <InputGroup onChange={changeValue} />
        <Handle
          type="source"
          position="right"
          style={{ background: "#555", width: "10px", height: "10px" }}
          onConnect={(params) => transmit(params)}
        />
      </AbstractComponent>
    </>
  );
}
