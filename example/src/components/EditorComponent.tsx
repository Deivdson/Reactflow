import { useState } from "react";
import { Handle } from "react-flow-renderer";
import { Components, getNode } from "@/core/repos/Components";

import AbstractComponent from "../components/AbstractComponent";
import CodeEditor from "../components/CodeEditor";

import { subscribe } from "valtio";

export default function InputComponent(props: any) {
  const [componentValue, setComponentValue] = useState(props.data.value);

  const unsubscribe = subscribe(Components, () => {
    console.log("SUBSCRIPTION UPDATED ");
    const self = getNode(props.id);

    setComponentValue(Components[self.id].data.value);
  });

  const changeValue = (code: string) => {
    setComponentValue(code);
  };

  const transmit = (params: any) => {
    let target = getNode(params.target);
    target.data.execute(target, componentValue);
  };

  return (
    <AbstractComponent title="Editor">
      <CodeEditor code={componentValue} onChange={changeValue} />
      <Handle
        type="target"
        position="left"
        style={{ background: "#555", width: "10px", height: "10px" }}
        onConnect={(params) => transmit(params)}
      />
    </AbstractComponent>
  );
}
