"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Conversation } from "@11labs/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch {
    console.error("Microphone permission denied");
    return false;
  }
}

export function ConvAI() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const getSignedUrl = async () => {
    try {
      const response = await fetch("/api/signed-url");
      console.log("Server response status:", response.status);

      const data = await response.json();
      console.log("Server response data:", data);

      if (!response.ok) {
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });
        throw new Error(data.error || `API Error: ${response.status}`);
      }

      if (!data.signedUrl) {
        throw new Error("No signed URL in response");
      }

      return data.signedUrl;
    } catch (error) {
      console.error("Error getting signed URL:", error);
      setError("연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return null;
    }
  };

  const connect = async () => {
    try {
      const signedUrl = await getSignedUrl();
      if (!signedUrl) return;

      const conv = await Conversation.startSession({
        signedUrl: signedUrl,
        onConnect: () => {
          setIsConnected(true);
          setIsSpeaking(true);
        },
        onDisconnect: () => {
          setIsConnected(false);
          setIsSpeaking(false);
        },
        onError: (error) => {
          console.log(error);
          alert("An error occurred during the conversation");
        },
        onModeChange: ({ mode }) => {
          setIsSpeaking(mode === "speaking");
        },
      });
      setConversation(conv);
    } catch (error) {
      console.error("Connection error:", error);
      setError("연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setIsConnected(false);
    }
  };

  const disconnect = async () => {
    try {
      // 상태 초기화
      setConversation(null);
      setIsConnected(false);
      setIsSpeaking(false);

      // 페이지를 새로고침하여 모든 연결 강제 종료
      window.location.reload();
    } catch (error) {
      console.error("Disconnection error:", error);
      setError("Connection termination error");
    }
  };

  return (
    <div className="fixed bottom-36 right-10 z-[2000]">
      <Card className="w-[300px] shadow-lg border-2 border-gray-100 rounded-2xl bg-white">
        <CardContent className="p-4">
          <div className="relative">
            {isConnected ? (
              <Image
                src="/voice_chat.gif"
                alt="Voice Chat Animation"
                // width={384}
                width={288}
                // height={681}
                height={511}
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <video
                key={selectedLanguage}
                className="rounded-lg object-cover w-full"
                controls
                playsInline
                loop
              >
                {selectedLanguage === "zh" ? (
                  <source src="/shorts_chinese.mp4" type="video/mp4" />
                ) : (
                  <source src="/short_english.mp4" type="video/mp4" />
                )}
              </video>
            )}
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-xs">Video Language</span>
              </div>
              <select
                className="select select-bordered"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="en">🇺🇸 English</option>
                <option value="zh">🇨🇳 中文</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
              </select>
            </label>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-start mb-1">
              <p className="text-lg font-bold leading-tight text-left flex-1 pr-4">
                AESTURA Atobarrier365 Cream 80ml Double Set
              </p>
              <p className="text-lg font-bold whitespace-nowrap">$20.67</p>
            </div>
            <p className="text-md text-gray-600 text-left">
              (+Cera-Hyal Moisture Ampoule 7ML+A-cica Serum 3ML)
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {/* <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                {!isConnected ? (
                  <Button
                    onClick={connect}
                    className="flex gap-2 w-full items-center  text-lg bg-blue-500 hover:bg-blue-600 text-white py-4"
                  >
                    <div>
                      Chat
                    </div>

                    <div className="flex gap-1 text-lg">
                      <span role="img" aria-label="USA">
                        🇺🇸
                      </span>
                      <span role="img" aria-label="China">
                        🇨🇳
                      </span>
                      <span role="img" aria-label="Japan">
                        🇯🇵
                      </span>
                      <span role="img" aria-label="Korea">
                        🇰🇷
                      </span>
                    </div>
                  </Button>
                ) : (
                  <Button
                    onClick={disconnect}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-8"
                  >
                    Stop
                  </Button>
                )}
              </div>
            </div> */}
            <div><elevenlabs-convai agent-id="Woon2GJoLI56xtb1PJKD"></elevenlabs-convai><script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script></div>

            <Link
              href="/checkout"
              className="w-full py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-center"
            >
              Buy now
            </Link>
          </div>

          {error && (
            <div className="mt-2 text-base text-red-600 text-center">
              {error}
            </div>
          )}

          {isConnected && !error && (
            <div className="mt-3 text-base text-center text-gray-500">
              {isSpeaking
                ? "AI 상담사가 답변하고 있습니다..."
                : "듣고 있습니다..."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
