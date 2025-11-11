"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, Minimize2, FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  pdf?: string;
}

interface UserData {
  name?: string;
  phone?: string;
  qualification?: string;
  email?: string;
}

type OnboardingStep = 0 | 1 | 2 | 3 | 4;

interface ChatWidgetProps {
  autoOpenDelay?: number;
  enableSound?: boolean;
  botName?: string;
  botAvatar?: string;
  userAvatar?: string;
  teaserMessage?: string;
  teaserDelay?: number;
}

const CONSTANTS = {
  USER_AVATAR: "/user-logo.png",
  BOT_AVATAR: "/logo.png",
  NOTIFICATION_SOUND: "/notification.wav",
  BOT_NAME: "Eduwise Solutions",
  SESSION_STORAGE_KEY: "chat_session_id",
  AUTO_OPEN_DELAY: 2000,
  TEASER_DELAY: 1500,
  FOCUS_DELAY: 100,
  API_ENDPOINT: "/api/chat",
} as const;

const ONBOARDING_PROMPTS = {
  1: "May I know your name to get started?",
  2: (name: string) =>
    `Nice to meet you, ${name}! 📱 What's your contact number?`,
  3: "Great! 🎓 What's your highest qualification?",
  4: "Almost done! 📧 Please share your email address.",
  complete:
    "✅ Thank you! I'm ready to answer your questions. Feel free to ask me anything about our programs, courses, or admissions!",
} as const;

const WELCOME_MESSAGE =
  "👋 Welcome to Eduwise Solutions! I'm here to help answer your questions.";
const DEFAULT_TEASER =
  "👋 Hi! Need help with admissions or courses? Click to chat!";

const generateSessionId = (): string => {
  if (typeof window !== "undefined" && crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return `session-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .substring(2, 10)}`;
};

const getOrCreateSessionId = (): string => {
  if (typeof window === "undefined") return generateSessionId();

  const existingId = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE_KEY);
  if (existingId) return existingId;

  const newId = generateSessionId();
  sessionStorage.setItem(CONSTANTS.SESSION_STORAGE_KEY, newId);
  return newId;
};

const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const createMessage = (
  sender: "user" | "bot",
  text: string,
  pdf?: string
): Message => ({
  id: `${Date.now()}-${Math.random()}`,
  sender,
  text,
  timestamp: new Date(),
  pdf,
});

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

const useAudioNotification = (enabled: boolean = true) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && enabled) {
      audioRef.current = new Audio(CONSTANTS.NOTIFICATION_SOUND);
      audioRef.current.volume = 0.5;
    }
  }, [enabled]);

  const playNotification = useCallback(() => {
    if (enabled && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn("Audio playback failed:", error);
      });
    }
  }, [enabled]);

  return playNotification;
};

const useSessionId = () => {
  const [sessionId] = useState<string>(getOrCreateSessionId);
  return sessionId;
};

const ChatHeader = ({
  onClose,
  botName,
  botAvatar,
}: {
  onClose: () => void;
  botName: string;
  botAvatar: string;
}) => (
  <div className="bg-gradient-to-r from-primary-75 to-primary-70 text-white px-4 py-3 flex justify-between items-center shadow-md">
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
          src={botAvatar}
          alt={`${botName} Logo`}
          width={32}
          height={32}
          className="rounded-full ring-2 ring-white/30"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
      </div>
      <div>
        <h3 className="font-semibold text-base">{botName}</h3>
        <p className="text-xs text-white/80">Online</p>
      </div>
    </div>
    <Button
      variant={"ghost"}
      onClick={onClose}
      className="hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
      aria-label="Close chat"
    >
      <X size={20} />
    </Button>
  </div>
);

