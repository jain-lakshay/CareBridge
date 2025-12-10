import { CloudRain, Wind, Droplets, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function AllergyStatus() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-teal-400 p-6 text-white shadow-lg shadow-blue-500/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Wind className="h-32 w-32" />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-sm font-medium opacity-90 uppercase tracking-wider mb-1">Air Quality Index</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-heading font-bold">24</span>
                <span className="text-lg font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Good</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <Sun className="h-5 w-5" />
                <span className="text-lg font-bold">72°F</span>
              </div>
              <span className="text-sm opacity-80">Sunny, Clear Skies</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/20 transition-colors cursor-help">
              <span className="text-xs opacity-70 mb-1">Pollen</span>
              <span className="font-bold text-lg">Low</span>
              <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[20%] bg-green-300 rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/20 transition-colors cursor-help">
              <span className="text-xs opacity-70 mb-1">Humidity</span>
              <span className="font-bold text-lg">45%</span>
              <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[45%] bg-blue-300 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/20 transition-colors cursor-help">
              <span className="text-xs opacity-70 mb-1">Dust</span>
              <span className="font-bold text-lg">Med</span>
              <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[60%] bg-yellow-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
