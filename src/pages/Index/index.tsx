import React, { memo, Suspense } from 'react';
import { MachineList } from '@/pages/MachineList';

interface Props {
}

const Index: React.FC<Props> = memo(() => {
  return (
    <>
      <MachineList />
      <div>VITE_API_BASE_URL: {import.meta.env.VITE_API_BASE_URL}</div>
      <div>VITE_GRAPHQL_URI: {import.meta.env.VITE_GRAPHQL_URI}</div>
    </>
  );
});
Index.displayName = 'Index';

export default Index;
