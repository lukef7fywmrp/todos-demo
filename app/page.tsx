import Form from "@/components/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/db/db";

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold capitalize">Todos page</h1>

      <Form />

      <div className="mt-24 flex flex-col w-full gap-5">
        <h2 className="font-bold text-xl">A list of your recent todos.</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Is Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.item}</TableCell>
                <TableCell>Yes</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
