import { useState } from "react";
import { useRoute, Link } from "wouter";
import { DOCTORS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, CheckCircle2, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BookingPage() {
  const [match, params] = useRoute("/booking/:id");
  const doctorId = params?.id;
  const doctor = DOCTORS.find((d) => d.id === doctorId);
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState(1);

  if (!doctor) {
    return <div className="p-10 text-center">Doctor not found</div>;
  }

  const handleBooking = () => {
    setStep(2);
  };

  if (step === 2) {
    return (
        <div className="max-w-md mx-auto py-20 text-center space-y-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">Booking Confirmed!</h1>
                <p className="text-muted-foreground mt-2">
                    Your appointment with {doctor.name} has been scheduled.
                </p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl text-left space-y-3">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{date ? format(date, "PPP") : "Today"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">10:00 AM</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor</span>
                    <span className="font-medium">{doctor.name}</span>
                </div>
            </div>
            <Link href="/">
                <Button className="w-full">Return Home</Button>
            </Link>
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
      <Link href="/doctors">
        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Doctors
        </Button>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <h2 className="font-heading font-bold text-2xl">{doctor.name}</h2>
                <p className="text-primary font-medium">{doctor.specialization}</p>
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {doctor.location}
                </p>
            </div>
        </div>

        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
                <CardDescription>Fill in your details to schedule a visit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>Time Slot</Label>
                        <Select defaultValue="10:00">
                             <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                             </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label>Type</Label>
                        <Select defaultValue="video">
                             <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="video">Video Consultation</SelectItem>
                                <SelectItem value="clinic">Clinic Visit</SelectItem>
                             </SelectContent>
                        </Select>
                     </div>
                </div>

                <div className="space-y-2">
                    <Label>Reason for Visit</Label>
                    <Textarea placeholder="Briefly describe your symptoms..." />
                </div>

                <Button className="w-full" size="lg" onClick={handleBooking}>
                    Confirm Booking
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
