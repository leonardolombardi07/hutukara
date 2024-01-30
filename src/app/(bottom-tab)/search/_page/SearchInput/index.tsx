"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import { useQueryState } from "nuqs";

export default function SearchInput() {
  const [query, setQuery] = useQueryState("query");

  return (
    <TextField
      autoFocus
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      label="Search for movies, shows, and more..."
      type="search"
      variant="filled"
      fullWidth
    />
  );
}
