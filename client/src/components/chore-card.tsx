import { motion } from "framer-motion";
import { Check, Clock, User, AlertTriangle, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ChoreProps {
  title: string;
  assignee: string;
  room: string;
  due: string;
  tags?: string[];
  riskLevel?: "low" | "medium" | "high";
  delay?: number;
}

export default function ChoreCard({ 
  title, 
  assignee, 
  room, 
  due, 
  tags = [], 
  riskLevel = "low",
  delay = 0 
}: ChoreProps) {
  const [completed, setCompleted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={cn(
        "group relative bg-card hover:bg-card/80 border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300",
        completed && "opacity-60 grayscale-[0.5]"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 mb-1">
          <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground font-medium rounded-lg text-xs tracking-wide">
            {room}
          </Badge>
          {riskLevel === "high" && (
            <Badge variant="destructive" className="rounded-lg text-xs flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 border-0">
              <AlertTriangle className="h-3 w-3" /> Allergy Risk
            </Badge>
          )}
        </div>
        <button
          onClick={() => setCompleted(!completed)}
          className={cn(
            "h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            completed 
              ? "bg-primary border-primary text-primary-foreground scale-110" 
              : "border-muted-foreground/30 hover:border-primary text-transparent"
          )}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>

      <h3 className={cn(
        "font-heading font-semibold text-lg mb-2 text-card-foreground transition-all",
        completed && "line-through text-muted-foreground"
      )}>
        {title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground flex items-center gap-1">
            {tag === "Mask Required" && <Wind className="h-3 w-3" />}
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border/50 pt-3 mt-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-[10px] text-white font-bold">
            {assignee.charAt(0)}
          </div>
          <span>{assignee}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground/80 bg-muted/50 px-2 py-1 rounded-full">
          <Clock className="h-3 w-3" />
          {due}
        </div>
      </div>
    </motion.div>
  );
}
