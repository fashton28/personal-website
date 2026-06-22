import { CmdKButton } from "@/components/cmd-k-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MenuCurtain } from "@/components/menu-curtain";

/**
 * The search / theme / menu cluster, fixed to the top-right on every route.
 * The wrapper is aligned to the content column (max-w-[780px] + page padding) so
 * the controls line up with the page content rather than the raw screen corner.
 */
export function HeaderControls() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 mx-auto flex max-w-[780px] justify-end px-5 pt-4 sm:px-9 sm:pt-6 lg:px-10 lg:pt-7">
      <div className="pointer-events-auto flex items-center gap-2">
        <CmdKButton />
        <ThemeToggle />
        <MenuCurtain />
      </div>
    </div>
  );
}
