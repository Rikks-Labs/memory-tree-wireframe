import Image from "next/image";
import { ReactNode } from "react";
import {
  IconHeart,
  IconHome,
  IconHome2,
  IconHomeFilled,
  IconMapPin,
  IconPolaroidFilled,
  IconUser,
} from "@tabler/icons-react";
import DesktopSidebar from "#/components/desktop/sidebar";
import MobileBottomNavbar from "#/components/mobile/bottom-navbar";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col md:flex-row">
      <div className="hidden md:flex">
        <DesktopSidebar />
      </div>
      <div className="flex-grow w-full pb-16 md:pb-0">{children}</div>
      <div className="block md:hidden">
        <MobileBottomNavbar />
      </div>
    </div>
  );
};

export default MainLayout;
