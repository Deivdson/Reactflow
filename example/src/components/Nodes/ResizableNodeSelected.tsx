import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

interface ResizableNodeSelected {
    data: {
        label: string;
    };
    selected: boolean;
}
const ResizableNodeSelected: React.FC<ResizableNodeSelected> = ({ data, selected }) => {
  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ResizableNodeSelected);
