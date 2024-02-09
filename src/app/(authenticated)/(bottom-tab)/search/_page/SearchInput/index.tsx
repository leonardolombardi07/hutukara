"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useQueryState } from "nuqs";

export default function SearchInput() {
  const [showClear, setShowClear] = React.useState(false);
  const [query, setQuery] = useQueryState("query");

  React.useEffect(() => {
    setShowClear(Boolean(query));
  }, [query]);

  return (
    <TextField
      // See: https://stackoverflow.com/questions/40132775/autofocus-textfield-using-react-material-ui
      // On why we use inputRef instead of autoFocus
      inputRef={(input) => input && setTimeout(input?.focus(), 100)}
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
