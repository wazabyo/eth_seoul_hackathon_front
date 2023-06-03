import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Dispatch, useEffect, useState } from 'react';
const IDKitWidget = dynamic(() => import('@worldcoin/idkit').then(mod => mod.IDKitWidget), { ssr: false });

async function getAccount(setMetaAccount: Dispatch<any>) {
	const showAccount = document.querySelector('#showAccount');

	// @ts-ignore
	const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		.catch((err: any) => {
			if (err.code === 4001) {
				// EIP-1193 userRejectedRequest error
				// If this happens, the user rejected the connection request.
				console.log('Please connect to MetaMask.');
			} else {
				console.error(err);
			}
		});
	const account = accounts[0];
	if (!showAccount) {
		return;
	}

	setMetaAccount(account);
}

export default function Nav() {

	const [result, setResult] = useState<any>(null);
	const [metaAccount, setMetaAccount] = useState<any>(null);

	useEffect(() => {
		const fetchWallet = async () => {

			//@ts-ignore
			const res = await window.ethereum.request({ method: 'eth_accounts' })
				.catch((err: any) => {
					console.error(err);
				});
		}
		fetchWallet();
	}, []);

	return (
		<nav className="fixed top-0 w-full p-4 flex justify-between bg-black text-white z-10 items-centerr">
			<a href="/" className="main relative flex gap-x-2 items-center tracking-[0.15rem] text-2xl font-semibold">
				<span>
					<Image
						width={50}
						height={50}
						src="/logo.png"
						alt="Image of Logo"
					/>
				</span>
				PoPwallet
			</a>
			<ul className="flex gap-x-4">
				{
					(result && metaAccount) ? <li className='flex justify-center items-center '><button className=' font-helvetica border-2 border-[#1d0038] bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 rounded-full font-semibold hover:opacity-90 duration-300'>&nbsp;Proof of Personhood ✨</button></li> :
					<>
						<li className='flex justify-center items-center'>
							<IDKitWidget
								action="my_signal"
								onSuccess={res => { setResult(res) }}
								app_id="app_staging_509950d904054e1913c7076105cc1792" // obtain this from developer.worldcoin.org
							>
								{({ open }) => <button type='button' className={`${result ? "cursor-not-allowed bg-black border-4 border-white text-white" : "bg-white text-black"} w-[190px] min-w-[190px] border-4 truncate whitespace-nowrap font-semibold	 rounded-full px-4 py-2`} onClick={open}>{result ? result.nullifier_hash : `Connect WorldApp`}</button>}
							</IDKitWidget>
						</li>
						<li className='flex justift-center items-center'>
							<button id="showAccount" className={` font-semibold ${metaAccount ? "cursor-not-allowed bg-black border-4 border-white text-white" : "bg-white text-black"} w-[190px] min-w-[190px] border-4 truncate whitespace-nowrap rounded-full px-3 py-2`} onClick={() => getAccount(setMetaAccount)}> {metaAccount ? metaAccount : `Connect Metamask`} </button>
						</li> 
					</>
				}

				<li className="hover:opacity-70 duration-300 flex justify-center items-center">
					<a className="" href="/api">
						<Image
							width={20}
							height={20}
							src="/github.png"
							alt="Github Icon"
						/>
					</a>
				</li>
				<li className="hover:opacity-70 duration-300 flex justify-center items-center"><a className="" href="https://worldcoin.org/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
					<path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
				</svg>
				</a></li>
			</ul>
		</nav>
	)
}