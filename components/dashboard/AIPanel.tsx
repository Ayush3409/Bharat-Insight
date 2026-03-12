"use client";

import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIMessage } from "@/types";
import { useStore } from "@/store/useStore";

export default function AIPanel() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const { currentDepartment } = useStore();
  const [sampleData, setSampleData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch sample data for context
    fetch(`/api/data?dept=${currentDepartment.id}`)
      .then(res => res.json())
      .then(data => setSampleData(data.slice(0, 20))) // Get first 20 rows for context
      .catch(err => console.error("Failed to fetch data:", err));
  }, [currentDepartment.id]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: AIMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
      });

      // Create context with sample data
      const dataContext = `You are analyzing data from the ${currentDepartment.name}. Here is a sample of the data (first 20 rows):

${JSON.stringify(sampleData, null, 2)}

User question: ${input}

Please provide insights based on this data.`;

      const result = await model.generateContentStream(dataContext);
      
      setIsThinking(false);
      setStreaming(true);

      let fullText = "";
      const assistantMessage: AIMessage = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = fullText;
          return newMessages;
        });
      }

      setStreaming(false);
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMsg = "Failed to get AI response.";
      
      if (error?.message?.includes("quota") || error?.message?.includes("429")) {
        errorMsg = "⚠️ API quota exceeded. Please wait a moment and try again, or use a different API key.";
      } else if (error?.message?.includes("404")) {
        errorMsg = "⚠️ Model not available. Please check your API configuration.";
      } else if (error?.message) {
        errorMsg = `Error: ${error.message}`;
      }
      
      const errorMessage: AIMessage = { 
        role: "assistant", 
        content: errorMsg
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsThinking(false);
      setStreaming(false);
    }
  };

  return (
    <div className="w-96 glass border-l border-white/10 p-6 flex flex-col h-screen">
      <h2 className="text-xl font-bold mb-4">AI Insights</h2>
      
      <div className="mb-4 p-3 bg-blue-500/10 rounded-lg text-sm text-blue-300">
        💡 Ask me about the {currentDepartment.name} data! I can analyze trends, compare states, and provide insights.
      </div>

      {messages.length === 0 && (
        <div className="mb-4 space-y-2">
          <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
          <button
            onClick={() => setInput("Summarize the key statistics")}
            className="w-full text-left px-3 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition"
          >
            📊 Summarize key statistics
          </button>
          <button
            onClick={() => setInput("Which state has the highest values?")}
            className="w-full text-left px-3 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition"
          >
            🏆 Top performing state
          </button>
          <button
            onClick={() => setInput("What trends do you see over the years?")}
            className="w-full text-left px-3 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition"
          >
            📈 Identify trends
          </button>
        </div>
      )}

      <div className="flex-1 overflow-auto mb-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg ${
              msg.role === "user" ? "bg-blue-500/20" : "bg-purple-500/20"
            }`}
          >
            {msg.thinking && (
              <div className="text-sm text-gray-400 mb-2">
                💭 Thinking: {msg.thinking}
              </div>
            )}
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}

        {isThinking && (
          <div className="p-4 rounded-lg bg-purple-500/20">
            <div className="text-sm text-gray-400">🤔 Thinking...</div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about the data..."
          className="flex-1 glass px-4 py-2 rounded-lg"
          disabled={streaming || isThinking}
        />
        <button
          onClick={handleSend}
          disabled={streaming || isThinking}
          className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
