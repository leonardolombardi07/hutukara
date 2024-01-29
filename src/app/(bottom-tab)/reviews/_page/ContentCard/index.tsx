import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ContentRating from "../ContentRating";
import CardActionArea from "@mui/material/CardActionArea";

interface ContentCardProps {
  title: string;
  bannerImg: string;
}

export default function ContentCard({ title, bannerImg }: ContentCardProps) {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia sx={{ height: 120 }} image={bannerImg} />

        <CardContent
          sx={{
            px: 1.5,
            pt: 2,
            pb: 0,
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ pb: 2, mt: -0.5 }}>
        <ContentRating size="small" />
      </CardActions>
    </Card>
  );
}
