"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { menu, adminMenu } from "@/config/menu";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ROLES } from "@/enums/roles";
import { Session } from "next-auth";

interface SidebarProps {
  closeSideMenu?: () => void;
  session: Session;
}

export function Sidebar({ session, closeSideMenu = () => {} }: SidebarProps) {
  const path = usePathname();

  const displayMenu =
    session.user.role === ROLES.ADMIN ? [...menu, ...adminMenu] : menu;

  return (
    <div className="grid items-start gap-2">
      {displayMenu.map((item, index) => {
        const Icon = item.icon;
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={closeSideMenu}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent font-medium" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
      <span
        data-test="signout-btn"
        className="cursor-pointer flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
        onClick={() => signOut()}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sair</span>
      </span>
    </div>
  );
}
