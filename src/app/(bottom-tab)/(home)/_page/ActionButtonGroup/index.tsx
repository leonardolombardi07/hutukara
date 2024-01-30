"use client";

import React from "react";
import ImageButton from "./ImageButton";
import { useRouter } from "next/navigation";

export default function ActionButtonGroup() {
  const router = useRouter();

  return (
    <React.Fragment>
      <ImageButton
        title="Join a Party"
        width="50%"
        onClick={() => router.push("/join")}
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <ImageButton
        title="Host a Party"
        width="50%"
        onClick={() => router.push("/host")}
        src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </React.Fragment>
  );
}
