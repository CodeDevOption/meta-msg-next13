"use client";

import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { getServerSession } from "next-auth/next";

type Props = {
  session: any;
};

const ChatInput = ({ session }: Props) => {
  const [input, setInput] = useState("");

  // const session = useSession();
  // console.log(session?.user?.name!);

  // SWR DataFetch and Cache
  const { data: messages, error, mutate } = useSWR("/api/getMessage", fetcher);
  // console.log(messages);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const messageToSend = input;
    // Return a Uniq ID
    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image,
      email: session?.user?.email!,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());
      return [data?.message, ...messages!];
    };

    uploadMessageToUpstash();
    setInput("");

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={sendMessage}
      className="fixed bottom-0 w-full flex px-10 py-5 space-x-2 border-gray-100 bg-white"
    >
      <input
        type="text"
        className="flex-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Enter message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!session}
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
