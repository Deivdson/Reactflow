import { proxy } from "valtio";

export const Components = proxy([
  {
    id: "0",
    type: "inputNode",
    targetPosition: "right",
    sourcePosition: "left",
    data: {
      label: "Blank Component",
      value: "",
      execute: (value: string) => console.log("Executing Component 1 ", value)
    },
    position: { x: 0, y: 0 }
  },
  {
    id: "1",
    type: "transformNode",
    targetPosition: "right",
    sourcePosition: "left",
    data: {
      label: "Second Component",
      value: "",
      execute: (self: any, value: string) => {
        self.data.value = value;
      }
    },
    position: { x: 200, y: 0 }
  },
  {
    id: "2",
    type: "wrapperNode",
    targetPosition: "right",
    sourcePosition: "left",
    data: {
      label: "Second Component",
      value: "",
      execute: (self: any, value: string) => {
        self.data.value = value;
      }
    },
    position: { x: 380, y: 0 }
  },
  {
    id: "3",
    type: "editorNode",
    targetPosition: "right",
    sourcePosition: "left",
    data: {
      label: "Second Component",
      value: "",
      execute: (self: any, value: string) => {
        self.data.value = value;
      }
    },
    position: { x: 600, y: 0 }
  }
]);

export function createNode(node: any) {
  console.log("CREATING NEW NODE ", node);
  Components.push(node);
}

export function getNode(nodeId: string) {
  return Components[parseInt(nodeId)];
}

export function deleteNode(nodeId: string) {
  initialComponents.delete(nodeId);
}
