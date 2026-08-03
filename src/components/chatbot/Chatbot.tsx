"use client";

import { FileText, MessageCircle, Minimize2, Send, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Message {
  id: string;
  pdf?: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  whatsappLink?: string;
}

interface UserData {
  email?: string;
  name?: string;
  phone?: string;
  qualification?: string;
}

type OnboardingStep = 0 | 1 | 2 | 3 | 4;

interface ChatWidgetProps {
  autoOpenDelay?: number;
  botAvatar?: string;
  botName?: string;
  enableSound?: boolean;
  teaserDelay?: number;
  teaserMessage?: string;
  userAvatar?: string;
}

const CONSTANTS = {
  API_ENDPOINT: "/api/chat",
  AUTO_OPEN_DELAY: 2000,
  BOT_AVATAR: "/home/logo.png",
  BOT_NAME: "Eduwise Solutions",
  FOCUS_DELAY: 100,
  NOTIFICATION_SOUND: "/home/notification.wav",
  SESSION_STORAGE_KEY: "chat_session_id",
  TEASER_DELAY: 1500,
  USER_AVATAR: "/user-logo.png",
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
  if (typeof window === "undefined") {
    return generateSessionId();
  }

  const existingId = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE_KEY);
  if (existingId) {
    return existingId;
  }

  const newId = generateSessionId();
  sessionStorage.setItem(CONSTANTS.SESSION_STORAGE_KEY, newId);
  return newId;
};

const formatTimestamp = (date: Date): string =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const createMessage = (
  sender: "user" | "bot",
  text: string,
  pdf?: string,
  whatsappLink?: string
): Message => ({
  id: `${Date.now()}-${Math.random()}`,
  pdf,
  sender,
  text,
  timestamp: new Date(),
  whatsappLink,
});

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]{10,}$/;
  return phoneRegex.test(phone);
};

