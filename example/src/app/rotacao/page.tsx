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
  ReactFlowProvider,
} from 'reactflow';
import ResizableNode from '@/components/Nodes/ResizableNode';
import ResizableNodeSelected from '@/components/Nodes/ResizableNodeSelected';
import CustomResizerNode from '@/components/Nodes/CustomResizerNode';
import ResizerRotate from '@/components/Nodes/ResizerRotate';
import ResizeRotateNode from '@/components/Nodes/js/ResizeRotateNode';

const nodeTypes = {
  resizeRotate: ResizeRotateNode,
};

const nodes = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: { label: 'Node 1' },
    type: 'resizeRotate',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    selected: true,
    style: { width: 180, height: 100},
    cor: 1
  },
  {
    id: '2',
    position: { x: 100, y: 400 },
    data: { label: 'Node 2' },
    type: 'resizeRotate',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: { width: 180, height: 100 },
    cor: 1
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


const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: '#9ca8b3' },
  markerEnd: {
    type: 'arrowclosed',
  },
};


export default function ReactFlowWrapper(props: any) {
  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      className="react-flow__edge-path"
      minZoom={0.2}
      maxZoom={4}
      fitView
      nodeTypes={nodeTypes}
      defaultViewport={{ zoom: 1, x: 0, y: 0 }}
      fitView
      fitViewOptions={{ padding: 0.4 }}
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
    </div>
    </ReactFlowProvider>
  );
};

