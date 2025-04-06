'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Handle,
  Position,
  useEdgesState,
  useNodesState,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Tag {
  tag_id: number;
  Tag: {
    name: string;
  }[];
}

// 커스텀 노드 컴포넌트 생성
function CustomNode({ data }: { data: { label: string } }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'default' }}
    >
      <div
        className={`relative size-3 rounded-full bg-slate-400 transition-transform ${
          isHovered ? 'scale-125' : ''
        }`}
      >
        <Handle
          type="target"
          position={Position.Right}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
          }}
          isConnectable={false}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
          }}
          isConnectable={false}
        />
      </div>
      <div className="whitespace-nowrap text-center text-xs font-thin">
        {data.label}
      </div>
    </div>
  );
}

export default function ReactFlowGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const nodeTypes = { custom: CustomNode };

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const { data: posts } = await supabase.from('Post').select(
        `
        id,
        preview_image_url,
        title,
        created_at,
        category_id,
        Category:category_id (title),
        PostTag (
          tag_id,
          Tag (name)
        ),
        duration_time
      `,
      );

      console.log('postssss : ' + posts);

      if (posts) {
        const postNodes: Node[] = posts.map((post, index) => ({
          id: post.id.toString(),
          type: 'custom',
          position: {
            x: Math.cos(index * ((2 * Math.PI) / posts.length)) * 300,
            y: Math.sin(index * ((2 * Math.PI) / posts.length)) * 300,
          },
          data: { label: post.title },
          draggable: true,
        }));

        const postEdges: Edge[] = [];
        const processedPairs = new Set<string>();

        posts.forEach((post1) => {
          posts.forEach((post2) => {
            if (post1.id !== post2.id) {
              const pairKey = [post1.id, post2.id].sort().join('-');
              if (!processedPairs.has(pairKey)) {
                const commonTags = post1.PostTag.filter((tag1) =>
                  post2.PostTag.some((tag2) => tag2.tag_id === tag1.tag_id),
                );

                if (commonTags.length > 0) {
                  // 하나의 엣지만 생성
                  postEdges.push({
                    id: pairKey,
                    type: 'straight',
                    source: post1.id.toString(),
                    target: post2.id.toString(),
                    style: { stroke: '#cacaca' },
                    animated: false,
                  });
                  processedPairs.add(pairKey);
                }
              }
            }
          });
        });

        setNodes(postNodes);
        setEdges(postEdges);
      }
    };

    fetchPosts();
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      connectOnClick={false}
      draggable={true}
      nodesConnectable={false}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
