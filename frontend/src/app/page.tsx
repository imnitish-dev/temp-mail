// 'use client';
// import Image from 'next/image';
// import { Dancing_Script } from 'next/font/google';
// import InboxView from '@/components/InboxView';
// import { useState, ChangeEvent } from 'react';
// import { Tooltip } from 'react-tooltip';
// const dancingScript = Dancing_Script({
//   weight: 'variable', // Specify the weights you need, e.g., 400, 500, 600, 700
//   display: 'swap',
//   subsets: ['latin'], // Recommended to avoid FOIT (Flash of Invisible Text)
// });

// export default function Home() {
//   const [username, setUsername] = useState('abc');
//   const [message, setMessage] = useState('Copy to clipboard');

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     // Extract the username from the email
//     const userEmail = event.target.value.split('@')[0];
//     if (userEmail.includes('mail.imnitish.dev')) return;
//     setUsername(event.target.value.split('@')[0]);
//   };

//   return (
//     <main className="flex bg-white text-black min-h-screen flex-col items-center justify-center">
//       <section className="flex py-16 lg:px-8 md:px-4 bg-[rgb(240,254,254)] flex-col justify-center items-center">
//         <h1 className="text-3xl lg:text-6xl text-center text-[#343445]">
//           <div className={`${dancingScript.className} font-bold text-blue-600`}>Temporary</div> Email Address
//         </h1>
//         <div className="border-2 md:w-2/3 lg:w-1/2 p-2 md:p-4 lg:p-8 text-center border-white border-dotted">
//           <h3 className="p-2 md:p-4  md:text-lg lg:text-xl">
//             Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides
//             temporary, secure, anonymous, free, disposable email address.
//           </h3>
//           <div className="flex justify-between px-4 gap-2 items-center">
//             <input
//               value={`${username}@mail.imnitish.dev`}
//               onChange={handleChange}
//               className={` ${username === '' ? 'bg-red-500' : ''} grow max-md:text-center md:px-8 rounded-full bg-[#343445] text-white p-2 md:p-4`}
//             ></input>
//             <button
//               data-tooltip-id="my-tooltip"
//               data-tooltip-content={message}
//               data-tooltip-place="bottom"
//               onClick={() => {
//                 navigator.clipboard.writeText(`${username}@mail.imnitish.dev`);
//                 setMessage('Copied!');
//                 setTimeout(() => setMessage('Copy to clipboard'), 2000);
//               }}
//               className={`bg-[#EAF0F4] hover:bg-[#343445] flex gap-2 rounded-full p-2 md:p-4 text-blue-500`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6 stroke-blue-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
//                 />
//               </svg>
//             </button>
//             <Tooltip id="my-tooltip" style={{ backgroundColor: '#343445' }} />
//           </div>
//         </div>
//       </section>
//       <section className=" flex justify-center items-center py-4 md:py-8 lg:py-16 lg:px-8 md:px-4  w-full">
//         {username != '' && <InboxView username={username} />}
//       </section>
//     </main>
//   );
// }



'use client';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';
import InboxView from '@/components/InboxView';
import { useState, ChangeEvent } from 'react';
import { Tooltip } from 'react-tooltip';
const dancingScript = Dancing_Script({
  weight: 'variable', // Specify the weights you need, e.g., 400, 500, 600, 700
  display: 'swap',
  subsets: ['latin'], // Recommended to avoid FOIT (Flash of Invisible Text)
});

export default function Home() {
  const [username, setUsername] = useState('abc');
  const [message, setMessage] = useState('Copy to clipboard');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Extract the username from the email
    const userEmail = event.target.value.split('@')[0];
    if (userEmail.includes('mail.imnitish.dev')) return;
    setUsername(event.target.value.split('@')[0]);
  };

  return (
    <main className="flex bg-gray-900 text-white h-screen overflow-hidden">
      <section className="flex py-8 lg:px-6 md:px-3 bg-gray-800 flex-col justify-center items-center w-full">
        <h1 className="text-3xl lg:text-6xl text-center text-white">
          <div className={`${dancingScript.className} font-bold text-blue-600`}>Temporary</div> Email Address
        </h1>
        <div className="border-1  lg:p-8 text-center border-white border-dotted mt-8">
          <h3 className="p-2 md:p-4 md:text-lg lg:text-xl text-gray-400">
            Receive emails anonymously with our free, private, and secure temporary email address generator. 
            Valid for 1 hour, free, and secure.
          </h3>
          <div className="flex justify-between px-4 gap-2 items-center mt-4">
            <input
              value={`${username}@mail.imnitish.dev`}
              onChange={handleChange}
              className={`grow max-md:text-center md:px-8 rounded-full bg-[#343445] text-white p-2 md:p-4 ${username === '' ? 'bg-red-500' : ''}`}
            />
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content={message}
              data-tooltip-place="bottom"
              onClick={() => {
                navigator.clipboard.writeText(`${username}@mail.imnitish.dev`);
                setMessage('Copied!');
                setTimeout(() => setMessage('Copy to clipboard'), 2000);
              }}
              className="bg-[#EAF0F4] hover:bg-[#343445] flex gap-2 rounded-full p-2 md:p-4 text-blue-500"
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
            <Tooltip id="my-tooltip" style={{ backgroundColor: '#343445' }} />
          </div>
        </div>
        <h1 className="text-3sm lg:text-sm text-center text-white mt-8">
           Made in India with ❤️
        </h1>
      </section>
      <InboxView username={username} />

      
    </main>
  );
}