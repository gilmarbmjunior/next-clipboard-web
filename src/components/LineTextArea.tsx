"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
};

export default function LineTextArea({value, onChange, readOnly, placeholder, className}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLPreElement>(null);
  const [lineTops, setLineTops] = useState<number[]>([]);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const mirror = mirrorRef.current;
    if (!mirror) return;
    const lineEls = Array.from(mirror.querySelectorAll<HTMLDivElement>("[data-line]"));
    setLineTops(lineEls.map((el) => el.offsetTop));
    setContentHeight(mirror.scrollHeight);
  }, [value]);

  const syncScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  return (
    <div className={`relative flex min-h-0 ${className ?? ""}`}>
      <div
        ref={gutterRef}
        aria-hidden
        className="w-10 overflow-hidden select-none bg-gray-100 text-right border-y border-l border-gray-300"
      >
        <div className="relative" style={{height: contentHeight}}>
          {lineTops.map((top, i) => (
            <div key={i} className="absolute right-0 px-2 text-gray-400" style={{top}}>{i + 1}</div>
          ))}
        </div>
      </div>
      <div className="relative flex-1 min-w-0">
        <textarea
          ref={textareaRef}
          onScroll={syncScroll}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className="absolute inset-0 w-full h-full resize-none border border-gray-300 focus:outline-none p-4 text-gray-500"
        />
        <pre
          ref={mirrorRef}
          aria-hidden
          className="absolute inset-0 invisible overflow-hidden p-4 border border-gray-500 whitespace-pre-wrap wrap-break-word"
        >
          {value.split("\n").map((line, i, arr) => (
            <div key={i} data-line>
              {line}
              {i < arr.length - 1 ? "\n" : ""}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
