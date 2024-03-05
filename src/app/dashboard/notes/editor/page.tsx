"use client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { addNote, fetchNote, updateNote } from "@/lib/data";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  body: z.string().min(2),
  user_id: z.string(),
});

function Page() {
  const params = useSearchParams();
  const noteId = params.get("id");
  const { data: session } = useSession();
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      user_id: session?.user?.name || "",
    },
  });
  useEffect(() => {
    const handleFetchNote = async () => {
      // if there is a note id, fetch the note and set the form values
      if (noteId) {
        setIsLoading(true);
        try {
          const {
            note: { rows },
          } = await fetchNote(parseInt(noteId));

          if (rows.length === 0) {
            return;
          }

          setIsEditing(true);

          form.setValue("title", rows[0].notetitle);
          form.setValue("body", rows[0].notebody);
          setIsLoading(false);
        } catch (error: any) {
          throw Error("Error fetching note", error);
        }
      }
    };

    handleFetchNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPosting(true);
    if (isEditing && noteId) {
      const res = await updateNote(values.title, values.body, parseInt(noteId));

      if (res.status === 200) {
        form.reset();
      }

      setIsPosting(false);
    } else {
      const res = await addNote(values.title, values.body);

      if (res.status === 200) {
        form.reset();
      }

      setIsPosting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-4">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <Textarea className="min-h-80" {...field} placeholder="Body" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Link href="/dashboard/notes">
            <Button variant="ghost" className="mr-2">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isPosting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Page;
