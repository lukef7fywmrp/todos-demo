import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number().optional(),
  item: z
    .string()
    .trim()
    .min(1, {
      message: "Todo item must be at least 1 character long",
    })
    .max(100, {
      message: "Todo item must be less than 100 characters long",
    }),
});

export type Todo = z.infer<typeof TodoSchema>;
