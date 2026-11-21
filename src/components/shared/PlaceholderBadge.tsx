import { cn } from "@/lib/utils";
import { isDev } from "@/config/site";

type Props = {
  className?: string;
  label?: string;
  force?: boolean;
};

export function PlaceholderBadge({
  className,
  label = "TO BE CONFIRMED",
  force = false,
}: Props) {
  if (!isDev && !force) return null;

  return (
    <span className={cn("placeholder-badge", className)} role="status">
      {label}
    </span>
  );
}
