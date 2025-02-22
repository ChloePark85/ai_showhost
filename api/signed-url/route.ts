import { NextResponse } from "next/server";

export async function GET() {
  const agentId = process.env.AGENT_ID;
  const apiKey = process.env.XI_API_KEY;

  // 환경 변수 체크를 더 명확하게
  if (!agentId || !apiKey) {
    console.error("Missing environment variables:", {
      hasAgentId: !!agentId,
      hasApiKey: !!apiKey,
    });
    return NextResponse.json(
      { error: "Configuration error: Missing environment variables" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("ElevenLabs API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return NextResponse.json(
        { error: `API request failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ signedUrl: data.signed_url });
  } catch (error) {
    console.error("Error in signed-url route:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
