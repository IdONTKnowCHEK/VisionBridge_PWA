"use client";

import React, { useEffect, useState } from "react";

interface SpeechButtonProps {
  text: string;
  lang?: string;
}

export function SpeechButton({ text, lang = "zh-TW" }: SpeechButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Check if browser supports speech synthesis
    const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setSupported(isSupported);
    
    if (isSupported) {
      // 取得可用的語音
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      
      // 某些瀏覽器需要等待 voiceschanged 事件
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices(); // 立即嘗試載入
    }
  }, []);

  const handleSpeak = () => {
    if (!supported) {
      alert("語音合成在您的瀏覽器中不受支援");
      return;
    }
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // 設定語言，zh-TW 為繁體中文
    
    // 嘗試找出中文語音
    const chineseVoice = voices.find(voice => 
      voice.lang.includes('zh') && (voice.lang.includes('TW') || voice.lang.includes('CN'))
    );
    
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!supported) return null;

  return (
    <button
      onClick={handleSpeak}
      className={`p-2 rounded-full ${
        isSpeaking 
          ? "bg-blue-500 text-white" 
          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      }`}
      aria-label={isSpeaking ? "停止朗讀" : "朗讀文字"}
      title={isSpeaking ? "停止朗讀" : "朗讀文字"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    </button>
  );
}