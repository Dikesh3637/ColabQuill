import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpUser } from "@/lib/queries";
import { useAppStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignUpFormSchema } from "@repo/typing/user";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignUpForm = () => {
	const setFormType = useAppStore((state) => state.setFormType);
	const form = useForm<z.infer<typeof UserSignUpFormSchema>>({
		resolver: zodResolver(UserSignUpFormSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const { mutate } = useMutation({
		mutationFn: signUpUser,
		onSuccess: (data) => {},
		onError: (error: number) => {
			if (error === 409) {
			}
		},
	});

	const onSubmitHandler = (data: z.infer<typeof UserSignUpFormSchema>) => {
		mutate(data);
	};

	const onClickHandler = () => {
		setFormType("signin");
	};

	return (
		<>
			<h1 className="text-4xl font-semibold">Signup -</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmitHandler)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
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
							Sign up
						</Button>
						<Button variant={"link"} onClick={onClickHandler}>
							Already have an account ? sign-in here.
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
