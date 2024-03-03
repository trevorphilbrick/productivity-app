"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchUser } from "@/lib/data";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
});

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await fetchUser(data.username, data.password);
      setIsLoading(false);
      if (res) {
        console.log("User is authenticated");
        router.push("/dashboard");
      }
      return;
    } catch (error: any) {
      setIsLoading(false);
      throw Error(error);
    }
  };

  return (
    <div className="flex  justify-center mt-12">
      <Card className="p-4 w-80  md:w-2/3 max-w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default Page;