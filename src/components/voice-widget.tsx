"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useState, useRef, useEffect } from "react";
import type { HypeSheet } from "@/lib/synthesize";
import { Orb } from "@/components/ui/orb";
import type { AgentState } from "@/components/ui/orb";
import { ShimmeringText } from "@/components/ui/shimmering-text";

type HypeStyle = "professional" | "hypebeast" | "roast";

interface VoiceWidgetProps {
  hypeSheet: HypeSheet;
  hypeStyle?: HypeStyle;
}

const STYLE_COLORS: Record<HypeStyle, [string, string]> = {
  hypebeast: ["#8b5cf6", "#ec4899"],
  professional: ["#3b82f6", "#06b6d4"],
  roast: ["#f97316", "#ef4444"],
};

function useDebouncedSpeaking(isSpeaking: boolean, isConnected: boolean, delay = 1500) {
  const [stable, setStable] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!isConnected) {
      if (timeout.current) clearTimeout(timeout.current);
      setStable(false);
      return;
    }
    if (isSpeaking) {
      if (timeout.current) clearTimeout(timeout.current);
      setStable(true);
    } else {
      timeout.current = setTimeout(() => setStable(false), delay);
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isSpeaking, isConnected, delay]);

  return stable;
}

export function VoiceWidget({ hypeSheet, hypeStyle = "hypebeast" }: VoiceWidgetProps) {
  const [isStarting, setIsStarting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const hasSpoken = useRef(false);

  const conversation = useConversation({
    micMuted: isMuted,
    onConnect: () => console.log("[HypeMan] Voice connected"),
    onDisconnect: () => {
      hasSpoken.current = false;
      setIsMuted(true);
    },
    onError: (error) => console.error("[HypeMan] Voice error:", error),
  });

  const profileData = JSON.stringify(hypeSheet, null, 2);
  const isConnected = conversation.status === "connected";
  const isSpeakingRaw = conversation.isSpeaking;
  const isSpeaking = useDebouncedSpeaking(isSpeakingRaw, isConnected);

  if (isSpeaking && !hasSpoken.current) {
    hasSpoken.current = true;
  }

  const agentState: AgentState = isConnected
    ? isSpeaking
      ? "talking"
      : isMuted
        ? "thinking"
        : "listening"
    : null;

  const startConversation = useCallback(async () => {
    if (isStarting) return;
    setIsStarting(true);
    setIsMuted(true);
    hasSpoken.current = false;

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

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative w-32 h-32 cursor-pointer"
        onClick={isConnected ? stopConversation : startConversation}
      >
        {isStarting ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-neutral-600 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <Orb
            colors={STYLE_COLORS[hypeStyle]}
            agentState={agentState}
            getInputVolume={() => conversation.getInputVolume()}
            getOutputVolume={() => conversation.getOutputVolume()}
          />
        )}
      </div>

      {isConnected && (
        <button
          type="button"
          onClick={toggleMute}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium
            transition-all duration-200
            ${isMuted
              ? "bg-neutral-800 border border-neutral-700 text-neutral-400 hover:border-neutral-500"
              : "bg-white/5 border border-white/20 text-white hover:bg-white/10"
            }
          `}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.776V7.241H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 19a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 7.24H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
          )}
          {isMuted ? "Unmute to ask questions" : "Mic on — listening"}
        </button>
      )}

      <div className="text-center space-y-1">
        {isSpeaking ? (
          <ShimmeringText
            text="HypeMan is speaking..."
            className="text-sm font-medium"
            shimmerColor={STYLE_COLORS[hypeStyle][0]}
            color="#a3a3a3"
            duration={1.5}
            spread={2}
          />
        ) : (
          <p className="text-sm font-medium text-neutral-300">
            {isStarting
              ? "Connecting..."
              : isConnected
                ? hasSpoken.current
                  ? isMuted ? "Pitch complete! Unmute to chat" : "Listening..."
                  : "Getting ready..."
                : "Tap to hear your hype"
            }
          </p>
        )}
        <p className="text-[11px] text-neutral-600">
          {isConnected ? "Tap orb to end session" : "Powered by ElevenLabs"}
        </p>
      </div>
    </div>
  );
}
