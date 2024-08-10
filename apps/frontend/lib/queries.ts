import { UserSignUpFormSchema } from "@repo/typing/user";
import axios from "axios";
import { z } from "zod";
import { CustomError } from "./custom-error";

export const signUpUser = async (
	data: z.infer<typeof UserSignUpFormSchema>
) => {
	try {
		const response = await axios.post(
			"http://localhost:8787/api/v1/user/signup",
			data,
			{
				withCredentials: true,
			}
		);
		if (response.status === 200) {
			return response;
		} else {
			console.log(response.data);
			throw new CustomError("signup failed", response.status);
		}
	} catch (error) {
		if (error instanceof CustomError) {
			return error.statusCode;
		}
	}
};
