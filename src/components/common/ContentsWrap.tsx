import React from 'react';

import clsx from 'clsx';

import { Header } from '~/components/common/index';

// import Sidebar from '~/components/Sidebars/Sidebar';

interface Props {
  className?: string;
  children: React.ReactNode;
}

function ContentsWrap({ className = 'flex-row', children }: Props) {
  return (
    <div
      className={clsx(
        // h-full
        'relative left-0 top-0 flex h-auto flex-row justify-start overflow-x-auto bg-gray-100'
      )}
      >
      {/* <Sidebar /> */}
      {/* */}
      <div className={'flex w-full flex-col'}>
        <Header />
        <div style={{maxHeight: 'calc(100vh - 53px)'}} className={clsx('flex w-full min-w-[1750px]', className)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ContentsWrap;
