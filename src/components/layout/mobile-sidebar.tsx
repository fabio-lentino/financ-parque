"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Session } from "next-auth";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  session: Session;
}

export function MobileSidebar({ session }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0 w-64 pt-12">
          <Sidebar closeSideMenu={() => setOpen(false)} session={session} />
        </SheetContent>
      </Sheet>
    </>
  );
}
