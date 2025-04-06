'use client';

import dynamic from 'next/dynamic';

const ReactFlowGraph = dynamic(() => import('../components/ReactFlowGraph'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Graph() {
  return (
    <div className="h-screen w-full">
      <ReactFlowGraph />
    </div>
  );
}
