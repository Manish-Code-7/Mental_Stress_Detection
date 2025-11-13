"use client";
import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MindfulnessSection() {
  const [activeTab, setActiveTab] = useState("meditation");
  const [meditationTime, setMeditationTime] = useState(300); // 5 minutes in seconds
  const [isMeditating, setIsMeditating] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathingCount, setBreathingCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [chantingText, setChantingText] = useState("");
  const [isChanting, setIsChanting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathingTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isBreathingRef = useRef(false);

  useEffect(() => {
    if (isMeditating && meditationTime > 0) {
      intervalRef.current = setInterval(() => {
        setMeditationTime((prev) => {
          if (prev <= 1) {
            setIsMeditating(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMeditating, meditationTime]);

  useEffect(() => {
    isBreathingRef.current = isBreathing;
    
    if (!isBreathing) {
      setBreathingPhase("inhale");
      setBreathingCount(0);
      // Clear all timeouts
      breathingTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      breathingTimeoutsRef.current = [];
      return;
    }

    let cycleCount = 0;
    const runCycle = () => {
      if (!isBreathingRef.current) return;
      
      // Inhale phase (4 seconds)
      setBreathingPhase("inhale");
      const t1 = setTimeout(() => {
        if (!isBreathingRef.current) return;
        // Hold phase (2 seconds)
        setBreathingPhase("hold");
        const t2 = setTimeout(() => {
          if (!isBreathingRef.current) return;
          // Exhale phase (4 seconds)
          setBreathingPhase("exhale");
          const t3 = setTimeout(() => {
            if (!isBreathingRef.current) return;
            cycleCount++;
            setBreathingCount(cycleCount);
            runCycle(); // Continue cycle
          }, 4000);
          breathingTimeoutsRef.current.push(t3);
        }, 2000);
        breathingTimeoutsRef.current.push(t2);
      }, 4000);
      breathingTimeoutsRef.current.push(t1);
    };
    
    runCycle();

    return () => {
      breathingTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      breathingTimeoutsRef.current = [];
    };
  }, [isBreathing]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const mantras = [
    "Om Shanti Om",
    "Om Namah Shivaya",
    "Om Mani Padme Hum",
    "So Hum",
    "I am at peace",
    "I am calm and centered",
    "This too shall pass",
    "I am safe and secure",
  ];

  const startChanting = (mantra: string) => {
    setChantingText(mantra);
    setIsChanting(true);
  };

  const stopChanting = () => {
    setIsChanting(false);
    setChantingText("");
  };

  return (
    <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🧘</span>
          Mindfulness & Relaxation
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Take a moment to relax and center yourself with these mindfulness activities
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="chanting">Chanting</TabsTrigger>
          </TabsList>

          <TabsContent value="meditation" className="space-y-4 mt-6">
            <div className="text-center">
              <div className="text-6xl font-mono font-bold text-purple-600 mb-4">
                {formatTime(meditationTime)}
              </div>
              <div className="flex gap-4 justify-center mb-6">
                <Button
                  onClick={() => setMeditationTime(60)}
                  variant="outline"
                  size="sm"
                >
                  1 min
                </Button>
                <Button
                  onClick={() => setMeditationTime(300)}
                  variant="outline"
                  size="sm"
                >
                  5 min
                </Button>
                <Button
                  onClick={() => setMeditationTime(600)}
                  variant="outline"
                  size="sm"
                >
                  10 min
                </Button>
              </div>
              <div className="flex gap-3 justify-center">
                {!isMeditating ? (
                  <Button
                    onClick={() => setIsMeditating(true)}
                    className="bg-purple-600 hover:bg-purple-700"
                    size="lg"
                  >
                    Start Meditation
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsMeditating(false)}
                    variant="destructive"
                    size="lg"
                  >
                    Stop Meditation
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setIsMeditating(false);
                    setMeditationTime(300);
                  }}
                  variant="outline"
                  size="lg"
                >
                  Reset
                </Button>
              </div>
            </div>
            {isMeditating && (
              <div className="mt-6 p-4 bg-white/50 rounded-lg text-center">
                <p className="text-sm text-gray-600">
                  Focus on your breath. Let thoughts come and go without judgment.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="breathing" className="space-y-4 mt-6">
            <div className="text-center">
              <div className="mb-6 flex items-center justify-center">
                <div
                  className={`rounded-full transition-all duration-[4000ms] ease-in-out ${
                    breathingPhase === "inhale"
                      ? "bg-green-400 w-48 h-48"
                      : breathingPhase === "hold"
                      ? "bg-yellow-400 w-56 h-56"
                      : "bg-blue-400 w-32 h-32"
                  } flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">
                      {breathingPhase === "inhale" && "↗"}
                      {breathingPhase === "hold" && "○"}
                      {breathingPhase === "exhale" && "↘"}
                    </div>
                    <div>
                      {breathingPhase === "inhale" && "Breathe In"}
                      {breathingPhase === "hold" && "Hold"}
                      {breathingPhase === "exhale" && "Breathe Out"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  Cycle: {breathingCount}
                </div>
                <p className="text-sm text-gray-600">
                  {breathingPhase === "inhale" && "Inhale slowly for 4 seconds"}
                  {breathingPhase === "hold" && "Hold your breath for 2 seconds"}
                  {breathingPhase === "exhale" && "Exhale slowly for 4 seconds"}
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                {!isBreathing ? (
                  <Button
                    onClick={() => setIsBreathing(true)}
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Start Breathing Exercise
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsBreathing(false)}
                    variant="destructive"
                    size="lg"
                  >
                    Stop
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                <strong>4-2-4 Breathing Technique:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Inhale through your nose for 4 seconds</li>
                <li>Hold your breath for 2 seconds</li>
                <li>Exhale through your mouth for 4 seconds</li>
                <li>Repeat for 5-10 cycles</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="chanting" className="space-y-4 mt-6">
            <div className="text-center">
              {isChanting && chantingText ? (
                <div className="mb-6">
                  <div className="text-5xl font-bold text-purple-600 mb-6 animate-pulse">
                    {chantingText}
                  </div>
                  <div className="text-2xl mb-4">🕉️</div>
                  <p className="text-sm text-gray-600 mb-4">
                    Repeat this mantra silently or aloud. Focus on the sound and vibration.
                  </p>
                  <Button
                    onClick={stopChanting}
                    variant="destructive"
                    size="lg"
                  >
                    Stop Chanting
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-6">
                    Select a mantra to help center your mind
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {mantras.map((mantra, idx) => (
                      <Button
                        key={idx}
                        onClick={() => startChanting(mantra)}
                        variant="outline"
                        className="h-auto py-3 text-sm"
                      >
                        {mantra}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>About Mantras:</strong> Mantras are sacred sounds, words, or phrases that can help 
                focus the mind and promote inner peace. Repeat your chosen mantra during meditation or 
                throughout the day when you need to center yourself.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

