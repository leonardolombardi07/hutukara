"use client";

import Chip from "@mui/material/Chip";
import { useQueryState } from "nuqs";

interface FilterChipProps {
  label: string;
  value: string;
  queryKey: string;
}

export default function FilterChip({
  label,
  queryKey,
  value,
}: FilterChipProps) {
  const [query, setQuery] = useQueryState(queryKey, {
    history: "push",
  });

  const isActive = query === value;

  function onClick() {
    setQuery(isActive ? "" : value);
  }

  return (
    <Chip
      label={label}
      variant="outlined"
      size="medium"
      color={isActive ? "primary" : "default"}
      onClick={onClick}
    />
  );
}
