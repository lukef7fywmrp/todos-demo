"use server";

import { TodoSchema } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { prisma } from "@/db/db";

// Adding todo to the db + server side validation
export const addTodo = async (newTodo: unknown) => {
  const result = TodoSchema.safeParse(newTodo);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  await prisma.todo.create({
    data: result.data,
  });

  revalidatePath("/");
};
