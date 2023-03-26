"use client";

import fetcher from "@/libs/fetcher";
import React, { RefObject, useEffect, useRef } from "react";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "@/pusher";
type Props = {
  initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
  const ref: RefObject<HTMLDivElement> = useRef(null);

  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessage", fetcher);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      // if you send a message, no need to update cache
      if (messages?.find((message) => message.id === data.id)) return;
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
  }, [messages, clientPusher, mutate]);

  return (
    <div className="space-y-5 pb-32 pt-8 max-w-6xl mx-auto">
      <>
        {(messages || initialMessages)
          ?.sort((a, b) => a.created_at - b.created_at)
          .map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))}
        <div ref={ref} />
      </>
    </div>
  );
};

export default MessageList;
