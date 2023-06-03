'use client'

import Image from "next/image"




export default function Main() {

	

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
			<input className="hidden tablet:block text-center main z-10 w-[800px] py-[25px] px-4 text-3xl outline-none border-2 border-white" placeholder="0x012ab32wazabyo90fcd..."></input>
		</div>
	)
}