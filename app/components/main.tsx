'use client'

import Image from "next/image"
import { Dispatch, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function Main() {
	const [value, setValue] = useState("");
	const [resultModal, setResultModal] = useState(false);
	const [option, setOption] = useState("userId");
	const router = useRouter();

	return (
		<div className='relative w-full w-min-[300px] h-screen flex flex-col justify-center items-center font-helvetica'>
			<Image
				width={700}
				height={700}
				src="/giant-logo.png"
				alt="Image of Logo"
				style={{
					aspectRatio: "1/1",
					objectFit: "cover"
				}}
				className="absolute opacity-100"
			/>
			<div className="w-full h-full bg-black opacity-80 absolute top-0 left-0"></div>
			<div className="mb-4 main font-bold text-4xl phone:text-5xl relative z-10] text-white font-pyengchang tablet:text-9xl">1 Personhood ,<br></br>1 Wallet</div>
			<form action="" className="relative z-10 hidden tablet:flex tablet:items-center" onSubmit={async (e: any) => {
				e.preventDefault();
				setResultModal(true);
				document.getElementById("resultLink")?.click();
			}}>
				<Link id="resultLink" href={{
					pathname: '/result',
					query: { option: option, value: value },
				}}></Link>
				<select className="absolute left-5" name="" id="searchOption" value={option} onChange={(e) => setOption(e.target.value)}>
					<option value="userId">World Id</option>
					<option value="walletAddress">Wallet Address</option>
				</select>
				<input id="input" value={value} onChange={(e) => setValue(e.target.value)} className=" text-center main w-[800px] py-[25px] px-4 text-3xl outline-none border-2 border-white" placeholder="0x012ab32wazabyo90fcd..."></input>
			</form>
		</div>
	)
}

function ResultComponent({ option, value, setValue, setResultModal }: {
	option: string,
	value: string,
	setValue: Dispatch<any>,
	setResultModal: Dispatch<any>,
}) {

	const [ready, setReady] = useState(false);

	useEffect(() => {
		console.log("value:", value)
		const func = async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/${option === "userId" ? "user" : "address"}/${value}`);
			setValue("");
			setReady(true);
		}
		func();
	}, [])

	return (
		<div className="absolute z-20 w-[500px] h-[500px] bg-red-400">
			{
				ready ?
					<div>
						Finish
					</div> :
					<div>
						loading
					</div>
			}
		</div>
	)
}