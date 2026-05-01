import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

//env-variabler, kontakten til supabase
const URL = import.meta.env.VITE_SUPABASE_URL;
const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    async function getPost() {
      //Hent ét post fra Supabase og brug det som startværdier i formularen
      const response = await fetch(`${URL}?id=eq.${id}`, {
        headers: {
          apikey: APIKEY,
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      setImage(data[0].image);
      setCaption(data[0].caption);
    }

    getPost();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    //Send en PATCH request til Supabase med de opdaterede værdier
    await fetch(`${URL}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: APIKEY,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image.trim(),
        caption: caption.trim(),
      }),
    });

    //Naviger tilbage til detail-siden, når postet er gemt
    navigate(`/posts/${id}`);
  }

  return (
    <main className="app">
      <h1 className="page-title">Update Post</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="image">Image URL</label>
            <input
              id="image"
              name="image"
              placeholder="https://..."
              required
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
            {/*Gør image-feltet controlled */}
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
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
            {/*Gør caption-feltet controlled */}
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
