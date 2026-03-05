"use client";

import { FloatingChat } from "@/components/FloatingChat";
import EmbedChat from "@/components/EmbedChat";
import { isEmbedMode } from "@/lib/isEmbed";

export default function Page() {
  const isEmbed = isEmbedMode();

  if (isEmbed) {
    return <EmbedChat chatId="public-chat" />;
  }

  return <FloatingChat chatId="public-chat" />;
}