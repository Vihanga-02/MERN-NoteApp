import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#00FF9D] hover:text-[#00e68c] font-semibold mb-6"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        <div className="bg-base-100 rounded-2xl shadow-md border-t-4 border-[#00FF9D] p-8">
          <h2 className="text-2xl font-semibold mb-6 text-base-content">
            ✍️ Create a New Note
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-base-content mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Note title..."
                className="w-full input input-bordered rounded-lg focus:border-[#00FF9D] focus:ring-[#00FF9D]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-base font-medium text-base-content mb-1">
                Content
              </label>
              <textarea
                placeholder="Write your note here..."
                className="w-full textarea textarea-bordered h-32 rounded-lg focus:border-[#00FF9D] focus:ring-[#00FF9D]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`btn px-6 border-none transition ${
                  loading
                    ? 'bg-[#00e68c] text-white'
                    : 'bg-[#00FF9D] hover:bg-[#00e68c] text-black'
                }`}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
