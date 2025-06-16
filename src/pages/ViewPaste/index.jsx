import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { FiCopy } from "react-icons/fi";

const ViewPaste = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.warn("❌ Paste ID is undefined");
        return;
      }

      console.log("📦 Fetching paste ID:", id);

      try {
        const docRef = doc(db, "pastes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("✅ Data found:", docSnap.data());
          setContent(docSnap.data().content);
        } else {
          console.log("⚠️ No such document");
        }
      } catch (error) {
        console.error("❌ Firestore error:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Paste Viewer</h1>

      <div className="relative">
        <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
          {content}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-gray px-3 py-1 rounded text-sm
           hover:bg-gray-200 transition cursor-pointer"
        >
          {copied ? "Copied!" : <FiCopy size={20} />}
        </button>
      </div>
      {copied && (
        <div
          className="fixed top-4 right-4 bg-green-100 text-green-700 
         px-4 py-2 rounded animate-fadeIn"
        >
          Text copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ViewPaste;
