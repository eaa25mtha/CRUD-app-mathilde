import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    async function getPost() {
      // TODO: Hent ét post fra Supabase og brug det som startværdier i formularen
    }

    getPost();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    // TODO: Send en PATCH request til Supabase med de opdaterede værdier
    // TODO: Naviger tilbage til detail-siden, når postet er gemt
  }

  return (
    <main className="app">
      <h1 className="page-title">Update Post</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="image">Image URL</label>
            <input id="image" name="image" placeholder="https://..." required />
            {/* TODO: Gør image-feltet controlled */}
            {image && (
              <img src={image} alt="Preview" className="image-preview" />
            )}
          </div>

          <div className="form-field">
            <label htmlFor="caption">Caption *</label>
            <textarea
              id="caption"
              name="caption"
              rows="4"
              placeholder="Write a caption for your post..."
              required
            />
            {/* TODO: Gør caption-feltet controlled */}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
