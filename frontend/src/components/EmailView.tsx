import React, { useRef, useEffect, ReactEventHandler } from 'react';
import ReactDOM from 'react-dom';
import parse from 'html-react-parser';
import { createRoot } from 'react-dom/client';

interface Mail {
  From: string;
  Date: string;
  Subject: string;
  To: string;
  Body: string;
}

const EmailView = ({ data, setView }: { body: Mail; setView: ReactEventHandler }) => {
  const { From, Date, Subject, To, Body } = data;
  const iframeRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;
    if (!rootRef.current) {
      const container = doc.createElement('div');
      doc.body.appendChild(container);
      rootRef.current = createRoot(container);
    }
    rootRef.current.render(<div>{parse(Body)}</div>);
  }, [Body]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#343445] rounded-t-xl h-12 w-full">
        <button onClick={() => setView('list')} className=" p-4 h-full flex items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidth="{1.5}" stroke="currentColor" className="w-6 h-6 ">
            <path strokelinecap="round" strokelinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span>BACK TO LIST</span>
        </button>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex p-4 justify-between border-b border-gray-500 items-center">
          <div>From : {From}</div>
          {/* <div>Date: {Date}</div> */}
        </div>
        <div className="p-4">Subject: {Subject}</div>
      </div>

      <iframe className="w-full grow" ref={iframeRef} />
    </div>
  );
};

export default EmailView;
