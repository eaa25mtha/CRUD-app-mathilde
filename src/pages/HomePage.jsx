import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

//env-værdier
const URL = import.meta.env.VITE_SUPABASE_URL;
//ændret variablen fra headers til APIKEY
const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      // TODO: Hent alle posts fra Supabase og gem dem i posts state
      const response = await fetch(URL, {
        headers: {
          apikey: APIKEY,
          "content-Type": "application/json",
        },
      });

      //konvertering af data til json
      const data = await response.json();
      //gem data i posts state
      setPosts(data);
    }

    getPosts();
  }, []);

  return (
    <main className="app">
      <section className="feed-intro">
        <p className="feed-eyebrow">Post App</p>
        <h1 className="page-title">Explore the latest posts</h1>
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
