import React, { useState } from "react";

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background
} from "react-flow-renderer";

import { Components, createNode } from "@/core/repos/Components";

import InputComponent from "../components/InputComponent";
import TransformComponent from "../components/TransformComponent";
import WrapperComponent from "../components/WrapperComponent";
import EditorComponent from "../components/EditorComponent";

import { useSnapshot } from "valtio";

const nodeTypes = {
  inputNode: InputComponent,
  transformNode: TransformComponent,
  wrapperNode: WrapperComponent,
  editorNode: EditorComponent
};
const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const Flow = () => {
  const state = useSnapshot(Components);

  const [elements, setElements] = useState(state);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) =>
    setElements((els) => {
      return addEdge(params, els);
    });

  return (
    <ReactFlow
      elements={elements}
      nodeTypes={nodeTypes}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      snapToGrid={true}
      snapGrid={[15, 15]}
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === "input") return "#0041d0";
          if (n.type === "output") return "#ff0072";
          if (n.type === "default") return "#1a192b";

          return "#eee";
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return "#fff";
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default Flow;
