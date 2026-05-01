import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getPost() {
      // TODO: Hent ét post fra Supabase ud fra id i URL'en
    }

    getPost();
  }, [id]);

  async function handleDelete() {
    // TODO: Bed brugeren bekræfte sletning
    // TODO: Send en DELETE request til Supabase
    // TODO: Naviger tilbage til forsiden bagefter
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
