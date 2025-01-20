"use client";

import AdminPanelLayout from '@/components/custom/admin-panel-layout';

// const items = [
//   {
//     title: "Letter of Recommendation",
//     url: "/portal/lor",
//     Icon: FileText,
//     description: "Request and track recommendations",
//     badge: "New",
//   },
//   {
//     title: "ChatBot",
//     url: "/portal/chatbot",
//     Icon: MessageSquare,
//     description: "Get instant assistance",
//   },
//   {
//     title: "Collab Portal",
//     url: "/portal/collab",
//     Icon: Users,
//     description: "Connect with peers and faculty",
//     badge: "Beta",
//   },
//   {
//     title: "NBA Reports",
//     url: "/portal/nba",
//     Icon: BarChart,
//     description: "View academic analytics",
//   },
// ];
type PortalLayoutProps = {
  children: React.ReactNode;
};
export default function PortalLayout({ children }: PortalLayoutProps) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
