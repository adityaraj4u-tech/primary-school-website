import { siteConfig } from "@/config/site";
import { PlaceholderBadge } from "@/components/shared/PlaceholderBadge";

export function AnnouncementBar() {
  if (!siteConfig.features.admissionsOpen) {
    return null;
  }

  return (
    <div className="bg-navy text-white text-center text-sm py-2 px-4">
      <p className="inline-flex items-center gap-2 flex-wrap justify-center">
        <span>Admissions for the new session are open.</span>
        <PlaceholderBadge label="Confirm dates" />
      </p>
    </div>
  );
}