const MessageBubble = ({
  message,
  botAvatar,
  userAvatar,
  botName,
}: {
  message: Message;
  botAvatar: string;
  userAvatar: string;
  botName: string;
}) => {
  const isBot = message.sender === "bot";

  return (
    <div
      className={cn(
        "flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isBot ? "justify-start items-start" : "justify-end items-start"
      )}
    >
      {isBot && (
        <Image
          src={botAvatar}
          alt="Bot"
          width={32}
          height={32}
          className="rounded-full flex-shrink-0"
        />
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm",
          isBot
            ? "bg-white border border-grey-70 text-grey-10"
            : "bg-gradient-to-r from-primary-75 to-primary-70 text-white"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "text-xs font-semibold",
              isBot ? "text-primary-70" : "text-white/90"
            )}
          >
            {isBot ? botName : "You"}
          </span>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>

        {message.pdf && (
          <a
            href={message.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-2 text-xs text-primary-70 hover:text-primary-50 transition-colors"
          >
            <FileText size={14} />
            View PDF
          </a>
        )}

        <time
          className={cn(
            "text-[10px] mt-1 block",
            isBot ? "text-grey-60" : "text-white/70"
          )}
        >
          {formatTimestamp(message.timestamp)}
        </time>
      </div>

      {!isBot && (
        <Image
          src={userAvatar}
          alt="User"
          width={32}
          height={32}
          className="rounded-full flex-shrink-0"
        />
      )}
    </div>
  );
};

const TypingIndicator = ({
  botAvatar,
  botName,
}: {
  botAvatar: string;
  botName: string;
}) => (
  <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 items-start">
    <Image
      src={botAvatar}
      alt="Bot"
      width={32}
      height={32}
      className="rounded-full flex-shrink-0"
    />
    <div className="bg-white border border-grey-70 rounded-2xl px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-primary-70">{botName}</span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary-75 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const ChatInput = ({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder,
  inputRef,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && value.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="p-3 border-t border-grey-70 bg-white">
      <div className="flex gap-2 items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 px-3 py-2.5 rounded-lg border border-grey-70",
            "focus:ring-2 focus:ring-primary-75 focus:border-transparent",
            "focus:outline-none text-sm text-grey-10 placeholder-grey-60",
            "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
        <Button
          variant={"ghost"}
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className={cn(
            "p-2.5 rounded-lg bg-gradient-to-r from-primary-75 to-primary-70",
            "text-white hover:shadow-md transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          )}
          aria-label="Send message"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

const TeaserTooltip = ({
  message,
  onClose,
  botAvatar,
}: {
  message: string;
  onClose: () => void;
  botAvatar: string;
}) => (
  <div
    className={cn(
      "fixed bottom-24 right-6 w-72 z-40",
      "bg-white shadow-xl rounded-2xl border border-grey-70",
      "animate-in slide-in-from-bottom-4 duration-300",
      "overflow-hidden"
    )}
  >
    <div className="p-4 flex gap-3 items-start">
      <Image
        src={botAvatar}
        alt="Bot"
        width={40}
        height={40}
        className="rounded-full flex-shrink-0"
      />
      <div className="flex-1">
        <p className="text-sm text-grey-10 leading-relaxed">{message}</p>
      </div>
      <Button
        variant={"ghost"}
        onClick={onClose}
        className="text-grey-60 hover:text-grey-10 transition-colors flex-shrink-0"
        aria-label="Close teaser"
      >
        <X size={16} />
      </Button>
    </div>
    <div className="h-1 bg-gradient-to-r from-primary-75 to-primary-70"></div>
  </div>
);

export default function ChatWidget({
  enableSound = true,
  botName = CONSTANTS.BOT_NAME,
  botAvatar = CONSTANTS.BOT_AVATAR,
  userAvatar = CONSTANTS.USER_AVATAR,
  teaserMessage = DEFAULT_TEASER,
  teaserDelay = CONSTANTS.TEASER_DELAY,
}: ChatWidgetProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(0);
  const [userData, setUserData] = useState<UserData>({});
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sessionId = useSessionId();
  const playNotification = useAudioNotification(enableSound);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatVisible(true);
      setShowTeaser(true);
    }, teaserDelay);

    return () => clearTimeout(timer);
  }, [teaserDelay]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), CONSTANTS.FOCUS_DELAY);
    }
  }, [isOpen]);

  const saveUserData = useCallback(
    async (data: UserData): Promise<void> => {
      try {
        const response = await fetch(CONSTANTS.API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, userData: data }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save user data: ${response.status}`);
        }
      } catch (error) {
        console.error("Error saving user data:", error);
        throw error;
      }
    },
    [sessionId]
  );

  const sendQuestion = useCallback(
    async (question: string): Promise<{ answer: string; pdf?: string }> => {
      try {
        const response = await fetch(CONSTANTS.API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, question }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return {
          answer:
            data.answer ||
            "I apologize, but I couldn't generate a response. Please try again.",
          pdf: data.pdf,
        };
      } catch (error) {
        console.error("Error sending question:", error);
        throw error;
      }
    },
    [sessionId]
  );

  const addMessage = useCallback(
    (message: Message) => {
      setMessages((prev) => [...prev, message]);
      if (message.sender === "bot") {
        playNotification();
      }
    },
    [playNotification]
  );

  const handleOnboarding = useCallback(
    async (userInput: string) => {
      const trimmedInput = userInput.trim();

      if (onboardingStep === 2 && !isValidPhone(trimmedInput)) {
        addMessage(
          createMessage(
            "bot",
            "Please enter a valid phone number (at least 10 digits)."
          )
        );
        return;
      }

      if (onboardingStep === 4 && !isValidEmail(trimmedInput)) {
        addMessage(createMessage("bot", "Please enter a valid email address."));
        return;
      }

      addMessage(createMessage("user", trimmedInput));

      let botResponse = "";
      let nextStep: OnboardingStep = 0;
      let updatedUserData = { ...userData };

      switch (onboardingStep) {
        case 1:
          updatedUserData.name = trimmedInput;
          botResponse = ONBOARDING_PROMPTS[2](trimmedInput);
          nextStep = 2;
          break;
        case 2:
          updatedUserData.phone = trimmedInput;
          botResponse = ONBOARDING_PROMPTS[3];
          nextStep = 3;
          break;
        case 3:
          updatedUserData.qualification = trimmedInput;
          botResponse = ONBOARDING_PROMPTS[4];
          nextStep = 4;
          break;
        case 4:
          updatedUserData.email = trimmedInput;
          botResponse = ONBOARDING_PROMPTS.complete;
          nextStep = 0;

          try {
            await saveUserData(updatedUserData);
          } catch (error) {
            console.error("Failed to save user data:", error);
          }
          break;
      }

      setUserData(updatedUserData);
      setOnboardingStep(nextStep);
      addMessage(createMessage("bot", botResponse));
    },
    [onboardingStep, userData, addMessage, saveUserData]
  );

  const handleChatMessage = useCallback(
    async (userInput: string) => {
      addMessage(createMessage("user", userInput));
      setIsLoading(true);
      setError(null);

      try {
        const { answer, pdf } = await sendQuestion(userInput);
        addMessage(createMessage("bot", answer, pdf));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        addMessage(
          createMessage(
            "bot",
            `I'm sorry, I encountered an error: ${errorMessage}. Please try again or contact support.`
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage, sendQuestion]
  );

  const handleSubmit = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setInput("");

    if (onboardingStep > 0) {
      handleOnboarding(trimmedInput);
    } else {
      handleChatMessage(trimmedInput);
    }
  }, [input, isLoading, onboardingStep, handleOnboarding, handleChatMessage]);

  const handleOpenChat = useCallback(() => {
    setShowTeaser(false);
    setIsOpen(true);

    if (messages.length === 0) {
      const welcomeMessages = [
        createMessage("bot", WELCOME_MESSAGE),
        createMessage("bot", ONBOARDING_PROMPTS[1]),
      ];

      setMessages(welcomeMessages);
      setOnboardingStep(1);
      playNotification();
    }
  }, [messages.length, playNotification]);

  const placeholder = useMemo(() => {
    return onboardingStep > 0 ? "Type your answer..." : "Ask me anything...";
  }, [onboardingStep]);

  if (!isChatVisible) return null;

  return (
    <>
      {showTeaser && !isOpen && (
        <TeaserTooltip
          message={teaserMessage}
          onClose={() => setShowTeaser(false)}
          botAvatar={botAvatar}
        />
      )}

      <Button
        variant={"ghost"}
        onClick={() => (isOpen ? setIsOpen(false) : handleOpenChat())}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full z-50",
          "bg-gradient-to-r from-primary-75 to-primary-70",
          "shadow-lg hover:shadow-xl",
          "flex items-center justify-center",
          "transform transition-all duration-300",
          "hover:scale-110 active:scale-95",
          "focus:outline-none focus:ring-4 focus:ring-primary-90"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <Minimize2 size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </Button>

      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 w-[380px] h-[600px] max-h-[calc(100vh-120px)]",
            "bg-white shadow-2xl rounded-2xl",
            "flex flex-col overflow-hidden z-50",
            "animate-in slide-in-from-bottom-4 duration-300",
            "border border-grey-70"
          )}
        >
          <ChatHeader
            onClose={() => setIsOpen(false)}
            botName={botName}
            botAvatar={botAvatar}
          />

          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-primary-99 to-white space-y-3 scrollbar-hide">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                botAvatar={botAvatar}
                userAvatar={userAvatar}
                botName={botName}
              />
            ))}

            {isLoading && (
              <TypingIndicator botAvatar={botAvatar} botName={botName} />
            )}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            disabled={isLoading}
            placeholder={placeholder}
            inputRef={inputRef as React.RefObject<HTMLInputElement>}
          />
        </div>
      )}
    </>
  );
}
