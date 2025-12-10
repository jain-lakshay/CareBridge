import { useState } from "react";
import { DOCTORS } from "@/lib/mock-data";
import DoctorCard from "@/components/doctor-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("all");

  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    // Mock region filtering logic - in real app would check doctor.location
    const matchesRegion = region === "all" ? true : doctor.location.includes(region);
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Find a Specialist</h1>
          <p className="text-muted-foreground mt-2">Book consultations with verified doctors in your area.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <MapPin className="h-4 w-4" />
          Change Location
        </Button>
      </div>

      <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or specialization..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="NJ">New Jersey</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="secondary" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
      
      {filteredDoctors.length === 0 && (
         <div className="text-center py-20">
            <h3 className="text-xl font-medium text-muted-foreground">No doctors found matching your criteria.</h3>
            <Button variant="link" onClick={() => {setSearchTerm(""); setRegion("all");}} className="mt-2">Clear Filters</Button>
         </div>
      )}
    </div>
  );
}
