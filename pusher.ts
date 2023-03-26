import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1573948",
  key: "278ef5d37e1d9359b82d",
  secret: "d99616c2f19726bd6658",
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("278ef5d37e1d9359b82d", {
  cluster: "ap2",
  forceTLS: true,
});
