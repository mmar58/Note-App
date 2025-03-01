import React, { useState } from "react";

const OllamaInputMenu = ({ selectedText, onSubmit, onCancel }) => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty");
      return;
    }
    setError("");
    setLoading(true);

    await onSubmit(prompt);

    setLoading(false);
  };

  return (
    <div className="p-3 bg-white shadow-lg rounded-md">
      <p className="text-sm text-gray-600">Selected: {selectedText}</p>
      <input
        type="text"
        placeholder="Enter a prompt..."
        className="border p-2 w-full rounded-md"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div className="flex justify-end gap-2 mt-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={`px-3 py-1 ${
            prompt.trim() ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-200"
          } rounded-md`}
          disabled={!prompt.trim() || loading}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Regenerate"}
        </button>
      </div>
    </div>
  );
};

export default OllamaInputMenu;