const useAudioNotification = (enabled = true) => {
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
  <div className="flex items-center justify-between bg-linear-to-r from-primary-75 to-primary-70 px-4 py-3 text-white shadow-md">
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
          alt={`${botName} Logo`}
          className="rounded-full ring-2 ring-white/30"
          height={32}
          src={botAvatar}
          width={32}
        />
        <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
      </div>
      <div>
        <h3 className="font-semibold text-base">{botName}</h3>
        <p className="text-white/80 text-xs">Online</p>
      </div>
    </div>
    <Button
      aria-label="Close chat"
      className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/20"
      onClick={onClose}
      variant={"ghost"}
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
        "fade-in slide-in-from-bottom-2 flex animate-in gap-2 duration-300",
        isBot ? "items-start justify-start" : "items-start justify-end"
      )}
    >
      {isBot && (
        <Image
          alt="Bot"
          className="shrink-0 rounded-full"
          height={32}
          src={botAvatar}
          width={32}
        />
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 shadow-xs",
          isBot
            ? "border border-grey-70 bg-white text-grey-10"
            : "bg-linear-to-r from-primary-75 to-primary-70 text-white"
        )}
      >
        <div className="mb-1 flex items-center gap-2">
          <span
            className={cn(
              "font-semibold text-xs",
              isBot ? "text-primary-70" : "text-white/90"
            )}
          >
            {isBot ? botName : "You"}
          </span>
        </div>

        <p className="wrap-break-word whitespace-pre-wrap text-sm leading-relaxed">
          {message.text}
        </p>

        {message.whatsappLink && (
          <a
            className="mt-3 inline-flex transform items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 font-medium text-sm text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-green-600 hover:shadow-lg"
            href={message.whatsappLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        )}

        {message.pdf && (
          <Link
            className="mt-2 flex items-center gap-2 text-primary-70 text-xs transition-colors hover:text-primary-50"
            href={message.pdf}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FileText size={14} />
            View PDF
          </Link>
        )}

        <time
          className={cn(
            "mt-1 block text-[10px]",
            isBot ? "text-grey-60" : "text-white/70"
          )}
        >
          {formatTimestamp(message.timestamp)}
        </time>
      </div>

      {!isBot && (
        <Image
          alt="User"
          className="shrink-0 rounded-full"
          height={32}
          src={userAvatar}
          width={32}
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
  <div className="fade-in slide-in-from-bottom-2 flex animate-in items-start gap-2 duration-300">
    <Image
      alt="Bot"
      className="shrink-0 rounded-full"
      height={32}
      src={botAvatar}
      width={32}
    />
    <div className="rounded-2xl border border-grey-70 bg-white px-4 py-3 shadow-xs">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-semibold text-primary-70 text-xs">{botName}</span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-primary-75"
            key={i}
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
    <div className="border-grey-70 border-t bg-white p-3">
      <div className="flex items-center gap-2">
        <input
          className={cn(
            "flex-1 rounded-lg border border-grey-70 px-3 py-2.5",
            "focus:border-transparent focus:ring-2 focus:ring-primary-75",
            "text-grey-10 text-sm placeholder-grey-60 focus:outline-hidden",
            "transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          )}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={inputRef}
          type="text"
          value={value}
        />
        <Button
          aria-label="Send message"
          className={cn(
            "rounded-lg bg-linear-to-r from-primary-75 to-primary-70 p-2.5",
            "text-white transition-all duration-200 hover:shadow-md",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
          )}
          disabled={disabled || !value.trim()}
          onClick={onSubmit}
          variant={"ghost"}
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
      "fixed right-6 bottom-24 z-40 w-72",
      "rounded-2xl border border-grey-70 bg-white shadow-xl",
      "slide-in-from-bottom-4 animate-in duration-300",
      "overflow-hidden"
    )}
  >
    <div className="flex items-start gap-3 p-4">
      <Image
        alt="Bot"
        className="shrink-0 rounded-full"
        height={40}
        src={botAvatar}
        width={40}
      />
      <div className="flex-1">
        <p className="text-grey-10 text-sm leading-relaxed">{message}</p>
      </div>
      <Button
        aria-label="Close teaser"
        className="shrink-0 text-grey-60 transition-colors hover:text-grey-10"
        onClick={onClose}
        variant={"ghost"}
      >
        <X size={16} />
      </Button>
    </div>
    <div className="h-1 bg-linear-to-r from-primary-75 to-primary-70" />
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
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), CONSTANTS.FOCUS_DELAY);
    }
  }, [isOpen]);

  const saveUserData = useCallback(
    async (data: UserData): Promise<void> => {
      try {
        const response = await fetch(CONSTANTS.API_ENDPOINT, {
          body: JSON.stringify({ sessionId, userData: data }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
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
    async (
      question: string
    ): Promise<{
      answer: string;
      pdf?: string;
      whatsappLink?: string;
    }> => {
      try {
        const response = await fetch(CONSTANTS.API_ENDPOINT, {
          body: JSON.stringify({ question, sessionId, userData }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
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
          whatsappLink: data.whatsappLink,
        };
      } catch (error) {
        console.error("Error sending question:", error);
        throw error;
      }
    },
    [sessionId, userData]
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
      const updatedUserData = { ...userData };

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

      try {
        const { answer, pdf, whatsappLink } = await sendQuestion(userInput);
        addMessage(createMessage("bot", answer, pdf, whatsappLink));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
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
    if (!trimmedInput || isLoading) {
      return;
    }

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

  const placeholder = useMemo(
    () => (onboardingStep > 0 ? "Type your answer..." : "Ask me anything..."),
    [onboardingStep]
  );

  if (!isChatVisible) {
    return null;
  }

  return (
    <>
      {showTeaser && !isOpen && (
        <TeaserTooltip
          botAvatar={botAvatar}
          message={teaserMessage}
          onClose={() => setShowTeaser(false)}
        />
      )}

      <Button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={cn(
          "fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full",
          "bg-linear-to-r from-primary-75 to-primary-70",
          "shadow-lg hover:shadow-xl",
          "flex items-center justify-center",
          "transform transition-all duration-300",
          "hover:scale-110 active:scale-95",
          "focus:outline-hidden focus:ring-4 focus:ring-primary-90"
        )}
        onClick={() => (isOpen ? setIsOpen(false) : handleOpenChat())}
        variant={"ghost"}
      >
        {isOpen ? (
          <Minimize2 className="text-white" size={24} />
        ) : (
          <MessageCircle className="text-white" size={24} />
        )}
      </Button>

      {isOpen && (
        <div
          className={cn(
            "fixed right-6 bottom-24 h-[600px] max-h-[calc(100vh-120px)] w-[380px]",
            "rounded-2xl bg-white shadow-2xl",
            "z-50 flex flex-col overflow-hidden",
            "slide-in-from-bottom-4 animate-in duration-300",
            "border border-grey-70"
          )}
        >
          <ChatHeader
            botAvatar={botAvatar}
            botName={botName}
            onClose={() => setIsOpen(false)}
          />

          <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto bg-linear-to-b from-primary-99 to-white p-4">
            {messages.map((message) => (
              <MessageBubble
                botAvatar={botAvatar}
                botName={botName}
                key={message.id}
                message={message}
                userAvatar={userAvatar}
              />
            ))}

            {isLoading && (
              <TypingIndicator botAvatar={botAvatar} botName={botName} />
            )}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            disabled={isLoading}
            inputRef={inputRef as React.RefObject<HTMLInputElement>}
            onChange={setInput}
            onSubmit={handleSubmit}
            placeholder={placeholder}
            value={input}
          />
        </div>
      )}
    </>
  );
}
