import { User, Book, Circle } from "lucide-react";

interface MenuItemProps {
  title: string;
  icon: React.ComponentType<any>;
  href: string;
  disabled?: boolean;
}

export const adminMenu: MenuItemProps[] = [
  { title: "Usuários", icon: User, href: "/usuarios" },
  { title: "DRE", icon: Circle, href: "/dre" },
];

export const menu: MenuItemProps[] = [{ title: "Registros", icon: Book, href: "/" }];

