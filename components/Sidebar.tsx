import Link from 'next/link';
import { FC } from 'react';
import {
  AiOutlineFileProtect,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineQuestionCircle,
  AiOutlineTeam,
} from 'react-icons/ai';
import SideBarMenu from './SidebarMenu';

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed z-20 mt-14 min-h-screen w-60 flex-col border-r border-slate-200 bg-white px-2 pt-4 lg:mt-14 lg:flex lg:w-60
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-500 ease-in-out
      `}
    >
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
  );
};

export default Sidebar;
