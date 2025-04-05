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

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex align-middle place-items-center justify-center h-screen w-screen bg-neutral-100 dark:bg-neutral-950">
      <DesktopSidebar />
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default MainLayout;
