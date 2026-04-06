'use client';

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/cursor/CustomCursor'), { ssr: false });
const PageLoader = dynamic(() => import('@/components/transitions/PageLoader'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), { ssr: false });
const CubeNav = dynamic(() => import('@/components/nav/CubeNav'), { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <CubeNav />
      <SmoothScroll>
        <main>{children}</main>
      </SmoothScroll>
    </>
  );
}
