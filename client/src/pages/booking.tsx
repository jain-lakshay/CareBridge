import Layout from "@/components/layout";
import { useApp } from "@/context/mock-data";
import { useRoute } from "wouter";
import { format, parseISO, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BookingPage() {
  const [, params] = useRoute("/booking/:id");
  const { doctors, slots, bookSlot } = useApp();
  const { toast } = useToast();
  
  const doctorId = params ? parseInt(params.id) : 0;
  const doctor = doctors.find(d => d.id === doctorId);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  if (!doctor) return <div>Doctor not found</div>;

  const daySlots = slots.filter(s => 
    s.doctorId === doctorId && 
    selectedDate && 
    isSameDay(parseISO(s.startTime), selectedDate)
  ).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const handleBooking = async () => {
    if (!selectedSlot) return;
    
    setIsBooking(true);
    const success = await bookSlot(selectedSlot);
    setIsBooking(false);

    if (success) {
      toast({
        title: "Booking Confirmed",
        description: "Your appointment has been successfully scheduled.",
        className: "bg-green-50 border-green-200 text-green-900",
      });
      setSelectedSlot(null);
    } else {
      toast({
        title: "Booking Failed",
        description: "This slot is no longer available. Please choose another.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Doctor Info Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden border-border shadow-md">
            <div className="aspect-square w-full overflow-hidden">
              <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{doctor.name}</CardTitle>
              <CardDescription className="text-primary font-medium">{doctor.specialization}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">{doctor.region}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Verified Professional</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Interface */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Select Appointment</h1>
            <p className="text-muted-foreground">Choose a date and time for your consultation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md"
                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" /> Available Slots
              </h3>
              
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {daySlots.length === 0 ? (
                  <div className="col-span-2 text-center py-8 text-muted-foreground bg-muted/30 rounded-lg border border-dashed border-muted">
                    No slots available for this date.
                  </div>
                ) : (
                  daySlots.map(slot => (
                    <Button
                      key={slot.id}
                      variant={selectedSlot === slot.id ? "default" : "outline"}
                      className={`w-full justify-start ${
                        slot.status !== "AVAILABLE" ? "opacity-50 cursor-not-allowed bg-muted" : ""
                      }`}
                      disabled={slot.status !== "AVAILABLE"}
                      onClick={() => setSelectedSlot(slot.id)}
                    >
                      {format(parseISO(slot.startTime), "h:mm a")}
                      {slot.status === "CONFIRMED" && <span className="ml-auto text-xs text-muted-foreground">Booked</span>}
                    </Button>
                  ))
                )}
              </div>

              {selectedSlot && (
                <div className="pt-4 border-t border-border">
                  <div className="bg-primary/5 p-4 rounded-lg mb-4 border border-primary/20">
                    <p className="text-sm font-medium text-primary">Selected Time</p>
                    <p className="text-xl font-bold text-foreground">
                      {selectedDate && format(selectedDate, "MMMM d, yyyy")} at {
                        format(parseISO(daySlots.find(s => s.id === selectedSlot)!.startTime), "h:mm a")
                      }
                    </p>
                  </div>
                  <Button 
                    className="w-full shadow-lg shadow-primary/25" 
                    size="lg" 
                    onClick={handleBooking}
                    disabled={isBooking}
                  >
                    {isBooking ? "Confirming..." : "Confirm Booking"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
