import {
  ArrowRightLeft,
  BookOpen,
  CalendarClock,
  LayoutDashboard,
  Users,
} from "lucide-vue-next";

export const sidebarItem = [
  {
    id: 1,
    name: "dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: 2,
    name: "pengguna",
    icon: Users,
    path: "/admin/pengguna",
  },
  {
    id: 3,
    name: "buku",
    icon: BookOpen,
    path: "/admin/buku",
  },
  {
    id: 4,
    name: "booking",
    icon: ArrowRightLeft,
    path: "/admin/booking",
  },
  {
    id: 5,
    name: "peminjaman",
    icon: CalendarClock,
    path: "/admin/peminjaman",
  },
];
