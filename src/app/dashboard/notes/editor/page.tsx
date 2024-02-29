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
import { addNote, fetchNote } from "@/lib/data";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FetchedNote, Note } from "@/lib/types";
import { parse } from "path";

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
      if (noteId) {
        setIsLoading(true);
        try {
          const {
            note: { rows },
          } = await fetchNote(session?.user?.name || "", parseInt(noteId));
          console.log(rows);
          form.setValue("title", rows[0].notetitle);
          form.setValue("body", rows[0].notebody);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching note", error);
        }
      }
    };

    handleFetchNote();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPosting(true);

    const res = await addNote(values.title, values.body, values.user_id);

    if (res.status === 200) {
      form.reset();
    }

    setIsPosting(false);
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
