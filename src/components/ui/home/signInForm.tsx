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
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
});

function SignInForm({ login }: { login: (data: any) => Promise<any> }) {
  const [isLoading, setIsLoading] = useState(false);
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
      await login(data);
      setIsLoading(false);
      return;
    } catch (error: any) {
      setIsLoading(false);
      throw Error(error);
    }
  };
  return (
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
          <p className="text-sm">
            Don&apos;t have an account? Click{" "}
            <Link href="/signup" className="font-bold ">
              Here
            </Link>{" "}
            to sign up!
          </p>
        </form>
      </Form>
    </Card>
  );
}

export default SignInForm;
