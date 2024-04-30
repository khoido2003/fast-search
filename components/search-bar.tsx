"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSearching, startTransition] = useTransition();
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  return (
    <div className="relative w-full h-14 flex flex-col bg-white text-slate-900">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          disabled={isSearching}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }

            if (e.key === "Escape") {
              inputRef.current?.blur();
            }
          }}
          ref={inputRef}
          className="absolute inset-0 h-full"
        />

        <Button
          onClick={() => {
            search();
          }}
          disabled={isSearching}
          className="absolute right-0 inset-y-0 h-full rounded-l-none"
        >
          {isSearching ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : (
            <SearchIcon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};
