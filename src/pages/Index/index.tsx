import React, { memo, Suspense } from 'react';
import { MachineList } from '@/pages/MachineList';

interface Props {}

const Index: React.FC<Props> = memo(() => {
  return (
    <>
      <MachineList />
    </>
  );
});
Index.displayName = 'Index';

export default Index;
