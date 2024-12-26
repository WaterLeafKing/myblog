import { cn } from '@/utils/style';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';
import IconButton from './IconComponent';

type SidebarProps = {
  close: () => void;
  isOpen: boolean;
};

const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
  return (
    <div
      className={cn(
        'absolute min-h-screen flex-col gap-6 border-r bg-white p-10 pr-6 text-base lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      <IconButton Icon={AiOutlineClose} onClick={close} />

      <Link href="/" className="w-48 font-medium text-gray-600 hover:underline">
        홈
      </Link>
      <Link href="/" className="w-48 font-medium text-gray-600 hover:underline">
        태그
      </Link>
      <Link href="/" className="w-48 font-medium text-gray-600 hover:underline">
        Web Development
      </Link>
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
