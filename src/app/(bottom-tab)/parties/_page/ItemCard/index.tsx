import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GroupsIcon from "@mui/icons-material/Groups";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  members: any[];
  hosts: any[];
}

export default function ItemCard(props: ItemCardProps) {
  const { id, title, description, createdAt, members, hosts } = props;
  return (
    <Card variant="outlined">
      <CardActionArea LinkComponent={Link} href={`?id=${id}`}>
        <CardHeader title={title} subheader={<CardSubheader {...props} />} />
      </CardActionArea>
    </Card>
  );
}

function CardSubheader({ createdAt, members, hosts }: ItemCardProps) {
  const totalNumberOfMembers = members.length + hosts.length;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mr: "4px" }}>{totalNumberOfMembers}</Typography>
      <GroupsIcon />

      <Dot />

      <Typography
        sx={{
          ...containText({ lines: 1 }),
        }}
      >
        {humanReadableDate(createdAt)}
      </Typography>
    </Box>
  );
}

function Dot() {
  return (
    <Box component="span" sx={{ display: "inline-block", mx: 1 }}>
      •
    </Box>
  );
}

function containText({ lines }: { lines: number }) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

function humanReadableDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInMinutes = diff / 1000 / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInWeeks = diffInDays / 7;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInDays / 365;

  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} minutes ago`;
  }

  if (diffInHours < 24) {
    return `${Math.round(diffInHours)} hours ago`;
  }

  if (diffInDays < 7) {
    return `${Math.round(diffInDays)} days ago`;
  }

  if (diffInWeeks < 4) {
    return `${Math.round(diffInWeeks)} weeks ago`;
  }

  if (diffInMonths < 12) {
    return `${Math.round(diffInMonths)} months ago`;
  }

  return `${Math.round(diffInYears)} years ago`;
}
