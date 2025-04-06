"use client";

import React, { ReactNode } from "react";
import {
  IconHeart,
  IconHeartFilled,
  IconHome,
  IconHomeFilled,
  IconMapPin,
  IconMapPinFilled,
  IconPolaroidFilled,
  IconProps,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  path: string;
  icon: (isActive: boolean) => ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  {
    path: "/",
    icon: (isActive) =>
      isActive ? <IconHomeFilled size={28} /> : <IconHome size={28} />,
    label: "Home",
  },
  {
    path: "/favorites",
    icon: (isActive) =>
      isActive ? <IconHeartFilled size={28} /> : <IconHeart size={28} />,
    label: "Favorites",
  },
  {
    path: "/locations",
    icon: (isActive) =>
      isActive ? <IconMapPinFilled size={28} /> : <IconMapPin size={28} />,
    label: "Locations",
  },
];

const bottomNavItem: NavItem = {
  path: "/me",
  icon: (isActive) =>
    isActive ? <IconUserFilled size={28} /> : <IconUser size={28} />,
  label: "Me",
};

const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const getButtonClasses = (path: string): string => {
    const baseClasses =
      "p-4 px-5 rounded-2xl dark:hover:bg-neutral-800 duration-200 ease-in-out transition-all cursor-pointer";
    const activeClasses = "dark:bg-neutral-900 dark:text-white";
    const inactiveClasses = "dark:text-neutral-500";

    return `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`;
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="h-screen w-[100px] py-4 flex flex-col justify-between items-center">
      <div className="w-full flex justify-center p-2">
        <IconPolaroidFilled
          size={32}
          className={"dark:text-white text-black"}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        {navItems.map((item, index) => (
          <div
            key={item.path}
            className={`animate-slide-in-bottom animate-delay-${
              index * 100
            } animate-once animate-fill-forwards`}
          >
            <button
              className={getButtonClasses(item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.icon(pathname === item.path)}
            </button>
          </div>
        ))}
      </div>
      <div className="animate-slide-in-bottom animate-delay-[300ms] animate-once animate-fill-forwards">
        <button
          key={bottomNavItem.path}
          className={getButtonClasses(bottomNavItem.path)}
          onClick={() => navigate(bottomNavItem.path)}
        >
          {bottomNavItem.icon(pathname === bottomNavItem.path)}
        </button>
      </div>
    </nav>
  );
};

export default DesktopSidebar;
