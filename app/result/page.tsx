'use client'

import Nav from "../components/nav";
import $ from "jquery"
import { useEffect, useState } from "react";
import Image from "next/image";

function getTransformValue(v1: any, v2: any, value: any): number{
  return parseFloat((((v1/v2*value-value/2)*1).toFixed(1)));
}

export default function Result({
	searchParams,
}: {
	searchParams: {
		option: string,
		value: string,
	}
}) {
	const { option, value } = searchParams;
	const [ready, setReady] = useState(false);
	const [result, setResult] = useState<any>(null);

	useEffect(() => {
		console.log("value:", value)
		const func = async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/${option === "userId" ? "user" : "address"}/${value}`);
			setReady(true);
			console.log(res.body);
			setResult(res);
		}
		func();
		document.addEventListener('mousemove', function(event){
			let card_x = getTransformValue(event.clientX,window.innerWidth,56);
			let card_y = getTransformValue(event.clientY,window.innerHeight,56);
			let shadow_x = getTransformValue(event.clientX,window.innerWidth,20);
			let shadow_y = getTransformValue(event.clientY,window.innerHeight,20);
			let text_shadow_x = getTransformValue(event.clientX,window.innerWidth,28);
			let text_shadow_y = getTransformValue(event.clientY,window.innerHeight,28);
			$(".floating").css("transform","rotateX("+card_y/1+"deg) rotateY("+card_x+"deg)");
			$(".floating").css("box-shadow",-card_x+"px "+card_y/1+"px 55px rgba(0, 0, 0, .55)");
			$(".svg").css("filter","drop-shadow("+-shadow_x+"px "+shadow_y/1+"px 4px rgba(0, 0, 0, .6))");
			$(".text").css("text-shadow",-text_shadow_x+"px "+text_shadow_y/1+"px 6px rgba(0, 0, 0, .8)");
		});
	}, [])
	return (
		<>
			<Nav />
			{
				ready && result ?
					<>
						{/* <div className="relative w-full h-screen flex justify-center items-center">
							<div className="w-full h-full bg-black opacity-80 absolute top-0 left-0 z-10"></div>
							<Image
								width={700}
								height={700}
								src="/card.png"
								alt="Image of Card"
								className="z-50 shadow-2xl shadow-violet-900 rounded-[29px]"
							/>
						</div> */}
						<Card option={option} value={value} result={result}/>
					</> : <div className="w-full h-screen flex justify-center items-center"></div>
			}
		</>
	)
}



function Card({ option, value, result }: {
	option: string,
	value: string,
	result: boolean,
}) {
	return (
		<div className="floating">
			<div className="thickness"></div>
			<div className="thickness"></div>
			<div className="thickness"></div>
			<div className="card_body">
				{/* <div className="paypal_center svg"></div> */}
				{/* <div className="logo svg"></div> */}
				<div className="paywave svg"></div>
				<div className="chips svg"></div>
				<div className="card_no text main h-[3rem] whitespace-normal line-clamp-2">
					{result ? value : "You're not Identified"}
				</div>
				<div className="holder text text-yellow-400 main">verified by PoPwallet</div>
				{/* <div className="mastercard_icon svg"></div> */}

			</div>

		</div>
	)
}