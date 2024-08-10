import SignupSigninComponent from "@/components/signup-signin-component";
import { Platypi } from "next/font/google";

const platypi = Platypi({ subsets: ["latin"] });
export default function Home() {
	return (
		<div className="flex">
			<div className="flex w-[50vw] h-[100vh] justify-center items-center shadow-2xl">
				<div className="flex flex-col gap-2">
					<h1 className="text-6xl font-[700]">
						Colab<span className={platypi.className}>Quill</span>
					</h1>
					<p>This a simple collaborative rich text editor</p>
				</div>
			</div>
			<div className="w-[50vw]">
				<div className="w-[100%] h-[100vh] flex justify-center items-center">
					<SignupSigninComponent />
				</div>
			</div>
		</div>
	);
}
