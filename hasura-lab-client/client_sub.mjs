import "dotenv/config";
import WebSocket from "ws";
import { createClient } from "graphql-ws";

const HASURA_WS = process.env.HASURA_WS;
const ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

const client = createClient({
  url: HASURA_WS,
  webSocketImpl: WebSocket,
  connectionParams: {
    headers: {
      "x-hasura-admin-secret": ADMIN_SECRET
    }
  }
});

const query = `
  subscription LivePosts {
    posts(order_by: {created_at: desc}, limit: 10) {
      id
      title
      created_at
      user { name }
    }
  }
`;

console.log("⚡ Listening for realtime posts over WebSockets... (CTRL+C to stop)");

client.subscribe(
  { query },
  {
    next: (data) => {
      if (data.data && data.data.posts.length > 0) {
        console.log("\n🔥 [Realtime Update] Newest Post on System:");
        console.log(JSON.stringify(data.data.posts[0], null, 2));
      }
    },
    error: (err) => console.error("❌ Subscription error:", err),
    complete: () => console.log("Subscription complete")
  }
  
  // Add this to the bottom of client-sub.mjs to handle graceful exits
);

process.on('SIGINT', async () => {
    console.log("\n👋 Closing WebSocket connection gracefully...");
    await client.dispose();
    process.exit(0);
});