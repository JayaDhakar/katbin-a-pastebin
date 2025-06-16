import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "pastes"), {
        content: text,
        createdAt: new Date()
      });
      const generatedUrl = `${window.location.origin}/paste/${docRef.id}`;
      setUrl(generatedUrl);
      window.history.pushState(null, "", `/paste/${docRef.id}`);
      return generatedUrl;
    } catch (error) {
      console.error("❌ Firestore addDoc error:", error);
      alert("Failed to save paste. See console for details.");
    }
  };

  const handleCopy = async () => {
    if (!text.trim()) return alert("Text area is empty!");
    const generatedUrl = await handleSave();
    if (generatedUrl) {
      await navigator.clipboard.writeText(text);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="h-screen bg-gray-100 relative flex flex-col p-4">
      <button
        onClick={handleCopy}
        title="Copy Text and Generate URL"
        className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
      >
        <ClipboardIcon className="h-6 w-6 text-gray-800" />
      </button>

      <textarea
        className="flex-1 p-4 text-lg border border-gray-300 rounded-md resize-none"
        placeholder="Enter or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {showAlert && (
        <div className="fixed top-6 right-6 bg-green-100 text-green-700  px-4 py-2 rounded  transition-opacity duration-300 ease-in-out">
          Text copied!
        </div>
      )}
    </div>
  );
}
