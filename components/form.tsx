"use client";

import { addTodo } from "@/actions/addTodo";
import { TodoSchema } from "@/lib/types";
import SubmitBtn from "./submit-btn";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

export default function Form() {
  const { toast } = useToast();

  // client side validation
  const clientAction = async (formData: FormData) => {
    const newTodo = {
      item: formData.get("item"),
    };

    const result = TodoSchema.safeParse(newTodo);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    const res = await addTodo(result.data);

    if (res?.error) {
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      });
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-2 w-full mt-12">
      <Input name="item" className="" placeholder="Add your todo..." required />
      <SubmitBtn />
    </form>
  );
}
