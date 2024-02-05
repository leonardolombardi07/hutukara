"use client";

import React from "react";
import EditableField from "@/components/inputs/EditableField";
import { updateUser } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";

export default function EditableName({ name }: { name: string | undefined }) {
  const { user } = useUser();
  const [value, setValue] = React.useState(name);
  return (
    <EditableField
      value={name || ""}
      onFinishEditing={() => {
        if (!value || value === name) {
          return;
        }
        updateUser(user.uid, { name: value });
      }}
      typographyProps={{
        variant: "h5",
      }}
      textFieldProps={{
        value,
        onChange: (event) => {
          setValue(event.target.value);
        },
      }}
    />
  );
}
