import { ScrollArea } from "../ui/scroll-area";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface SheetFormContentProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

function SheetFormContent({
  children,
  title,
  description,
}: SheetFormContentProps) {
  return (
    <SheetContent className="min-w-full sm:min-w-[550px] 2xl:min-w-[700px] max-w-full">
      <SheetHeader className="pb-2">
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="pr-3 pl-1" data-test="sheet-form">
          {children}
        </div>
      </ScrollArea>
    </SheetContent>
  );
}

export const SheetForm = {
  Content: SheetFormContent,
};
