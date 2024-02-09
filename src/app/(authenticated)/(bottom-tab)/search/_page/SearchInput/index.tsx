"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useQueryState } from "nuqs";
import useFocusableInput from "@/modules/hooks/useFocusableInput";

export default function SearchInput() {
  const [showClear, setShowClear] = React.useState(false);
  const [query, setQuery] = useQueryState("query");
  const { setInputRef } = useFocusableInput();

  React.useEffect(() => {
    setShowClear(Boolean(query));
  }, [query]);

  return (
    <TextField
      inputRef={setInputRef}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      label="Search for movies, shows, and more..."
      type="text" // "search" creates an uggly clear button, we are using our own
      variant="filled"
      fullWidth
      InputProps={{
        endAdornment: showClear ? (
          <IconButton
            onClick={() => {
              setQuery("");
              setShowClear(false);
            }}
            size="large"
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ) : null,
      }}
    />
  );
}
