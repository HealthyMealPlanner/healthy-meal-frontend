import { useState } from "react";
import { FaMicrochip, FaRobot } from "react-icons/fa";
import PreferencesSidebar from "../../components/ui/PreferencesSidebar/PreferencesSidebar";
import SuggestedPrompts from "../../components/ui/SuggestedPrompts/SuggestedPrompts";
import ChatInputBar from "../../components/ui/ChatInputBar/ChatInputBar";
import RecipeChatCard from "../../components/ui/RecipeChatCard/RecipeChatCard";

// TODO: replace with a real call to the chatAI backend once it's wired
// up — this mock reply mirrors the design mockup's example conversation.
const MOCK_RECIPE = {
  id: 1,
  title: "Authentic Garden Shakshuka",
  description: "A high-protein, low-cost meal using your fresh pantry staples. Perfect for a quick lunch or...",
  time: 15,
  calories: 320,
  price: 35,
  image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=800&auto=format&fit=crop",
};

function ChatAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    const content = text ?? input;
    if (!content.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Based on your pantry and budget, I recommend this Healthy Shakshuka! It's nutritious, flavorful, and stays well within your cost limit.",
          recipe: MOCK_RECIPE,
        },
      ]);
    }, 500);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6 lg:py-8">
      <h1 className="text-3xl lg:text-[44px] font-bold text-text-primary mb-2">
        Your AI Nutrition Assistant
      </h1>
      <p className="text-slate text-base lg:text-lg mb-6">
        Get personalized meal ideas and nutrition suggestions based on your preferences
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 flex flex-col">
          {!hasMessages ? (
            <div className="bg-white/40 border border-white rounded-2xl flex flex-col items-center justify-center text-center px-8 py-16 mb-6">
              <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm">
                <FaMicrochip className="text-primary text-2xl" />
              </span>
              <h2 className="text-xl font-bold text-text-primary mb-2">What are we cooking today?</h2>
              <p className="text-slate text-sm max-w-md">
                I can help you build meal plans, suggest recipes utilizing your current pantry items, and keep everything aligned with your budget.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 mb-6">
              {messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex items-end justify-end gap-2">
                    <div className="max-w-md bg-primary text-white text-sm rounded-2xl rounded-br-md px-4 py-3">
                      {msg.content}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-light shrink-0" />
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center shrink-0">
                      <FaRobot className="text-white text-xs" />
                    </span>
                    <div>
                      <div className="max-w-md bg-white text-sm text-text-primary rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                        {msg.content}
                      </div>
                      {msg.recipe && <RecipeChatCard recipe={msg.recipe} />}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          <ChatInputBar value={input} onChange={setInput} onSend={() => sendMessage()} />

          {!hasMessages && (
            <div className="mt-6">
              <SuggestedPrompts onSelect={(label) => sendMessage(label)} />
            </div>
          )}
        </div>

        <PreferencesSidebar />
      </div>
    </div>
  );
}

export default ChatAI;