import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { Button } from "./button";
import { useRouter } from "next/router";

// Use the useUser hook to get the Clerk.user object

export function UserNav() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  if (isSignedIn && user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isSignedIn ? (
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`${user?.imageUrl}`}
                  alt="spotify Profile Picture"
                />
              </Avatar>
            </Button>
          ) : (
            <div>
              <button
                onClick={() => SignIn({ afterSignInUrl: "/" })}
                className="btn"
              >
                Sign in
              </button>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.fullName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/profile/my-polls")}
            >
              Meine Umfragen
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <SignOutButton signOutCallback={() => router.push("/")} />
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return <SignInButton afterSignInUrl="/" />;
}
