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

const EmailView = ({ data, setView }: { data: Mail; setView: React.Dispatch<React.SetStateAction<string>> }) => {
  const { From, Date, Subject, To, Body } = data;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument;
      if (doc && !rootRef.current) {
        const container = doc.createElement('div');
        doc.body.appendChild(container);
        rootRef.current = createRoot(container);
      }
      if (rootRef.current) {
        rootRef.current.render(<div>{parse(Body)}</div>);
        
      }
    }
  }, [Body]);
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#343445] rounded-t-xl h-12 w-full">
        <button onClick={() => setView('list')} className="p-4 gap-2 h-full flex items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="w-4 h-4 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
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

      <iframe  className="w-full grow" ref={iframeRef} />
    </div>
  );
};

export default EmailView;
