import { useLocation } from 'react-router-dom';

import clsx from 'clsx';

import AccordionMenus from '~/components/sidebar/AccordionMenus';
import SideMenuHeader from '~/components/sidebar/SideMenuHeader';
import { MENU_LINK_KEY } from '~/utils/menuUtil';

import SidebarControlButton from '../button/SidebarControlButton';

export function Sidebar() {
  let { pathname } = useLocation();
  // const { sidebarState, closeSidebar } = useSidebarContext();

  // const ref = useClickAway(() => {
  //   if (sidebarState === true) {
  //     closeSidebar();
  //   }
  // });
  // useEffect(() => {
  //   if (pathname) {
  //     closeSidebar();
  //   }
  // }, [pathname]);
  return (
    <div
      //@ts-ignore
      // ref={ref}
      className={clsx(
        'h-full min-w-[220px] flex-row-reverse border-e border-gray-200 bg-white pb-10 pt-7'
        // sidebarState ? 'translate-x-0' : '-translate-x-full'
      )}
      // className={clsx(
      //   'hs-overlay fixed bottom-0 start-0 top-0 z-[60] w-64 transform overflow-y-auto border-e border-gray-200 bg-white pb-10 pt-7 transition-all duration-300',
      //   sidebarState ? 'translate-x-0' : '-translate-x-full'
      // )}
      id="docs-sidebar">
      <SideMenuHeader title={'번들즈'}>
        <SidebarControlButton className={'absolute right-3'} />
      </SideMenuHeader>

      <nav className="hs-accordion-group flex max-h-[1100px] w-full flex-col flex-nowrap p-6">
        {/* 메뉴 항목이 없습니다 */}
      </nav>
    </div>
  );
}
