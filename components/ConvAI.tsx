"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Conversation } from "@11labs/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="fixed bottom-8 right-12 z-50">
      <Card className="w-[400px] shadow-lg border-2 border-gray-100 rounded-2xl bg-white">
        <CardContent className="p-4">
          <div className="relative w-full">
            <div className={"flex justify-center items-center gap-x-4"}>
              <Card className={"rounded-3xl bg-red-50"}>
                <CardContent>
                  <CardHeader>
                    <CardTitle className={"text-center text-red-800"}>
                      {isConnected
                        ? isSpeaking
                          ? `AI Showhost is talking`
                          : "AI Showhost is listening"
                        : "Ask AI Showhost!"}
                    </CardTitle>
                  </CardHeader>
                  <div
                    className={"flex flex-col items-center gap-y-4 text-center"}
                  >
                    <div className="relative w-96 h-[681px]">
                      <Image
                        src="/cosmetic_product.png"
                        alt="화장품"
                        width={384}
                        height={681}
                        className="rounded-lg object-contain"
                        priority
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-base font-bold leading-tight mb-1">
                        AESTURA Atobarrier365 Cream 80ml Double Set
                      </p>
                      <p className="text-sm text-gray-600">
                        (+Cera-Hyal Moisture Ampoule 7ML+A-cica Serum 3ML)
                      </p>
                    </div>

                    <div className="flex gap-4 mb-4">
                      <Link
                        href="https://www.youtube.com/watch?v=your_video_id"
                        target="_blank"
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Watch video
                      </Link>
                      <button
                        onClick={async () => {
                          setError(null);
                          if (!isConnected) {
                            await connect();
                          }
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {isConnected ? "chatting..." : "Voice chatting"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {error && (
            <div className="mt-2 text-sm text-red-600 text-center">{error}</div>
          )}

          {isConnected && !error && (
            <div className="mt-3 text-xs text-center text-gray-500">
              {isSpeaking ? "AI showhost is responding..." : "Listening..."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
