// SettingsPage.tsx
import DashboardLayout from "@/layouts/app/AppLayout";

import SettingsHeader from "@/components/settings/SettingsHeader";
import AppearanceCard from "@/components/settings/AppearanceCard";
import ChangePasswordCard from "@/components/settings/ChangePasswordCard";
import DangerZoneCard from "@/components/settings/DangerZoneCard";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            {/* space-y-8 -> space-y-5: the three cards were reading as
                separate floating boxes; tighter gap reads as one
                cohesive settings column, matching the target. */}
            <div className="mx-auto w-full max-w-6xl space-y-5">
                <SettingsHeader />

                <AppearanceCard />

                <ChangePasswordCard />

                <DangerZoneCard />
            </div>
        </DashboardLayout>
    );
}