// ThemeOptionCard.tsx
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Theme } from "@/contexts/ThemeContext";

interface ThemeOptionCardProps {
    value: Theme;
    title: string;
    description: string;
    icon: LucideIcon;
    selected: boolean;
    onSelect: (theme: Theme) => void;
}

export default function ThemeOptionCard({
    value,
    title,
    description,
    icon: Icon,
    selected,
    onSelect,
}: ThemeOptionCardProps) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            aria-label={`${title} theme${
                selected
                    ? ", currently selected"
                    : ""
            }`}
            onClick={() =>
                onSelect(value)
            }
            className={cn(
                `
                    group
                    relative
                    flex
                    w-full
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    bg-background
                    px-4
                    py-5
                    text-center
                    transition-all
                    duration-200
                    ease-out
                    hover:-translate-y-0.5
                    hover:shadow-md
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-violet-500
                    focus-visible:ring-offset-2
                    dark:hover:shadow-black/20
                `,
                selected
                    ? `
                        border-violet-500
                        bg-violet-50/40
                        shadow-sm
                        dark:border-violet-400
                        dark:bg-violet-950/20
                    `
                    : `
                        border-border
                        hover:border-violet-200
                        dark:hover:border-violet-800
                    `,
            )}
        >
            {/* Selection Indicator — shrunk slightly to match the more
                compact overall card. */}
            <span
                aria-hidden="true"
                className={cn(
                    `
                        absolute
                        right-3
                        top-3
                        flex
                        h-4
                        w-4
                        items-center
                        justify-center
                        rounded-full
                        border-2
                    `,
                    selected
                        ? `
                            border-violet-600
                            bg-violet-600
                            dark:border-violet-400
                            dark:bg-violet-500
                        `
                        : `
                            border-muted-foreground/50
                            bg-transparent
                        `,
                )}
            >
                {selected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
            </span>

            {/* Theme Icon — h-24/h-12 was oversized relative to the
                target's compact card; scaled down along with removing
                the fixed min-h-[220px] on the card itself, which was
                the main reason these cards read taller than target. */}
            <div
                className={cn(
                    `
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-muted/50
                        transition-transform
                        duration-200
                        group-hover:scale-105
                    `,
                    selected &&
                        `
                            bg-violet-50
                            dark:bg-violet-950/40
                        `,
                )}
            >
                <Icon
                    className={cn(
                        "h-7 w-7",
                        selected
                            ? "text-violet-600 dark:text-violet-400"
                            : "text-muted-foreground",
                    )}
                    aria-hidden="true"
                />
            </div>

            {/* Theme Text */}
            <div className="mt-3 space-y-0.5">
                <h3
                    className={cn(
                        "text-base font-semibold",
                        selected &&
                            "text-violet-600 dark:text-violet-400",
                    )}
                >
                    {title}
                </h3>

                <p className="text-xs leading-5 text-muted-foreground">
                    {description}
                </p>
            </div>
        </button>
    );
}