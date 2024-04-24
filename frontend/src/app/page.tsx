'use client';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';
import InboxView from '@/components/InboxView';
import { useState } from 'react';
const dancingScript = Dancing_Script({
  weight: 'variable', // Specify the weights you need, e.g., 400, 500, 600, 700
  display: 'swap',
  subsets: ['latin'], // Recommended to avoid FOIT (Flash of Invisible Text)
});

const emailDomain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN || '';

export default function Home() {
  const [currentEmail, setCurrentEmail] = useState<string>(`abc@${emailDomain}`);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Extract the username from the email
    const username = event.target.value.split('@')[0];
    setCurrentEmail(`${username}@${emailDomain}`);
  };

  return (
    <main className="flex bg-[rgb(240,254,254)] text-black min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-6xl text-center text-[#343445]">
          <div className={`${dancingScript.className} font-bold text-blue-600`}>Temporary</div> Email Address
        </h1>
        <div className="border-2 w-1/2 p-8 text-center border-white border-dotted">
          <h3 className="p-4 text-xl">
            Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides
            temporary, secure, anonymous, free, disposable email address.
          </h3>
          <div className="flex justify-between px-4 gap-2 items-center">
            <input value={currentEmail} onChange={handleChange} className="grow px-8 rounded-full bg-[#343445] text-white p-4"></input>
            <button
              onClick={() => {
                navigator.clipboard.writeText(currentEmail);
              }}
              className="bg-[#EAF0F4] flex gap-2 rounded-full p-4 text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      {currentEmail != '' && <InboxView email={currentEmail} />}
    </main>
  );
}
