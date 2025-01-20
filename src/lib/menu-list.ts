import { BarChart, FileText, LucideIcon, Settings, User, UserCog, Users } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export const getMenuList = (pathname: string): Group[] => {
  return [
    {
      groupLabel: "Main Menu",
      menus: [
        {
          label: "Letter of Recommendation",
          href: "/portal/lor",
          icon: FileText,
          active: pathname === "/portal/lor",
        },
        // {
        //   label: "ChatBot",
        //   href: "/portal/chatbot",
        //   icon: MessageSquare,
        //   active: pathname === "/portal/chatbot",
        // },
        {
          label: "Collab Portal",
          href: "/portal/collab",
          icon: Users,
          active: pathname === "/portal/collab",
        },
        {
          label: "NBA Reports",
          href: "/portal/nba",
          icon: BarChart,
          active: pathname === "/portal/nba",
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          label: "Profile",
          href: "/portal/settings/profile",
          icon: User,
          active: pathname === "/portal/settings/profile",
        },
        {
          label: "Account",
          href: "/portal/settings/account",
          icon: UserCog,
          active: pathname === "/portal/settings/account",
        },
        {
          label: "Appearance",
          href: "/portal/settings/appearance",
          icon: Settings,
          active: pathname === "/portal/settings/appearance",
        },
      ],
    },
  ];
};
