import { useEffect, useState } from "react";
import { Handle } from "react-flow-renderer";
import { Components, getNode } from "@/core/repos/Components";

import AbstractComponent from "../components/AbstractComponent";

import { subscribe } from "valtio";

export default function TransformComponent(props) {
  const transformValue = (value: string) => {
    return value.toUpperCase();
  };

  const [componentValue, setComponentValue] = useState(props.data.value);
  const [isConnteted, setIsConnected] = useState(false);

  const unsubscribe = subscribe(Components, () => {
    const self = getNode(props.id);
    setComponentValue(transformValue(Components[self.id].data.value));
  });

  useEffect(() => {
    const updateTarget = (value: string) => {
      let targetId = parseInt(props.id) + 1;
      let target = getNode(`${targetId}`);
      target.data.execute(target, value);
    };

    if (isConnteted) {
      console.log("Updating My Target");
      updateTarget(componentValue);
    } else {
      return;
    }
  }, [componentValue, setComponentValue, props.id, isConnteted]);

  const connect = (params: any) => {
    console.log("Transform Connected");
    setIsConnected(true);
  };

  const transmit = (params: any) => {
    connect(params);
    let target = getNode(params.target);
    target.data.execute(target, componentValue);
  };

  return (
    <AbstractComponent title={"To Uppercase"}>
      {`${transformValue(componentValue)}`}
      <Handle
        type="target"
        position="left"
        style={{ background: "#555", width: "10px", height: "10px" }}
        onConnect={(params) => connect(params)}
      />
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", width: "10px", height: "10px" }}
        onConnect={(params) => transmit(params)}
      />
    </AbstractComponent>
  );
}
