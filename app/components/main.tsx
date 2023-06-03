'use client'

import dynamic from 'next/dynamic';
import { Dispatch, useState } from 'react';
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
	if (!showAccount) return;
	console.log(account);
  setMetaAccount(account);
}

export default function Main() {

	const [result, setResult] = useState<any>(null);
	const [metaAccount, setMetaAccount] = useState<any>(null);
	
	return (
		<div className='relative w-full h-screen flex justify-center items-center font-helvetica gap-x-10'>
			<IDKitWidget
				action="my_signal"
				onSuccess={res => {setResult(res)}}
				app_id="app_staging_509950d904054e1913c7076105cc1792" // obtain this from developer.worldcoin.org
			>
				{({ open }) => <button className={`${result ? "`disabled:cursor-not-allowed " : ""} w-[180px] min-w-[180px] truncate whitespace-nowrap	border-4 border-black rounded-full p-4`} onClick={open}>{ result ? result.nullifier_hash : `Connect WorldApp`}</button>}
			</IDKitWidget>
			<button className={`${metaAccount ? "cursor-not-allowed" : ""} w-[180px] min-w-[180px] border-4 truncate whitespace-nowrap border-black rounded-full p-4`} onClick={() => getAccount(setMetaAccount)}> {metaAccount ? metaAccount : `Connect Metamask`} </button>
		</div>
	)
}