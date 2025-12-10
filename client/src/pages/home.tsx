import Layout from "@/components/layout";
import { useApp } from "@/context/mock-data";
import DoctorCard from "@/components/doctor-card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import generatedImage from "@assets/generated_images/medical_tech_background_abstract.png";

export default function Home() {
  const { doctors } = useApp();

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-8 md:p-12">
          <div className="absolute inset-0 opacity-20">
             <img src={generatedImage} alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight">
              Trusted Guidance for Better Health
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl">
              Connect with verified specialists for non-diagnostic guidance and professional consultation booking.
            </p>
            
            <div className="flex gap-2 max-w-md bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                <Input 
                  placeholder="Search doctors, specializations..." 
                  className="pl-10 bg-transparent border-none text-white placeholder:text-white/60 focus-visible:ring-0"
                />
              </div>
              <Button variant="secondary" className="hidden sm:flex">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">Top Specialists</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
