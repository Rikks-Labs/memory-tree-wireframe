"use client";

import React, { ReactNode } from "react";
import {
  IconHeart,
  IconHeartFilled,
  IconHome,
  IconHomeFilled,
  IconMapPin,
  IconMapPinFilled,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  path: string;
  icon: (isActive: boolean) => ReactNode;
  label: string;
}

// Combine all navigation items for the bottom bar
const navItems: NavItem[] = [
  {
    path: "/",
    icon: (isActive) =>
      isActive ? <IconHomeFilled size={26} /> : <IconHome size={26} />,
    label: "Home",
  },
  {
    path: "/favorites",
    icon: (isActive) =>
      isActive ? <IconHeartFilled size={26} /> : <IconHeart size={26} />,
    label: "Favorites",
  },
  {
    path: "/locations",
    icon: (isActive) =>
      isActive ? <IconMapPinFilled size={26} /> : <IconMapPin size={26} />,
    label: "Locations",
  },
  {
    path: "/me",
    icon: (isActive) =>
      isActive ? <IconUserFilled size={26} /> : <IconUser size={26} />,
    label: "Me",
  },
];

const MobileBottomNavbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const getButtonClasses = (path: string): string => {
    const baseClasses =
      "p-3 rounded-xl duration-200 ease-in-out transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black focus:ring-blue-500"; // Added focus states
    const activeClasses = "dark:text-white"; // Active state just changes color
    const inactiveClasses = "dark:text-neutral-500 dark:hover:text-neutral-300"; // Hover effect for inactive icons

    return `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`;
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 dark:bg-neutral-950/80 backdrop-blur-lg flex justify-around items-center px-2 animate-slide-in-bottom animate-duration-300 animate-ease-out animate-fill-forwards">
      {navItems.map((item, index) => (
        <button
          key={item.path}
          className={`${getButtonClasses(item.path)} animate-fade-in animate-delay-${
            index * 75 // Stagger animation slightly
          }ms animate-duration-500 animate-fill-forwards cursor-pointer`}
          onClick={() => navigate(item.path)}
          aria-label={item.label} // Accessibility improvement
        >
          {item.icon(pathname === item.path)}
        </button>
      ))}
    </nav>
  );
};

export default MobileBottomNavbar;
