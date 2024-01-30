"use client";

import React from "react";
import { Item } from "../../types";
import MUITabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Summary from "../Summary";
import Members from "../Members";
import Badge from "@mui/material/Badge";

const LAST_TAB_TEXT = "Members";

export default function Tabs({ item }: { item: Item }) {
  const [value, setValue] = React.useState(0);

  function onChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

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
              badgeContent={item.members.length + 1}
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

      {value === 0 && <Summary data={item.results} />}
      {value === 1 && <Members data={[...item.members, item.host]} />}
    </React.Fragment>
  );
}
