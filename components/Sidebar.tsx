import { cn } from '@/utils/style';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub, AiFillInstagram } from 'react-icons/ai';
import IconButton from './IconComponent';
import SideBarMenu from './SidebarMenu';

type SidebarProps = {
  close: () => void;
  isOpen: boolean;
};

const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
  return (
    <div
      className={cn(
        'fixed min-h-screen flex-col border-r border-slate-200 bg-white hidden lg:flex lg:w-60 pt-4 px-4 mt-14',
      )}
    >
      <SideBarMenu title="Home" href="/" />
      <SideBarMenu title="Who's Nerd?" href="/" />
      <SideBarMenu title="Friends" href="/" />
      <hr />
      <SideBarMenu title="FeedBack" href="/" />
      <SideBarMenu title="Privacy Policy" href="/" />
      <div className="mt-10 flex items-center gap-4">
        <IconButton
          Icon={AiFillInstagram}
          component={Link}
          href="https://www.instargram.com"
          target="_blank"
        />
        <IconButton
          Icon={AiFillGithub}
          component={Link}
          href="https://www.instargram.com"
          target="_blank"
        />
      </div>
    </div>
  );
};

export default Sidebar;
