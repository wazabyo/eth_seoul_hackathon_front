import Link from "next/link"

export default function Nav() {
	return (
		<nav className="fixed top-0 w-full p-4 flex justify-between font-helvetica bg-black text-white z-10 items-center">
			<a href="/" className="relative tracking-widest text-xl">popwallet</a>
			<ul className="flex gap-x-8">
				<li className="hover:opacity-70 duration-300"><Link href="/api">API</Link></li>
				<li className="hover:opacity-70 duration-300"><a className="after:content-['_↗']" href="https://worldcoin.org/" target="_blank">World Coin</a></li>
			</ul>
		</nav>
	)
}