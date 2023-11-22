import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { type PropsWithChildren } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MainNav } from "../ui/main-nav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Toaster } from "../ui/toaster";
import { UserNav } from "../ui/user-nav";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className=" left-0 top-0 z-50 flex w-full flex-col">
        <div className="flex justify-center border-b border-gray-600">
          <div className="flex h-14 w-full items-center px-2 lg:w-[60%]">
            {/*  <MainNav className="mx-6" /> */}
            <NavigationMenu>
              <NavigationMenuList>
                <MainNavMenuItem link="/" text="Playlists" />
              </NavigationMenuList>
            </NavigationMenu>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
              <ModeToggle />
            </div>
          </div>
        </div>
        {children}
      </div>
      <Toaster />
    </>
  );
};
export default Layout;
interface MainMenuProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  link: string;
}
const MainNavMenuItem = (props: MainMenuProps) => {
  const { link, text } = props;
  return (
    <NavigationMenuItem>
      <Link href={link} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {text}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
