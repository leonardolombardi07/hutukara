"use client";

import React from "react";
import MUITabs from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import { useLayoutContext } from "../LayoutProvider";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function Tabs() {
  const [item] = useLayoutContext();
  const selectedSegment = useSelectedLayoutSegment() || "";
  const params = useParams();

  const totalNumberOfMembers = item.hostIds.length + item.memberIds.length + 1; // +1 for the owner

  return (
    <MUITabs
      value={selectedSegment}
      sx={{
        "& .MuiTab-root": {
          pr: 2.5, // Make tabs wider to see the badge
          pt: 2.5,
        },
      }}
    >
      <LinkTab
        path={String(params.id)}
        value={"summary"}
        segment={"summary"}
        label="Summary"
      />

      <LinkTab
        path={String(params.id)}
        value={"members"}
        segment={"members"}
        label={
          <Badge
            badgeContent={totalNumberOfMembers}
            max={9} // Otherwise the badge will be too wide
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                // Avoid overlapping the tab label
                right: -8,
                top: -8,
              },
            }}
          >
            Members
          </Badge>
        }
      />
    </MUITabs>
  );
}

interface LinkTabProps extends TabProps {
  path: string;
  segment: string;
  value: string;
}

function LinkTab({ path, segment, ...props }: LinkTabProps) {
  const href = segment ? `${segment}` : path;
  return <Tab component={Link} href={href} replace {...props} />;
}
