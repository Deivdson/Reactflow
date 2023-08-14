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
import ResizeRotateNode from '@/components/Nodes/ResizerRotate';

const nodeTypes = {
  resizeRotate: ResizeRotateNode,
};

const nodes = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: { label: 'Node 1' },
    type: 'ResizeRotateNode',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    selected: true,
    style: { width: 180, height: 100 },
  },
  {
    id: '2',
    position: { x: 100, y: 400 },
    data: { label: 'Node 2' },
    type: 'ResizeRotateNode',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: { width: 180, height: 100 },
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

function ReactFlowPro() {
  return (
    <ReactFlow      
      defaultNodes={nodes}
      defaultEdges={edges}
      defaultViewport={{ zoom: 1, x: 0, y: 0 }}
      fitView
      fitViewOptions={{ padding: 0.4 }}
    >
      <Background />
    </ReactFlow>
  );
}

export default function ReactFlowWrapper(props: any) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
};

