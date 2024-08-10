"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignInFormSchema, UserSignInType } from "@repo/typing/user";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignInForm = () => {
	const form = useForm<z.infer<typeof UserSignInFormSchema>>({
		resolver: zodResolver(UserSignInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const setFormType = useAppStore((state) => state.setFormType);

	const onSubmitHandler = (data: UserSignInType) => {};

	const onClickHandler = () => {
		setFormType("signup");
	};

	return (
		<>
			<h1 className="text-4xl font-semibold">Sign In</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmitHandler)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
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
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<Button
							className="rounded-full border-black"
							type="submit"
							variant={"default"}
						>
							Sign in
						</Button>
						<Button variant={"link"} onClick={onClickHandler}>
							Don't have an account? Sign up here.
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
