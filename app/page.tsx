import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Providers from "./Providers";
import { getServerSession } from "next-auth/next";
export default async function Home() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessage`
  ).then((res) => res.json());
  // console.log(data?.message);

  const messages: Message[] = data?.message;

  // get Auth Session new Nextjs 13
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <Providers session={session}>
      <main className="">
        {/* Messages List (Server Component) */}
        <MessageList initialMessages={messages} />

        {/* Chat Inputs (client Component) */}
        <ChatInput session={session} />
      </main>
    </Providers>
  );
}
