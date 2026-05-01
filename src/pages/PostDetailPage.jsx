import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

//env-variabler, kontakten til supabase
const URL = import.meta.env.VITE_SUPABASE_URL;
const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getPost() {
      // Hent ét post fra Supabase ud fra id i URL'en
      const response = await fetch(`${URL}?id=eq.${id}`, {
        headers: {
          apikey: APIKEY,
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPost(data[0]);
    }

    getPost();
  }, [id]);

  async function handleDelete() {
    //Bed brugeren bekræfte sletning
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;

    //Send en DELETE request til Supabase
    await fetch(`${URL}?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: APIKEY,
        "content-Type": "application/json",
      },
    });

    //Naviger tilbage til forsiden bagefter
    navigate("/");
  }

  return (
    <main className="app">
      <h1 className="page-title">Post Details</h1>
      {post && (
        <article className="post-detail">
          <img src={post.image} alt={post.caption} />
          <div className="post-detail-body">
            <p className="post-meta">Post #{post.id}</p>
            <p className="post-detail-caption">{post.caption}</p>
            <div className="post-detail-actions">
              <Link to={`/posts/${id}/update`} className="btn btn-primary">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </article>
      )}
    </main>
  );
}
