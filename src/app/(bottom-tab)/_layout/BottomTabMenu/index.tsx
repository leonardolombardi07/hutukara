"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StarRateIcon from "@mui/icons-material/StarRate";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { usePathname } from "next/navigation";
import PopcornIcon from "@/components/icons/PopcornIcon";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";

const PATHNAME = {
  PARTIES: "parties",
  PROFILE: "profile",
  REVIEWS: "reviews",
} as const;

export default function BottomTabMenu({
  sx,
}: {
  sx?: React.ComponentProps<typeof Paper>["sx"];
}) {
  const pathname = usePathname();

  const value = pathname.includes(PATHNAME.REVIEWS)
    ? PATHNAME.REVIEWS
    : pathname.includes(PATHNAME.PROFILE)
    ? PATHNAME.PROFILE
    : PATHNAME.PARTIES;

  return (
    <Paper sx={sx}>
      <Divider />
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction
          label="Parties"
          icon={<PopcornIcon />}
          LinkComponent={Link}
          href="/parties"
          value={PATHNAME.PARTIES}
        />

        <BottomNavigationAction
          label="Reviews"
          icon={<StarRateIcon />}
          LinkComponent={Link}
          href="/reviews"
          value={PATHNAME.REVIEWS}
        />

        <BottomNavigationAction
          label="Profile"
          icon={<ProfileIcon />}
          LinkComponent={Link}
          href="/profile"
          value={PATHNAME.PROFILE}
        />
      </BottomNavigation>
    </Paper>
  );
}
