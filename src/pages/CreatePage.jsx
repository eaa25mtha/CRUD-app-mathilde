import { useState } from "react";
import { useNavigate } from "react-router";

//env-variabler
const URL = import.meta.env.VITE_SUPABASE_URL;
const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export default function CreatePage() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    //Send en POST request til Supabase med image og caption
    await fetch(URL, {
      method: "POST",
      headers: {
        apikey: APIKEY,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image.trim(),
        caption: caption.trim(),
      }),
    });

    //Naviger tilbage til forsiden, når postet er gemt
    navigate("/");
  }

  return (
    <main className="app">
      <h1 className="page-title">Create Post</h1>
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
            {/*Gør image-feltet controlled, se linjerne med value og onChange */}
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
            {/*Gør caption-feltet controlled, se linjerne med value og onChange */}
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
} //CreatePage slut krølle parantes
