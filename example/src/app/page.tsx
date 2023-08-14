'use client'
//import { GridStack } from 'gridstack';
//import 'gridstack/dist/gridstack.css';
//import "./App.css";
//import '../style.css';
import 'reactflow/dist/style.css'

import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
} from 'reactflow';
import ResizableNode from '@/components/Nodes/ResizableNode';
import ResizableNodeSelected from '@/components/Nodes/ResizableNodeSelected';
import CustomResizerNode from '@/components/Nodes/CustomResizerNode';
import ResizeRotateNode from '@/components/Nodes/ResizerRotate';

const nodeTypes = {
  ResizableNode,
  ResizableNodeSelected,
  CustomResizerNode,
  'ResizerRotateNode':ResizeRotateNode,
}

const initialNodes = [  
  {
    id: '1',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon' },
    position: { x: 100, y: 100 },
    style: {
      background: '#fff',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      height: 150,
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
    },
  },
  {
    id: '3',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon' },
    position: { x: 120, y: 120 },
    style: {
      background: '#fff',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      height: 150,
    },
  },
  {
    id: '4',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon' },
    position: { x: 130, y: 130 },
    style: {
      background: '#fff',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      height: 150,
    },
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



export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
      defaultNodes={initialNodes}
      defaultEdges={initialEdges}
      className="react-flow__edge-path"
      minZoom={0.2}
      maxZoom={4}
      fitView
      nodeTypes={nodeTypes}
    >
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
      <Controls />
    </ReactFlow>
    </div>
    
  );
}
//https://reactflow.dev/docs/quickstart/