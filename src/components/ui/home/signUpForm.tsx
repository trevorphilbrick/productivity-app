"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

export const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
});

export default function SignUpForm({ signup }: any) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await signup(data);
    } catch (error: any) {
      throw Error(error);
    }
  };
  return (
    <Card className="p-4 w-80  md:w-2/3 max-w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
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
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          <p className="text-sm">
            Already have an account? Click{" "}
            <Link href="/signin" className="font-bold ">
              Here
            </Link>{" "}
            to sign in!
          </p>
        </form>
      </Form>
    </Card>
  );
}
