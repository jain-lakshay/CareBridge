import { Doctor } from "@/context/mock-data";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={doctor.imageUrl} 
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold shadow-sm text-yellow-600">
          <Star className="h-3 w-3 fill-current" />
          {doctor.rating}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-heading font-bold text-lg text-card-foreground flex items-center gap-1">
              {doctor.name}
              {doctor.verified && <CheckCircle2 className="h-4 w-4 text-blue-500" />}
            </h3>
            <p className="text-primary font-medium text-sm">{doctor.specialization}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <MapPin className="h-3 w-3" />
          {doctor.region}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
            {doctor.availableSlots} slots available
          </span>
          <Link href={`/booking/${doctor.id}`}>
            <Button size="sm" className="shadow-md shadow-primary/20">
              Book Visit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
