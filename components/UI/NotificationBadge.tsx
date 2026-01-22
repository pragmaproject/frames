import React from 'react';

interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-frames-azure px-1 text-[9px] font-bold text-white shadow-sm ring-1 ring-white animate-in zoom-in duration-300">
      {count > 99 ? '99+' : count}
      <span className="absolute inline-flex h-full w-full rounded-full bg-frames-azure opacity-20 animate-ping"></span>
    </span>
  );
};