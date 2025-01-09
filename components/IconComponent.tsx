import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, createElement, ElementType } from 'react';
import { IconType } from 'react-icons';

type IconButtonProps<Component extends ElementType> =
  ComponentPropsWithoutRef<Component> & {
    Icon: IconType;
    iconClassName?: string;
    className?: string;
    component?: Component;
  };

const IconButton = <Component extends ElementType = 'button'>({
  Icon,
  iconClassName,
  className,
  component,
  ...props
}: IconButtonProps<Component>) => {
  return createElement(
    component ?? 'button',
    {
      className: cn('p-0.5 lg:p-1', className),
      ...props,
    },
    <Icon className={cn('size-4 translate-all lg:size-5', iconClassName)} />,
  );
};

export default IconButton;
