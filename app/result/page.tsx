'use client'

import { Dispatch } from "react";
import { useState, useEffect } from "react";

export default function Result({ option, value, setValue, setResultModal} : {
	option: string,
	value: string,
	setValue: Dispatch<any>,
	setResultModal: Dispatch<any>,
}) {

	// const [ready, setReady] = useState(false);

	useEffect(() => {
		console.log("value:", value)
		const func = async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/${option === "userId" ? "user" : "address"}/${value}`);
			setValue("");
			// setReady(true);
		}
		func();
	}, [])
	return (

		<div>Hello world</div>
	)
}