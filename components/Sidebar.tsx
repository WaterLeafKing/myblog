import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import {
  AiOutlineFileProtect,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlineQuestionCircle,
  AiOutlineTeam,
} from 'react-icons/ai';
import SideBarMenu from './SidebarMenu';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ease-in-out md:relative${mounted ? (isOpen ? 'left-0' : '-left-60') : '-left-60'} md:static`}
    >
      {/* Overlay - only exists on mobile */}
      <div
        className="absolute inset-0 bg-black/20 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar content */}
      <div className="absolute left-0 h-full w-60 bg-white lg:top-14 lg:border-r lg:border-slate-200">
        <div className="flex h-14 items-center border-b px-4 lg:hidden lg:px-4">
          <div className="mr-3 flex items-center hover:cursor-pointer lg:hidden">
            <AiOutlineMenu size={24} onClick={onClose} />
          </div>
          <Link href="/">
            <div className="flex items-center"></div>
            <h1 className="font-['Futura'] text-xl tracking-wider text-slate-500 md:text-xl lg:text-2xl">
              <span className="font-bold text-orange-600">N</span>
              <span className="font-thin">erd</span>
              <span className="font-thin">In</span>Sight
            </h1>
          </Link>
        </div>
        {/* Scrollable container */}
        <div className="h-full overflow-y-auto px-2 pt-4">
          <Link href="/">
            <SideBarMenu title="Home" icon={AiOutlineHome} />
          </Link>
          <Link href="/whos-nerd">
            <SideBarMenu title="Who's Nerd?" icon={AiOutlineQuestionCircle} />
          </Link>
          <Link href="/friends">
            <SideBarMenu title="Friends" icon={AiOutlineTeam} />
          </Link>
          <hr className="my-2" />
          <SideBarMenu title="FeedBack" icon={AiOutlineMessage} />
          <SideBarMenu title="Privacy Policy" icon={AiOutlineFileProtect} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
