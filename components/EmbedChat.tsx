"use client";

import { Chat } from "./chat";
import { EmbedChatHeader } from "./EmbedChatHeader";
import type { ChatMessage } from "@/lib/types";
import type { VisibilityType } from "./visibility-selector";

interface Props {
  chatId: string;
  initialMessages?: ChatMessage[];
  initialVisibilityType?: VisibilityType;
  isReadonly?: boolean;
  autoResume?: boolean;
}

export default function EmbedChat({
  chatId,
  initialMessages = [],
  initialVisibilityType = "public",
  isReadonly = false,
  autoResume = true,
}: Props) {
  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-black">
      
      <EmbedChatHeader />

      <div className="flex-1 overflow-hidden">
        <Chat
          id={chatId}
          initialMessages={initialMessages}
          initialVisibilityType={initialVisibilityType}
          isReadonly={isReadonly}
          autoResume={autoResume}
          isExpanded={true}
        />
      </div>

    </div>
  );
}