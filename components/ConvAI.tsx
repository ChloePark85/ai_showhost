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

async function getSignedUrl(): Promise<string> {
  const response = await fetch("/api/signed-url");
  if (!response.ok) {
    throw Error("Failed to get signed url");
  }
  const data = await response.json();
  return data.signedUrl;
}

export function ConvAI() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      alert("No permission");
      return;
    }
    const signedUrl = await getSignedUrl();
    const conversation = await Conversation.startSession({
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
    setConversation(conversation);
  }

  async function endConversation() {
    if (!conversation) {
      return;
    }
    await conversation.endSession();
    setConversation(null);
  }

  return (
    <div className="relative w-full">
      <div className={"flex justify-center items-center gap-x-4"}>
        <Card className={"rounded-3xl bg-red-50"}>
          <CardContent>
            <CardHeader>
              <CardTitle className={"text-center text-red-800"}>
                {isConnected
                  ? isSpeaking
                    ? `할머니가 말씀하고 계세요`
                    : "할머니가 듣고 계세요"
                  : "할머니에게 고민을 상담해보세요!"}
              </CardTitle>
            </CardHeader>
            <div className={"flex flex-col items-center gap-y-4 text-center"}>
              <div className="relative w-48 h-48 mx-auto mb-1">
                <Image
                  src="/grandma.png"
                  alt="인자한 할머니"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <p className="text-red-800 font-medium mb-0">AI 할머니</p>

              <div
                className={cn(
                  "orb my-8 mx-12",
                  isSpeaking
                    ? "animate-orb"
                    : conversation && "animate-orb-slow",
                  isConnected ? "orb-active" : "orb-inactive"
                )}
              ></div>

              <Link
                href="https://www.nadio.io/fontmarket/?idx=70"
                target="_blank"
                className="text-red-800 hover:text-red-600 mb-4 text-sm underline"
              >
                내 아바타가 나 대신 대화하도록 하고 싶다면? <br />
                나디오 보이스폰트 만들기
              </Link>

              <Button
                variant={"outline"}
                className={
                  "rounded-full text-red-800 border-red-800 hover:bg-red-100 font-bold"
                }
                size={"xl"}
                disabled={conversation !== null && isConnected}
                onClick={startConversation}
              >
                대화 시작하기
              </Button>
              <Button
                variant={"outline"}
                className={
                  "rounded-full text-red-800 border-red-800 hover:bg-red-100 font-bold"
                }
                size={"xl"}
                disabled={conversation === null && !isConnected}
                onClick={endConversation}
              >
                대화 종료하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
