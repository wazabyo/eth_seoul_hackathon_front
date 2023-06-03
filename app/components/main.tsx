'use client'

import Image from "next/image"
import { useState } from "react";
import Link from "next/link";


export default function Main() {
	const [value, setValue] = useState("");

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
				document.getElementById("resultLink")?.click();
			}}>
				<Link id="resultLink" href={{
					pathname: '/result',
					query: { value: value },
				}}></Link>
				<input id="input" value={value} onChange={(e) => setValue(e.target.value)} className=" text-center main w-[800px] py-[25px] px-4 text-3xl outline-none border-2 border-white" placeholder="enter ETH address : 0x00..."></input>
			</form>
		</div>
	)
}
