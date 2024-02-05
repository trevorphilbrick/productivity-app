"use client";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { ReactElement, JSXElementConstructor } from "react";
import { addTask } from "@/lib/data";
import { TaskContext } from "@/app/home/page";
import { useContext } from "react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["Pending", "In Progress", "Completed"]),
});

function AddTaskForm() {
  const { setTasks } = useContext(TaskContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      status: "Pending",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTask(values).then((res) => {
      setTasks(res.tasks.rows);
      form.reset();
    });
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Add A Task</SheetTitle>
        <SheetDescription>
          Fill out the form below to add a new task.
        </SheetDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="title"
              render={({
                field,
              }: {
                field: ControllerRenderProps<FieldValues, "title">;
              }): ReactElement<any, string | JSXElementConstructor<any>> => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="description"
              render={({
                field,
              }: {
                field: ControllerRenderProps<FieldValues, "description">;
              }): ReactElement<any, string | JSXElementConstructor<any>> => {
                return (
                  <FormItem className="mt-3">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="priority"
              render={({
                field,
              }: {
                field: ControllerRenderProps<FieldValues, "priority">;
              }): ReactElement<any, string | JSXElementConstructor<any>> => {
                return (
                  <FormItem className="mt-3">
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Set priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Priority</SelectLabel>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="mt-5">
              Save
            </Button>
          </form>
        </Form>
      </SheetHeader>
    </SheetContent>
  );
}

export default AddTaskForm;
