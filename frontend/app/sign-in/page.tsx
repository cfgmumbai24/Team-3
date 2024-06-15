"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { graphQLClient } from "@/clients/api";


export const signInSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});


const Page = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const token : string = await graphQLClient.request(
            `
                query Query($email: String!, $password: String!) {
                    getUserToken(email: $email, password: $password)
                }
            `,
            { email: data.email as string, password: data.password as string},
        );

        if(token) {
            window.localStorage.setItem('token', token as string);
            router.push('/clusterAdmin')
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                JPMMSS
            </h1>
            <p className="mb-4 font-semibold">
                Sign In to Start your anonymous adventure
            </p>
            </div>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button type="submit">Sign In</Button>
            </form>
            </Form>

            <div className="text-center mt-4">
            <p className="font-bold">
                Already a Member?{" "}
                <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                Sign In
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
};

export default Page;
function useToast(): { toast: any; } {
    throw new Error("Function not implemented.");
}

