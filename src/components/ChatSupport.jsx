// components/ChatSupport.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ClockIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "system",
      text: "Welcome to QFS Ledger Support! Our team is available 24/7. How can we help you today?",
      time: "Just now",
      type: "system",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [agentTyping, setAgentTyping] = useState(false);
  const [agentOnline, setAgentOnline] = useState(true);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: chatHistory.length + 1,
      sender: "You",
      text: message,
      time: "Just now",
      type: "user",
    };

    setChatHistory([...chatHistory, userMessage]);
    setMessage("");
    setTyping(false);

    // Simulate agent typing
    setAgentTyping(true);

    setTimeout(() => {
      setAgentTyping(false);

      // Add auto-response
      const responses = [
        "Thanks for your message! Our support team will respond shortly.",
        "We've received your message. An agent will be with you soon.",
        "Please hold while we connect you with a support agent.",
        "Thank you for contacting QFS Ledger. How can we assist you with your crypto transactions?",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const agentMessage = {
        id: chatHistory.length + 2,
        sender: "Support Agent",
        text: randomResponse,
        time: "Just now",
        type: "agent",
      };

      setChatHistory((prev) => [...prev, agentMessage]);
    }, 1500);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!typing && e.target.value) {
      setTyping(true);
    }
  };

  const commonQuestions = [
    { id: 1, question: "How do I swap cryptocurrencies?" },
    { id: 2, question: "KYC verification process?" },
    { id: 3, question: "Transaction fees?" },
    { id: 4, question: "Withdrawal time?" },
  ];

  const handleQuickQuestion = (question) => {
    setMessage(question);
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-br from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500"
        } flex items-center justify-center group`}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <>
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
            {/* Notification dot */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </>
        )}
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Live Support
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed right-6 z-40 transition-all duration-300 ${
            isMinimized ? "bottom-32" : "bottom-40"
          }`}
        >
          <div
            className={`bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden transition-all duration-300 ${
              isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-green-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      QFS Ledger Support
                    </h3>
                    <div className="flex items-center">
                      <span
                        className={`h-2 w-2 rounded-full mr-2 ${
                          agentOnline
                            ? "bg-green-400 animate-pulse"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      <span className="text-emerald-200 text-sm">
                        {agentOnline
                          ? "Agent online • 24/7"
                          : "Offline • Email support"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-lg">
                      {isMinimized ? "+" : "−"}
                    </span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Security Banner */}
                <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
                  <div className="flex items-center space-x-2">
                    <ShieldCheckIcon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <p className="text-xs text-emerald-700">
                      <span className="font-semibold">Security:</span> Never
                      share private keys or passwords
                    </p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto h-[350px]">
                  {chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 ${
                        msg.type === "user" ? "text-right" : ""
                      }`}
                    >
                      <div className="flex items-end space-x-2">
                        {msg.type === "agent" && (
                          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <UserIcon className="h-4 w-4 text-emerald-700" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl p-3 ${
                            msg.type === "user"
                              ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white ml-auto"
                              : msg.type === "agent"
                              ? "bg-emerald-50 text-gray-800 border border-emerald-100"
                              : "bg-blue-50 text-blue-800 border border-blue-100"
                          }`}
                        >
                          <div className="font-medium text-sm mb-1">
                            {msg.sender}
                          </div>
                          <p className="text-sm">{msg.text}</p>
                          <div
                            className={`text-xs mt-2 flex items-center ${
                              msg.type === "user"
                                ? "text-emerald-200"
                                : "text-gray-500"
                            }`}
                          >
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {msg.time}
                          </div>
                        </div>
                        {msg.type === "user" && (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">
                              Y
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {agentTyping && (
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-emerald-700" />
                      </div>
                      <div className="bg-emerald-50 rounded-2xl p-3">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                          <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce delay-300"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <div className="px-4 py-3 border-t border-emerald-100">
                  <p className="text-xs text-gray-600 mb-2 font-medium">
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {commonQuestions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => handleQuickQuestion(q.question)}
                        className="px-3 py-1.5 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200 transition-colors"
                      >
                        {q.question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-emerald-100">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={handleTyping}
                      placeholder="Type your message here..."
                      className="flex-1 border border-emerald-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all ${
                        message.trim()
                          ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    >
                      <PaperAirplaneIcon
                        className={`h-5 w-5 ${
                          message.trim() ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Connect to Tawk.to for real support
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSupport;
