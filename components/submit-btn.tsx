"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="disabled:cursor-not-allowed"
    >
      {pending ? "Adding..." : "Add Todo"}
    </Button>
  );
}
