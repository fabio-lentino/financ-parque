import { cn } from "@/lib/utils";

interface PanelProps {
  children?: React.ReactNode;
  className?: string;
}

function PanelRoot({ children, className }: PanelProps) {
  return (
    <div className={cn("flex flex-col p-8 space-y-4", className)}>
      {children}
    </div>
  );
}

function PanelHeader({ children, className }: PanelProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

function PanelTitle({ children, className }: PanelProps) {
  return (
    <h2
      data-test="page-title"
      className={cn("text-3xl font-bold tracking-tight", className)}
    >
      {children}
    </h2>
  );
}

function PanelDescription({ children, className }: PanelProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

function PanelContent({ children, className }: PanelProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export const Panel = {
  Root: PanelRoot,
  Header: PanelHeader,
  Title: PanelTitle,
  Description: PanelDescription,
  Content: PanelContent,
};
