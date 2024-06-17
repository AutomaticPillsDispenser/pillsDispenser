"use client";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function LogoutComponent() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => {
        signOut();

        router.push('/')
        router.refresh()
        
      }}
    >
      Logout
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}

export default LogoutComponent;
