"use client";

import React from "react";
import { Item } from "../../types";
import MUITabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Summary from "../Summary";
import Members from "../Members";
import Badge from "@mui/material/Badge";
import { useGroup } from "@/modules/api/client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const LAST_TAB_TEXT = "Members";

export default function Tabs({ id }: { id: string }) {
  const [item, isLoading, error] = useGroup(id);

  const [value, setValue] = React.useState(0);

  function onChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  if (isLoading) {
    // TODO: add skeleton loader
    return null;
  }

  if (error || !item) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error ? error.message : "No data found"}
      </Alert>
    );
  }

  const totalNumberOfMembers = item.hostIds.length + item.memberIds.length + 1; // +1 for the owner

  return (
    <React.Fragment>
      <MUITabs
        value={value}
        onChange={onChange}
        sx={{
          "& .MuiTab-root": {
            pr: 2.5, // Make tabs wider to see the badge
            pt: 2.5,
          },
        }}
      >
        <Tab value={0} label="Summary" />

        <Tab
          value={1}
          label={
            <Badge
              badgeContent={totalNumberOfMembers}
              max={5}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  // Avoid overlapping the tab label
                  right: -8,
                  top: -8,
                },
              }}
            >
              {LAST_TAB_TEXT}
            </Badge>
          }
        />
      </MUITabs>

      {value === 0 && <Summary id={id} />}
      {value === 1 && <Members id={id} />}
    </React.Fragment>
  );
}
