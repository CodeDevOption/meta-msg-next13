import { serverPusher } from "@/pusher";
import redis from "@/redis";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: Message;
};

type ErrorData = {
  body: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ body: "Method Not Allowed" });
  }

  const { message } = req.body;

  const newMessage: Message = {
    ...message,
    created_at: Date.now(),
  };

  //push to ustash red is db
  //   console.log(newMessage);
  await redis.hset("message", newMessage.id, JSON.stringify(newMessage));
  serverPusher.trigger("messages", "new-message", newMessage);
  res.status(200).json({ message: newMessage });
};

export default handler;
