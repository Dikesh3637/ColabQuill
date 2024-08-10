"use client";

import { useAppStore } from "@/store/store";
import { SignInForm } from "./sigin-form";
import { SignUpForm } from "./signup-form";

export default function SignupSigninComponent() {
	const formType = useAppStore((state) => state.formType);

	return (
		<div className="h-max w-[25vw]  shadow-2xl rounded-xl p-5">
			{formType === "signup" ? <SignUpForm /> : <SignInForm />}
		</div>
	);
}
