import { APP_NAME } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";

const IMAGE_DIMENSIONS = {
  width: 700,
  height: 440,
};

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export default function Logo({ size = "medium" }: LogoProps) {
  return (
    <Link
      href={`/`}
      style={{
        display: "block",
        position: "relative",
        ...getDimensions(size),
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <Image
        src={"/images/Logo/Logo.jpg"}
        alt={`${APP_NAME} Logo`}
        fill={true}
        style={{
          objectFit: "contain",
        }}
      />
    </Link>
  );
}

function getDimensions(size: "small" | "medium" | "large") {
  switch (size) {
    case "small":
      return {
        width: IMAGE_DIMENSIONS.width / 10,
        height: IMAGE_DIMENSIONS.height / 10,
      };

    case "medium":
      return {
        width: IMAGE_DIMENSIONS.width / 6,
        height: IMAGE_DIMENSIONS.height / 6,
      };

    case "large":
      return {
        width: IMAGE_DIMENSIONS.width / 4,
        height: IMAGE_DIMENSIONS.height / 4,
      };
  }
}
