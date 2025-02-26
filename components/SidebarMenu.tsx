import Link from 'next/link';
import { FC } from 'react';

type SidebarMenuProps = {
  title: string;
  href: string;
};

const SideBarMenu: FC<SidebarMenuProps> = ({ title, href }) => {
  const handleClick = () => {
    // Add any additional logic here before/after navigation
    console.log('Navigating to:', href);
    // You could also use router.push(href) here if you need more control
  };

  return (
    <div className="px-4 py-2 hover:cursor-pointer hover:rounded-md hover:bg-orange-100">
      <Link
        href={href}
        className="w-48 text-sm font-light text-slate-700"
        onClick={handleClick}
      >
        {title}
      </Link>
    </div>
  );
};

export default SideBarMenu;
