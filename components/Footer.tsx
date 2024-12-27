import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import IconButton from './IconComponent';

const Footer: FC = () => {
  return (
    <footer className="flex justify-between border-t p-4 font-medium">
      <div className="flex items-center gap-2 lg:gap-3">
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        {/* <div className="pr-1 text-sm lg:pr-2 lg:text-base">Admin</div> */}
        <IconButton
          Icon={AiOutlineSetting}
          component={Link}
          href="/admin"
          className="text-gray-500 hover:text-gray-600"
        />        
      </div>
    </footer>
  );
};

export default Footer;
