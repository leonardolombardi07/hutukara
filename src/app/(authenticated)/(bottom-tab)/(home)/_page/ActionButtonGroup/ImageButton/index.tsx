import * as React from "react";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Image from "next/image";

interface ImageButtonProps {
  src: string;
  title: string;
  width: string;
  onClick: () => void;
}

export default function ImageButton({
  src,
  title,
  width,
  onClick,
}: ImageButtonProps) {
  return (
    <ButtonBase
      focusRipple
      sx={{
        width: {
          xs: "100%",
          sm: width,
        },
        height: {
          xs: 100,
          sm: 200,
        },
        "&:hover, &.Mui-focusVisible": {
          zIndex: 1,
          "& .MuiImageBackdrop-root": {
            opacity: 0.15,
          },
          "& .MuiImageMarked-root": {
            opacity: 0,
          },
          "& .MuiTypography-root": {
            border: "4px solid currentColor",
          },
        },
      }}
      onClick={onClick}
    >
      <ImageSrc
        src={src}
        alt={title}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 960px) 33vw, 200px"
      />

      <ImageBackdrop className="MuiImageBackdrop-root" />

      <ImageContainer>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          sx={{
            position: "relative",
            p: 4,
            pt: 2,
            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          }}
        >
          {title}
          <ImageMarked className="MuiImageMarked-root" />
        </Typography>
      </ImageContainer>
    </ButtonBase>
  );
}

const ImageSrc = styled(Image)(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  objectFit: "cover",

  [theme.breakpoints.down("sm")]: {
    objectPosition: "center 30%",
  },

  objectPosition: "center 40%",
}));

const ImageContainer = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));
