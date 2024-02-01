import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GroupsIcon from "@mui/icons-material/Groups";

interface ItemCardProps {
  id: string;
  name: string;
  createdAt: number;
  totalNumberOfMembers: number;
}

export default function ItemCard(props: ItemCardProps) {
  const { id, name } = props;
  return (
    <Card variant="outlined">
      <CardActionArea LinkComponent={Link} href={`/${id}`}>
        <CardHeader title={name} subheader={<CardSubheader {...props} />} />
      </CardActionArea>
    </Card>
  );
}

function CardSubheader({ createdAt, totalNumberOfMembers }: ItemCardProps) {
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

function humanReadableDate(timestamp: number) {
  const date = new Date(timestamp);

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInMinutes = diff / 1000 / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInWeeks = diffInDays / 7;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInDays / 365;

  if (diffInMinutes < 60) {
    return getWithCorrectPluralForm(diffInMinutes, "minute");
  }

  if (diffInHours < 24) {
    return getWithCorrectPluralForm(diffInHours, "hour");
  }

  if (diffInDays < 7) {
    return getWithCorrectPluralForm(diffInDays, "day");
  }

  if (diffInWeeks < 4) {
    return getWithCorrectPluralForm(diffInWeeks, "week");
  }

  if (diffInMonths < 12) {
    return getWithCorrectPluralForm(diffInMonths, "month");
  }

  return getWithCorrectPluralForm(diffInYears, "year");

  function getWithCorrectPluralForm(diff: number, word: string) {
    const roundedDiff = Math.round(diff);
    const isPlural = roundedDiff === 0 || roundedDiff > 1;
    const pluralizedWord = isPlural ? `${word}s` : word;
    return `${roundedDiff} ${pluralizedWord} ago`;
  }
}
