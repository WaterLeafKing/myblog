import Link from 'next/link';
import { FC } from 'react';

type SidebarMenuProps = {
  title: string;
  href: string;
};

const SideBarMenu: FC<SidebarMenuProps> = ({ title, href }) => {
  return (
    <div className="px-4 py-2 hover:cursor-pointer hover:rounded-md hover:bg-orange-200">
      <Link href="/" className="w-48 font-light text-slate-700">
        {title}
      </Link>
    </div>
  );
};

export default SideBarMenu;
