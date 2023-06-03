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
		setMetaAccount(null);
		return;
	}

	setMetaAccount(account);
}

export default function Nav() {

	const [result, setResult] = useState<any>(null);
	const [metaAccount, setMetaAccount] = useState<any>(null);
	const [hover, setHover] = useState(false);
	const [worldHover, setWorldHover] = useState(false);
	const [final, setFinal] = useState(false);
	const [confirm, setConfirm] = useState(false);

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
		<>
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
				<ul className="hidden phone:flex gap-x-4">
					{
						(!result && !metaAccount) ? <li className='flex justify-center items-center '><button onClick={() => { console.log(final); setFinal(true); }} className='font-helvetica border-2 border-[#1d0038] bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 rounded-full font-semibold hover:opacity-80 duration-300'>&nbsp;Proof of Personhood ✨</button></li> :
							<>
								<li className='hidden tablet:flex justify-center items-center'>
									<IDKitWidget
										action="my_signal"
										onSuccess={res => { setResult(res) }}
										app_id="app_staging_509950d904054e1913c7076105cc1792" // obtain this from developer.worldcoin.org
									>
										{({ open }) => <button onMouseOver={() => setWorldHover(true)} onMouseLeave={() => setWorldHover(false)} type='button' className={`duration-300 ${result ? " bg-black border-4 border-white text-white hover:bg-red-500" : "hover:opacity-70 bg-white text-black"} w-[190px] min-w-[190px] border-4 truncate whitespace-nowrap font-semibold rounded-full px-4 py-2`} onClick={result ? () => setResult(null) : open}>{result ? worldHover ? "Disconnect" : result.nullifier_hash : `Connect WorldApp`}</button>}
									</IDKitWidget>
								</li>
								<li className='hidden tablet:flex justift-center items-center'>
									<button onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} id="showAccount" className={`duration-300 font-semibold ${metaAccount ? "hover:bg-red-500 bg-black border-4 border-white text-white" : "hover:opacity-70 bg-white text-black"} w-[190px] min-w-[190px] border-4 truncate whitespace-nowrap rounded-full px-3 py-2`} onClick={() => metaAccount ? setMetaAccount(null) : getAccount(setMetaAccount)}> {metaAccount ? hover ? "Disconnect" : metaAccount : `Connect Metamask`} </button>
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
			{
				final ?
					<div className="absolute w-full h-full flex justify-center items-center font-helvetica">
						<div className='relative w-[500px] h-[500px] z-20 bg-red-500 rounded-lg shadow-2xl flex flex-col justify-center items-center'>
							<button onClick={() => {setFinal(false); setConfirm(false)}} className='absolute top-5 right-5 font-bold text-white text-2xl'>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
							<div className="relative flex justify-center items-center">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[100px] h-[100px]">
									<path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
								</svg>
								<div className='border-t-2  w-12 h-1 border-dashed'></div>
								<Image
									width={100}
									height={100}
									src="/metamask.png"
									alt='Image of Metamask'
								/>
							</div>

							<div className='relative flex flex-col justify-center items-start w-[300px] h-[100px] p-4 font-helvetica  text-white bg-black '>
								<div className='relative flex mb-2'>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
									</svg>
									&nbsp;warning
								</div>
								<div className="relative font-helvetica">
									Once linked, there is no turning back. Do you still want to connect ?
								</div>
							</div>
							<div className='flex gap-x-4 justify-center items-center font-helvetica font-semibold'>
							{
								confirm ? <button onClick={async () => {
									
								}} className='border-2 rounded-full w-36 px-10 py-2'>Confirm</button> :
								<>
									<button onClick={() => setFinal(false)} className='border-2 rounded-full w-36 px-4 py-2  text-white' >Cancle</button>
									<button onClick={() => setConfirm(true)} className='border-2 rounded-full w-36 px-4 py-2 bg-white text-red-500 hover:bg-red-500 hover:text-white duration-300' >Connect</button>
								</>
							}
							</div>
						</div>
					</div> : null
			}
		</>
	)
}