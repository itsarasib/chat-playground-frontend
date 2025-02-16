"use client";
import { LoginModel, LoginSchema } from "@/schema/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import axiosInstance from "@/hooks/axios";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const LoginPage = () => {
  const form = useForm<LoginModel>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const conversationId = uuidv4();

  const onSubmit = async (data: LoginModel) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", data);
      console.log(response);
      const result = response.data;
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("refresh_token", result.refresh_token);
      console.log(data);
      toast({
        title: "Login success",
        description: "You have successfully logged in",
      });
      router.push(`/dashboard/${conversationId}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: "Please check your email and password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl h-[100vh] flex items-center justify-center">
      <Card className="w-full rounded-xl">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="john.doe@example.com"
                        // type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4"
              >
                submit
              </Button>
              <p className="text-right mt-2">
                dont have an account?
                <Link href="/signup" className="text-blue-500">
                  {" "}
                  signup{" "}
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
