import type { LucideIcon } from "lucide-react";

const TitleField = ({ title, icon }: { title: string; icon: LucideIcon }) => {
  const Icon = icon;
  return (
    <div dir="ltr" className="flex items-center justify-end gap-2">
      <span className="text-sm font-medium text-[#364153]">{title}</span>
      <Icon className="size-5 text-moon-primary-600" />
    </div>
  );
};

export default TitleField;
