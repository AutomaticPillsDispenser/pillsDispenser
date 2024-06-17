"use client";

import * as React from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
  
      // Validate position and location
      if (!position || !location) {
        // Handle validation error, for example, show an error message to the user
        console.error("Position and Location are required.");
        setIsLoading(false); // Reset loading state
        return; // Exit function early
      }
  
      const res = await axios.post("http://localhost:8000/auth/createAccount", {
        email,
        password,
        position,
        location,
      });
  
      if (res.status === 201) {
        toast({
          variant: "default", // Use "success" variant for a positive message
          title: "Account Created Successfully",
          description: "You can login after admin verifies your details",
        });
        router.push("/login");
        router.refresh();
        setIsLoading(false);
      } else {
        toast({
          variant: "destructive", // Use "error" variant for an error message
          title: "Account Creation Failed",
          description: "Email already exists or an error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        variant: "destructive",
        title: "Account Creation Failed",
        description: "Email already exists or an error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false); // Always reset loading state after the request completes
    }
  }
  

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label
              htmlFor="framework"
              className="text-gray-500 mt-1 ml-2 text-[12px] font-light"
            >
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            <Label
              htmlFor="framework"
              className="text-gray-500 mt-3 ml-2 text-[12px] font-light"
            >
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
            
          </div>
          <Button disabled={isLoading} className="mt-3">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}
