'use client'
//import { GridStack } from 'gridstack';
//import 'gridstack/dist/gridstack.css';
//import "./App.css";
//import '../style.css';
import 'reactflow/dist/style.css'
import './index.css';

import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  ReactFlowProvider,
} from 'reactflow';
import ResizableNode from '@/components/Nodes/ResizableNode';
import ResizableNodeSelected from '@/components/Nodes/ResizableNodeSelected';
import CustomResizerNode from '@/components/Nodes/CustomResizerNode';
import Sidebar from './Sidebar';
import ResizeRotateNode from '@/components/Nodes/js/ResizeRotateNode';


const nodeTypes = {
  ResizableNode,
  ResizableNodeSelected,
  CustomResizerNode,  
  resizeRotate: ResizeRotateNode,
}

const initialNodes = [  
  {
    id: '1',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon' },
    position: { x: 100, y: 100 },
    style: {
      background: 'url(/img/loteamento.webp)',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      height: 3900,
      width:5210,
      color:'black',
      backgroundSize:'cover'
    },
  },
  {
    id: '2',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon' },
    position: { x: 110, y: 110 },
    style: {
      background: '#fff',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      height: 150,    
      color:'black',  
    },
    parentNode:'1'
  },

];

const edges = [
  {
    id: '1->2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
];

interface initialEdges {
  id:string;
  source: string;
  target:string;
}


const initialEdges:initialEdges[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Home() {

  const reactFlowWrapper = useRef(null);
  
  

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: 'CustomResizerNode',
        position,
        data: { label: `${type} node` },
        style: {          
          background: `${type=='Disponivel'? '#AFFFAD': type=='Reservado'? '#D4AF37': type=='Em venda'? '#D3D71F': '#D3D71F'}`,
          fontSize: 12,
          //border: '1px solid black',
          padding: 5,
          borderRadius: 15,
          height: 150,
          color:'black',          
        },
        parentNode:'1',
      };
      
      

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow" style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
      defaultNodes={initialNodes}
      defaultEdges={initialEdges}
      className="react-flow__edge-path"
      minZoom={0.2}
      maxZoom={4}
      fitView
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      fitView
    >
      
   
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
      <Controls />
    </ReactFlow>
    </div>
      <Sidebar/>
    </ReactFlowProvider>
    </div>
    
  );
}
//https://reactflow.dev/docs/quickstart/