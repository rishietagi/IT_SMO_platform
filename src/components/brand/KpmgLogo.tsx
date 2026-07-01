import { cn } from "@/lib/utils";

type Variant = "navy" | "white" | "black";

const SRC: Record<Variant, string> = {
  navy: "/kpmg-logo.png",
  white: "/kpmg-logo-white.png",
  black: "/kpmg-logo-black.png",
};

/** KPMG wordmark. Use "white" on navy surfaces, "black"/"navy" on light. */
export function KpmgLogo({
  variant = "black",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <img
      src={SRC[variant]}
      alt="KPMG"
      className={cn("block h-6 w-auto select-none", className)}
      draggable={false}
    />
  );
}
