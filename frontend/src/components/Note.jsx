import React from "react";

const Note = ({ note, onDelete }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
      <p className="text-xl font-semibold text-gray-800">{note.title}</p>
      <p className="text-gray-700">{note.content}</p>
      <p className="text-sm text-gray-500">{formattedDate}</p>
      <button
        className="mt-2 px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Note;
