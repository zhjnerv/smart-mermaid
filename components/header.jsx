"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { FileCode2, Github } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-6 w-6" />
          <span className="text-lg font-bold">Smart Mermaid</span>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/liujuntao123/smart-mermaid"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 