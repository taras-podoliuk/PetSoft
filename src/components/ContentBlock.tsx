import { cn } from "@/lib/utils";

type ContentBockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: ContentBockProps) {
  return (
    <div
      className={cn(
        "bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden w-full h-full",
        className
      )}
    >
      {children}
    </div>
  );
}
