import React, { FC } from 'react';

type SidebarMenuProps = {
  title: string;
  icon: React.ElementType;
};

const SideBarMenu: FC<SidebarMenuProps> = ({ title, icon }) => {
  return (
    <div className="flex flex-row items-center gap-2 px-4 py-2 hover:cursor-pointer hover:rounded-md hover:bg-orange-100">
      {icon && <div>{React.createElement(icon)}</div>}
      <div className="text-sm font-light text-slate-700">{title}</div>
    </div>
  );
};

export default SideBarMenu;
