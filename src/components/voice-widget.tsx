"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useState } from "react";
import type { HypeSheet } from "@/lib/synthesize";

interface VoiceWidgetProps {
  hypeSheet: HypeSheet;
  hypeStyle?: "professional" | "hypebeast" | "roast";
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
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {isConnected && isSpeaking && (
          <div
            className="absolute inset-0 rounded-full bg-white/10"
            style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
          />
        )}
        <button
          type="button"
          onClick={isConnected ? stopConversation : startConversation}
          disabled={isStarting}
          className={`
            relative w-14 h-14 rounded-full flex items-center justify-center
            transition-all duration-300 ease-out
            ${isConnected
              ? "bg-white text-black scale-110"
              : "bg-neutral-900 border border-neutral-700 text-white hover:border-neutral-500 hover:scale-105"
            }
            disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95
          `}
        >
          {isStarting ? (
            <div className="w-4 h-4 border-2 border-neutral-500 border-t-white rounded-full animate-spin" />
          ) : isConnected ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-xs text-neutral-600 transition-all duration-300">
        {isConnected
          ? isSpeaking ? "Speaking..." : "Listening..."
          : "Tap to hear your hype"
        }
      </p>
    </div>
  );
}
