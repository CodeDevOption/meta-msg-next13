import redis from "@/redis";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: Message[];
};

type ErrorData = {
  body: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) => {
  if (req.method !== "GET") {
    return res.status(405).json({ body: "Method Not Allowed" });
  }

  //push to ustash red is db
  //   console.log(newMessage);
  const messageRes = await redis.hvals("message");
  const message: Message[] = messageRes
    .map((message) => JSON.parse(message))
    .sort((a, b) => a.created_at - b.created_at);
  res.status(200).json({ message });
};

export default handler;
