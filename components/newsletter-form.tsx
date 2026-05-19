"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export default function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 relative">
        <div className="relative flex-1">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            placeholder="Enter your email"
            className="w-full bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-cyan-500/50 h-10"
            required
          />
        </div>
        <Button 
          type="submit" 
          disabled={status === "loading" || status === "success" || !email}
          className="h-10 bg-zinc-100 text-black hover:bg-cyan-400 hover:text-black transition-colors min-w-[120px] font-mono text-sm"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === "success" ? (
            "Subscribed"
          ) : (
            <>
              Subscribe <Send className="w-3.5 h-3.5 ml-2" />
            </>
          )}
        </Button>
      </form>
      
      {status === "success" && (
        <div className="mt-3 flex items-center text-sm text-emerald-400 font-mono animate-in fade-in slide-in-from-bottom-1">
          <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" />
          <p>{message}</p>
        </div>
      )}
      
      {status === "error" && (
        <div className="mt-3 flex items-center text-sm text-rose-400 font-mono animate-in fade-in slide-in-from-bottom-1">
          <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
