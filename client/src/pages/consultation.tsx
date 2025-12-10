import { useState, useEffect, useRef } from "react";
import { INITIAL_CHAT, ChatMessage } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function ConsultationPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        // Simple scroll to bottom
        const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: getBotResponse(newUserMsg.content),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes("fever") || lower.includes("temperature")) {
      return "For mild fever (below 102°F/38.9°C), rest and hydration are usually recommended. However, if the fever persists for more than 3 days or is very high, please consult a doctor. Would you like to see available general physicians?";
    }
    if (lower.includes("pain") || lower.includes("hurt")) {
      return "I understand you're in pain. Since I cannot assess the severity, if the pain is sudden, severe, or accompanied by other symptoms, please seek immediate medical attention. For chronic or mild pain, a specialist can help.";
    }
    if (lower.includes("appointment") || lower.includes("book")) {
        return "You can book an appointment with a specialist directly through our 'Find Doctors' page. Would you like me to take you there?";
    }
    return "I can provide general guidance on common minor health issues. For specific medical advice, diagnosis, or treatment, please consult a doctor. Is there a specific symptom you are concerned about?";
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      <div className="mb-6 space-y-2">
         <h1 className="text-3xl font-heading font-bold">Smart Consultation</h1>
         <p className="text-muted-foreground">Get instant guidance for common health concerns or connect with a specialist.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0">
        <Card className="md:col-span-2 flex flex-col shadow-lg border-primary/10 h-full min-h-0">
          <CardHeader className="border-b border-border/50 py-4 bg-primary/5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">CareBridge Assistant</CardTitle>
                <CardDescription className="text-xs">Automated initial guidance • Verified Protocols</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 flex flex-col min-h-0">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                     <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted p-4 rounded-2xl rounded-tl-none">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                        </div>
                      </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-border mt-auto">
                <div className="flex gap-2">
                    <Input 
                        placeholder="Type your health concern..." 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 bg-background"
                    />
                    <Button onClick={handleSend} size="icon" disabled={!inputValue.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                    This AI provides general information only and is not a substitute for professional medical advice.
                </p>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-4">
             <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-yellow-800 dark:text-yellow-500 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Important Notice
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                        If you are experiencing a medical emergency, severe pain, or difficulty breathing, please stop using this app and call emergency services immediately.
                    </p>
                </CardContent>
             </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Need a Specialist?</CardTitle>
                    <CardDescription>
                        If your condition requires professional attention, book a consultation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/doctors">
                        <Button className="w-full gap-2" variant="outline">
                            Find Doctors <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
