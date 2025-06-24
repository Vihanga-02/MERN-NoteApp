import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      {/* Green Icon Background */}
      <div className="bg-[#00FF9D]/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-[#00FF9D]" />
      </div>

      <h3 className="text-2xl font-bold text-base-content">No notes yet</h3>
      
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>

      <Link
        to="/create"
        className="btn bg-[#00FF9D] hover:bg-[#00e68c] text-black border-none transition"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
