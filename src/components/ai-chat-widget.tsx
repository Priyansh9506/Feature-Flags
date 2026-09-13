"use client";

import { useState } from "react";
import { Bot, Send, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

const botResponses = [
  "I can help you analyze your feature flag performance.",
  "Try enabling 'Gradient Cards' from the debug panel.",
  "Your Checkout V2 experiment shows +5.8% conversion for the variant.",
  "Use targeting rules to roll out flags to specific user segments.",
  "3 flags haven't been evaluated in 30 days. Consider archiving them.",
];

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "How can I help you with your feature flags?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      const response = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
    }, 600);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-16 z-40 h-10 w-10 rounded-lg bg-card border border-border text-muted-foreground flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
      >
        <Bot className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-16 right-16 z-40 w-72 h-96 rounded-xl border border-border bg-popover shadow-2xl shadow-black/60 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Flag Assistant</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          <Minus className="h-3 w-3" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-2 py-2 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-1.5"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 h-8 text-xs bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-border"
          />
          <button
            type="submit"
            className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors"
          >
            <Send className="h-3 w-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
