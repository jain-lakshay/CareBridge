import Layout from "@/components/layout";
import AllergyStatus from "@/components/allergy-status";
import ChoreCard from "@/components/chore-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import generatedImage from "@assets/generated_images/abstract_clean_air_waves_background.png";

export default function Dashboard() {
  const todaysChores = [
    { id: 1, title: "Vacuum Living Room", assignee: "Jane", room: "Living Room", due: "Today", tags: ["High Dust", "HEPA Filter"], riskLevel: "medium" as const },
    { id: 2, title: "Wash Bedding (Hot)", assignee: "Mike", room: "Master Bedroom", due: "Today", tags: ["Mite Control", "60°C+"], riskLevel: "high" as const },
    { id: 3, title: "Wipe Kitchen Surfaces", assignee: "Jane", room: "Kitchen", due: "2pm", tags: ["Use Non-Toxic"], riskLevel: "low" as const },
  ];

  const upcomingChores = [
    { id: 4, title: "Clean Air Purifier Filters", assignee: "Mike", room: "Whole House", due: "Tomorrow", tags: ["Mask Required", "Outdoor Task"], riskLevel: "high" as const },
    { id: 5, title: "Dust Bookshelves", assignee: "Jane", room: "Study", due: "Wed", tags: ["Wet Cloth Only"], riskLevel: "medium" as const },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Good Morning, Jane!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your home is <span className="text-primary font-semibold">94% allergy-safe</span> today.
            </p>
          </div>
          <Button size="lg" className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
            <Plus className="mr-2 h-5 w-5" /> Add New Chore
          </Button>
        </section>

        {/* Status Widget */}
        <section>
          <AllergyStatus />
        </section>

        {/* Priorities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Today's List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold">Today's Priorities</h2>
              <Button variant="link" className="text-primary">View all</Button>
            </div>
            
            <div className="grid gap-4">
              {todaysChores.map((chore, index) => (
                <ChoreCard 
                  key={chore.id}
                  {...chore}
                  delay={index}
                />
              ))}
            </div>

            <div className="mt-8">
               <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold text-muted-foreground/80">Upcoming</h2>
              </div>
              <div className="grid gap-4 opacity-80">
                {upcomingChores.map((chore, index) => (
                  <ChoreCard 
                    key={chore.id}
                    {...chore}
                    delay={index + 3}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
              <h3 className="font-heading font-semibold mb-4 text-lg">Household Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">J</div>
                    <div>
                      <p className="font-medium text-sm">Jane</p>
                      <p className="text-xs text-muted-foreground">2 tasks left</p>
                    </div>
                  </div>
                  <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">M</div>
                    <div>
                      <p className="font-medium text-sm">Mike</p>
                      <p className="text-xs text-muted-foreground">All done!</p>
                    </div>
                  </div>
                  <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[100%] bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-3xl p-6 border border-orange-100 dark:border-orange-900/50">
              <h3 className="font-heading font-semibold mb-2 text-lg text-orange-800 dark:text-orange-200">Weekly Tip</h3>
              <p className="text-sm text-orange-700/80 dark:text-orange-300/80 leading-relaxed">
                Pollen counts are rising. Keep windows closed between 10 AM and 4 PM to minimize exposure.
              </p>
            </div>
            
            {/* Visual Element */}
             <div className="rounded-3xl overflow-hidden h-40 relative">
               <img src={generatedImage} alt="Clean Air" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                 <span className="text-white font-medium text-sm">Breathe Easy</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
