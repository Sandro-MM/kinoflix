import {Footer} from '@common/ui/footer/footer';
import {MainNavbar} from '@app/main-navbar';
import {ReactNode} from 'react';
import {useScrollToTop} from '@common/ui/navigation/use-scroll-to-top';
import {AdHost} from '@common/admin/ads/ad-host';

interface Props {
  children: ReactNode;
}
export function SitePageLayout({children}: Props) {
  useScrollToTop();
  return (
    <div className="flex flex-col">
      <MainNavbar />
      <div className="flex-auto">
        <AdHost slot="general_top" className="py-24" />
        <div className="relative min-h-[1000px] overflow-hidden">
          {children}
        </div>
        <AdHost slot="general_bottom" className="py-24" />
      </div>
      <Footer className="container mx-auto mt-48 flex-shrink-0 px-24" />
    </div>
  );
}
