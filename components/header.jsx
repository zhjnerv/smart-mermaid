"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { FileCode2 } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-6 w-6" />
          <span className="text-lg font-bold">Smart Mermaid</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 