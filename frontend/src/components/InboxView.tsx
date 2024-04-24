'use client';
import React from 'react';
import { useState, useEffect } from 'react';

const InboxView = ({ username }: { username: String }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [countdown, setCountdown] = useState(5);
  interface Mail {
    From: string;
    Date: string;
    Subject: string;
    To: string;
    Body: string;
  }

  type ApiResponse = { message: string } | Mail[];
  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(`https://mailapi.imnitish.dev/v1/mail/${username}?page=1&limit=10`);
      const data: ApiResponse = await response.json();
      setData(data);
      // Reset the countdown whenever data is fetched
      setCountdown(5);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // Effect to fetch data on mount and set intervals
  useEffect(() => {
    fetchData(); // Fetch immediately on mount
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [username]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [countdown]);
  return (
    <div className="bg-[#F0F4FF] p-2 md:p-4 w-full lg:w-4/5 gap-4 rounded-lg flex flex-col ">
      <button onClick={() => fetchData()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      <p>Next refresh in: {countdown} seconds</p>
      <h2 className="text-xl">Your Inbox</h2>
      {data && Array.isArray(data) ? (
        <div className="rounded-xl border text-sm border-slate-500 ">
          <table className="table-auto rounded-full p-2 border-collapse  w-full text-left md:table-fixed">
            <thead>
              <tr className="text-white bg-[#343445]">
                <th className=" p-2">Sender</th>
                <th className=" p-2">Subject</th>
                <th className=" p-2">Body</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="w-min border-collapser">
                  <td className="p-2">
                    {row.From.split(' <').map((item, index) => (
                      <p key={index}>{item.replace(/>$/, '')}</p>
                    ))}
                  </td>

                  <td className="p-2"> {row.Subject}</td>
                  <td className="p-2"> {row.Body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 w-full flex flex-col items-center justify-center gap-8">
          <svg
            height="200px"
            width="200px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 58 58"
            xmlSpace="preserve"
            fill="#000000"
            className="h-24 w-24"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              {'{'}' '{'}'}
              <g>
                {'{'}' '{'}'}
                <path
                  style={{ fill: '#0391FD' }}
                  d="M25,9.586C11.193,9.586,0,19.621,0,32c0,4.562,1.524,8.803,4.135,12.343 C3.792,48.433,2.805,54.194,0,57c0,0,8.47-1.191,14.273-4.651c0.006-0.004,0.009-0.01,0.014-0.013 c1.794-1.106,3.809-2.397,4.302-2.783c0.301-0.417,0.879-0.543,1.328-0.271c0.298,0.181,0.487,0.512,0.488,0.86 c0.003,0.582-0.008,0.744-3.651,3.018c2.582,0.81,5.355,1.254,8.245,1.254c13.807,0,25-10.035,25-22.414S38.807,9.586,25,9.586z"
                />
                {'{'}' '{'}'}
                <path
                  style={{ fill: '#0F71D3' }}
                  d="M58,23.414C58,11.035,46.807,1,33,1c-9.97,0-18.575,5.234-22.589,12.804 C14.518,11.153,19.553,9.586,25,9.586c13.807,0,25,10.035,25,22.414c0,4.735-1.642,9.124-4.437,12.743 C51.162,47.448,58,48.414,58,48.414c-2.805-2.805-3.792-8.566-4.135-12.657C56.476,32.217,58,27.976,58,23.414z"
                />
                {'{'}' '{'}'}
                <path style={{ fill: '#FFFFFF' }} d="M32.5,26h-14c-0.552,0-1-0.447-1-1s0.448-1,1-1h14c0.552,0,1,0.447,1,1S33.052,26,32.5,26z" />
                {'{'}' '{'}'}
                <path style={{ fill: '#FFFFFF' }} d="M38,33H13c-0.552,0-1-0.447-1-1s0.448-1,1-1h25c0.552,0,1,0.447,1,1S38.552,33,38,33z" />
                {'{'}' '{'}'}
                <path style={{ fill: '#FFFFFF' }} d="M38,40H13c-0.552,0-1-0.447-1-1s0.448-1,1-1h25c0.552,0,1,0.447,1,1S38.552,40,38,40z" />
                {'{'}' '{'}'}
              </g>
              {'{'}' '{'}'}
            </g>
          </svg>
          Your inbox is empty
        </div>
      )}
    </div>
  );
};

export default InboxView;
