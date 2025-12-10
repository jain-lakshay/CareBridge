import Layout from "@/components/layout";
import ChoreCard from "@/components/chore-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function ChoresPage() {
  const [filter, setFilter] = useState("all");

  const allChores = [
    { id: 1, title: "Vacuum Living Room", assignee: "Jane", room: "Living Room", due: "Today", tags: ["High Dust", "HEPA Filter"], riskLevel: "medium" as const },
    { id: 2, title: "Wash Bedding (Hot)", assignee: "Mike", room: "Master Bedroom", due: "Today", tags: ["Mite Control", "60°C+"], riskLevel: "high" as const },
    { id: 3, title: "Wipe Kitchen Surfaces", assignee: "Jane", room: "Kitchen", due: "2pm", tags: ["Use Non-Toxic"], riskLevel: "low" as const },
    { id: 4, title: "Clean Air Purifier Filters", assignee: "Mike", room: "Whole House", due: "Tomorrow", tags: ["Mask Required", "Outdoor Task"], riskLevel: "high" as const },
    { id: 5, title: "Dust Bookshelves", assignee: "Jane", room: "Study", due: "Wed", tags: ["Wet Cloth Only"], riskLevel: "medium" as const },
    { id: 6, title: "Mop Hardwood Floors", assignee: "Jane", room: "Hallway", due: "Thu", tags: ["Damp Mop"], riskLevel: "low" as const },
    { id: 7, title: "Wash Curtains", assignee: "Mike", room: "Living Room", due: "Sat", tags: ["Heavy Lift", "Dust"], riskLevel: "medium" as const },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Chore Management</h1>
            <p className="text-muted-foreground">Track and assign household tasks.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="rounded-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Manage Rooms
            </Button>
            <Button className="rounded-full shadow-lg shadow-primary/20">
              New Chore
            </Button>
          </div>
        </div>

        <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search chores..." 
              className="pl-9 bg-muted/30 border-transparent focus:bg-background focus:border-primary rounded-xl"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
             {["All", "My Chores", "High Risk", "Overdue"].map((f) => (
               <Button 
                key={f} 
                variant={filter === f.toLowerCase() ? "default" : "ghost"}
                onClick={() => setFilter(f.toLowerCase())}
                className="rounded-full whitespace-nowrap"
               >
                 {f}
               </Button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allChores.map((chore, index) => (
            <ChoreCard key={chore.id} {...chore} delay={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
