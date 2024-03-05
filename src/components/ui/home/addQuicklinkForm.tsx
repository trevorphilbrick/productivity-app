"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { addQuicklink } from "@/lib/data";
import { QuicklinkContext } from "@/context/quicklinksContext";
import { useContext, useState } from "react";

const formSchema = z.object({
  linkTitle: z.string().min(2).max(255),
  linkUrl: z.string().min(2).max(1000),
});

function AddQuicklinkForm() {
  const { setQuicklinks } = useContext(QuicklinkContext);
  const [isActive, setIsActive] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkTitle: "",
      linkUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsActive(false);
    await addQuicklink(values).then((data) => {
      setQuicklinks(data.quicklinks.rows);
      setIsActive(true);
    });
    form.reset();
  };

  return (
    <SheetContent className="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle>Add A Link</SheetTitle>
        <SheetDescription>
          Fill out the form below to add a quicklink
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="linkTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="linkUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="url" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={!isActive} type="submit" className="mt-5">
            Save
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
}

export default AddQuicklinkForm;
