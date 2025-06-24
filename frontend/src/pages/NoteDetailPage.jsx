import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-[#00FF9D]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Top Nav Buttons */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="btn btn-ghost text-[#00FF9D] hover:bg-[#00FF9D]/10"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-outline border-red-500 text-red-500 hover:bg-red-100"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          {/* Edit Note Card */}
          <div className="card bg-base-100 border-t-4 border-[#00FF9D] shadow-sm">
            <div className="card-body p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                {/* Title */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered w-full rounded-md focus:ring-2 focus:ring-[#00FF9D] focus:outline-none"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full h-40 resize-none rounded-md focus:ring-2 focus:ring-[#00FF9D] focus:outline-none"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`btn px-6 transition border-none ${
                      saving
                        ? "bg-[#00e68c] text-white"
                        : "bg-[#00FF9D] hover:bg-[#00e68c] text-black"
                    }`}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
