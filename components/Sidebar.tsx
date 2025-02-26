import { cn } from '@/utils/style';
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
  close: () => void;
  isOpen: boolean;
};

const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
  return (
    <div
      className={cn(
        'fixed min-h-screen flex-col border-r border-slate-200 bg-white hidden lg:flex lg:w-60 pt-4 px-2 mt-14 w-96',
      )}
    >
      <Link href="/">
        <SideBarMenu title="Home" icon={AiOutlineHome} />
      </Link>
      <Link href="/whos-nerd">
        <SideBarMenu title="Who's Nerd?" icon={AiOutlineQuestionCircle} />
      </Link>
      <SideBarMenu title="Friends" icon={AiOutlineTeam} />
      <hr className="my-2" />
      <SideBarMenu title="FeedBack" icon={AiOutlineMessage} />
      <SideBarMenu title="Privacy Policy" icon={AiOutlineFileProtect} />
    </div>
  );
};

export default Sidebar;
