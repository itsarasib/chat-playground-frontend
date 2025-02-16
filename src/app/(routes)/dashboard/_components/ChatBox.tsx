"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Markdown } from "@/components/MarkDown";
import { useToast } from "@/hooks/use-toast";
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a male AI assistant named Typhoon created by SCB 10X to be helpful, harmless, and honest. Typhoon is happy to help with analysis, question answering, math, coding, creative writing, teaching, role-play, general discussion, and all sorts of other tasks."
  );
  const [model, setModel] = useState("typhoon-v2-8b-instruct");
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [topK, setTopK] = useState(1);
  const [repetitionPenalty, setRepetitionPenalty] = useState(1.05);
  const [minP, setMinP] = useState(0);
  const [latestMessage, setLatestMessage] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    const systemMessage: Message = { role: "system", content: systemPrompt };
    const conversationId = uuidv4();
    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        // "https://api.opentyphoon.ai/v1/chat/completions",
        "https://1838-2405-9800-b861-c89-e0-edf7-56e4-44df.ngrok-free.app/completions",
        {
          method: "POST",
          body: JSON.stringify({
            model,
            messages: [systemMessage, ...updatedMessages],
            maxTokens: 512,
            temperature,
            topP,
            topK,
            repetitionPenalty,
            minP,
            conversationId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.body) return;

      const reader = response.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();

      let incomingMessage = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setLatestMessage("");
          incomingMessage = "";
          break;
        }

        if (value) {
          console.log(value);
          const line = value.split("\n").slice(0, -1);
          console.log(line);
          line.forEach((l) => {
            if (l.startsWith("data:")) {
              const message = l.match(/data: (.*)/)?.[1];
              if (message === "DONE") {
                setMessages((messages) => [
                  ...messages,
                  { role: "assistant", content: incomingMessage },
                ]);
                setLatestMessage(incomingMessage);
                return;
              }
              incomingMessage += message;
              setLatestMessage(incomingMessage);
            } else {
              if (!!l) {
                incomingMessage += "\n" + l;
                setLatestMessage(incomingMessage);
              } else {
                incomingMessage += "\n";
                setLatestMessage(incomingMessage);
              }
            }
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to send message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-row h-full py-4 px-4 rounded-3xl gap-4 bg-gray-300">
      {/* Chat display */}
      <div className="flex flex-col flex-1 overflow-hidden gap-3 justify-between">
        <div className="w-full h-full bg-white p-2 rounded-md overflow-y-auto text-black">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.role === "user" ? "text-blue-700" : "text-green-700"
              }`}
            >
              <strong>{msg.role}:</strong> <Markdown content={msg.content} />
            </div>
          ))}
          {latestMessage && (
            <div className="text-gray-500">
              <strong>assistant:</strong> <Markdown content={latestMessage} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="flex-1 p-2 text-black rounded-md"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            className="px-4 py-5 text-black font-bold rounded-full bg-transparent hover:bg-transparent hover:text-violet-700 hover:border-violet-700 border-2 border-black"
          >
            Send
          </Button>
        </div>
      </div>

      {/* Settings panel */}
      <div className="flex flex-col px-4">
        {/* Model selection */}
        <div className="mb-4">
          <label className="block mb-2">Model</label>
          <select
            className="p-2 text-black rounded-md w-full"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="typhoon-v2-8b-instruct">
              typhoon-v2-8b-instruct
            </option>
            <option value="typhoon-v2-70b-instruct">
              typhoon-v2-70b-instruct
            </option>
            <option value="typhoon-v2-r1-70b-preview">
              typhoon-v2-r1-70b-preview
            </option>
            <option value="typhoon-v1.5-instruct">
              typhoon-v2-70b-instruct
            </option>
            <option value="typhoon-v2-70b-instruct">
              typhoon-v2-70b-instruct
            </option>
          </select>
        </div>

        {/* System Prompt */}
        <div className="mb-4">
          <label className="block mb-2">System Prompt</label>
          <Textarea
            className="p-2 text-black rounded-md w-full bg-white"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </div>

        {/* Parameters */}
        <div className="mb-4">
          <label className="block mb-2">Temperature</label>
          <Slider
            defaultValue={[0.7]}
            max={2}
            step={0.01}
            value={[temperature]}
            onValueChange={(val) => setTemperature(val[0])}
          />

          <label className="block mb-2">Top-P</label>
          <Slider
            defaultValue={[0.95]}
            max={1}
            step={0.01}
            value={[topP]}
            onValueChange={(val) => setTopP(val[0])}
          />

          <label className="block mb-2">Top-K</label>
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            value={[topK]}
            onValueChange={(val) => setTopK(val[0])}
          />

          <label className="block mb-2">Repetition Penalty</label>
          <Slider
            defaultValue={[1.05]}
            max={2}
            step={0.01}
            value={[repetitionPenalty]}
            onValueChange={(val) => setRepetitionPenalty(val[0])}
          />

          <label className="block mb-2">Min-P</label>
          <Slider
            defaultValue={[0]}
            max={0.5}
            step={0.01}
            value={[minP]}
            onValueChange={(val) => setMinP(val[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
