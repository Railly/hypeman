"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useState } from "react";
import type { HypeSheet } from "@/lib/synthesize";

type HypeStyle = "professional" | "hypebeast" | "roast";

interface VoiceWidgetProps {
  hypeSheet: HypeSheet;
  hypeStyle?: HypeStyle;
}

export function VoiceWidget({ hypeSheet, hypeStyle = "hypebeast" }: VoiceWidgetProps) {
  const [isStarting, setIsStarting] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log("[HypeMan] Voice connected"),
    onDisconnect: () => console.log("[HypeMan] Voice disconnected"),
    onError: (error) => console.error("[HypeMan] Voice error:", error),
  });

  const profileData = JSON.stringify(hypeSheet, null, 2);

  const startConversation = useCallback(async () => {
    if (isStarting) return;
    setIsStarting(true);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: "agent_4901km7hje4xeypsj40wkwxn3fkn",
        connectionType: "webrtc",
        dynamicVariables: {
          profile_data: profileData,
          hype_style: hypeStyle,
        },
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    } finally {
      setIsStarting(false);
    }
  }, [conversation, profileData, hypeStyle, isStarting]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        {isConnected && !isSpeaking && (
          <div
            className="absolute -inset-3 rounded-full border border-green-500/20"
            style={{ animation: "pulse-ring 2s ease-out infinite" }}
          />
        )}
        {isConnected && isSpeaking && (
          <>
            <div
              className="absolute -inset-3 rounded-full border border-violet-500/20"
              style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
            />
            <div
              className="absolute -inset-6 rounded-full border border-violet-500/10"
              style={{ animation: "pulse-ring 1.5s ease-out infinite 0.4s" }}
            />
            <div
              className="absolute -inset-9 rounded-full border border-violet-500/5"
              style={{ animation: "pulse-ring 1.5s ease-out infinite 0.8s" }}
            />
          </>
        )}
        <button
          type="button"
          onClick={isConnected ? stopConversation : startConversation}
          disabled={isStarting}
          className={`
            relative w-20 h-20 rounded-full flex items-center justify-center
            transition-all duration-300 ease-out
            ${isConnected
              ? isSpeaking
                ? "bg-violet-500 text-white scale-110 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                : "bg-green-500 text-white scale-105 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
              : "bg-neutral-900 border border-neutral-700 text-white hover:border-neutral-500 hover:scale-105"
            }
            disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95
          `}
        >
          {isStarting ? (
            <div className="w-5 h-5 border-2 border-neutral-500 border-t-white rounded-full animate-spin" />
          ) : isConnected ? (
            isSpeaking ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                <path d="M9 9l3 3m0 0l3 3m-3-3l-3 3m3-3l3-3" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            ) : (
              <div className="flex items-center gap-[3px]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-white"
                    style={{
                      animation: `eq-bar 1s ease-in-out ${i * 0.15}s infinite`,
                      height: "16px",
                    }}
                  />
                ))}
              </div>
            )
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
          )}
        </button>
      </div>

      <div className="text-center space-y-1">
        <p className={`text-sm font-medium transition-all duration-300 ${
          isConnected
            ? isSpeaking ? "text-violet-400" : "text-green-400"
            : "text-white"
        }`}>
          {isConnected
            ? isSpeaking ? "HypeMan is speaking..." : "HypeMan is listening..."
            : "Tap to hear your hype"
          }
        </p>
        <p className="text-[11px] text-neutral-600">
          {isConnected ? "Tap again to end" : "Voice-powered by ElevenLabs"}
        </p>
      </div>
    </div>
  );
}
