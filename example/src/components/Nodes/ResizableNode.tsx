import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';


interface ResizableNodeProps {
    data: {
        label: string;
    };
}
const ResizableNode: React.FC<ResizableNodeProps> = ({ data }) => {
  return (
    <>
      <NodeResizer minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ResizableNode);
