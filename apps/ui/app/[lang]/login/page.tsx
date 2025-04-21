"use client";

import { ArrowRight } from "@/app/[lang]/assets/icons/arrow-right";
import { Button } from "@/app/[lang]/components/button";
import { TextField } from "@/app/[lang]/components/inputs/text-field";
import { globalConfig } from "@/shared/configs/global";
import { useDictionary, useSignIn } from "@/shared/hooks";
import { E_AppRoutes, type PageProps, type T_LoginForm } from "@/shared/models";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { emailRule, localeUrl, requiredRule } from "@/shared/utils";

type Props = PageProps<{ _: string }, { _: string }>;

export default async function LoginPage({ params }: Props) {
	const { lang } = await params;
	const { signIn } = useSignIn(lang);
	const dictionary = useDictionary();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<T_LoginForm>();
	const onSubmit = (data: T_LoginForm) => {
		signIn(data);
	};
	return (
		<div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center sm:py-12">
			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
				<h1 className="font-bold text-center text-2xl mb-5">
					{globalConfig.shopLabel}
				</h1>
				<div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
					<form onSubmit={handleSubmit(onSubmit)} className="px-5 py-7">
						<p className="font-semibold text-sm text-gray-600 pb-1 block">
							{dictionary.auth.email}
						</p>
						<TextField
							{...register("email", { ...requiredRule, ...emailRule })}
							error={errors.email?.message}
							variant={errors.email ? "error" : "bordered"}
							placeholder={dictionary.auth.email}
							className="w-full"
						/>
						<p className="font-semibold text-sm text-gray-600 pb-1 block mt-4">
							{dictionary.auth.password}
						</p>
						<TextField
							{...register("password", { ...requiredRule })}
							error={errors.password?.message}
							variant={errors.password ? "error" : "bordered"}
							placeholder={dictionary.auth.password}
							type="password"
							className="w-full"
						/>
						<br />
						<br />
						<LoginButton label={dictionary.auth.login} />
						<Link href={localeUrl(E_AppRoutes.register, lang)}>
							<Button className="mt-4 w-full" variant="bordered">
								{dictionary.auth.register}
							</Button>
						</Link>
					</form>
					<div className="py-5">
						{/* <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right  whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-bottom	"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div> */}
					</div>
				</div>
				<div className="py-5">
					<div className="grid grid-cols-2 gap-1">
						<div className="text-center sm:text-left whitespace-nowrap">
							<Link href={localeUrl(E_AppRoutes.home, lang)}>
								<button
									type="button"
									className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-4 h-4 inline-block align-text-top"
									>
										<title>home</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M10 19l-7-7m0 0l7-7m-7 7h18"
										/>
									</svg>
									<span className="inline-block ml-1">
										{dictionary.auth.main_page}
									</span>
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function LoginButton({ label }: { label: string }) {
	// const { pending, data } = useFormStatus();

	// useEffect(() => {
	//   if (data) {
	//     console.log(data);
	//   }
	// }, [data]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		// if (pending) {
		event.preventDefault();
		// }
	};

	return (
		<Button className="w-full" type="submit">
			<span className="inline-block mr-2">{label}</span>
			<ArrowRight variant="white" />
		</Button>
	);
}
