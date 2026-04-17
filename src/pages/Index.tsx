import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import MapScreen from "@/components/MapScreen";
import PersonaScreen from "@/components/PersonaScreen";
import CameraScreen from "@/components/CameraScreen";
import FeedScreen from "@/components/FeedScreen";
import AchievementsScreen from "@/components/AchievementsScreen";
import HiddenGemsScreen from "@/components/HiddenGemsScreen";

type Tab = "map" | "persona" | "camera" | "feed" | "achievements";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("map");
  const [showHiddenGems, setShowHiddenGems] = useState(false);

  if (showHiddenGems) {
    return (
      <div className="h-screen w-full max-w-lg mx-auto relative overflow-hidden bg-background">
        <HiddenGemsScreen onBack={() => setShowHiddenGems(false)} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-lg mx-auto relative overflow-hidden bg-background">
      <div className="h-full">
        {activeTab === "map" && <MapScreen />}
        {activeTab === "persona" && (
          <PersonaScreen onOpenHiddenGems={() => setShowHiddenGems(true)} />
        )}
        {activeTab === "camera" && <CameraScreen />}
        {activeTab === "feed" && <FeedScreen />}
        {activeTab === "achievements" && <AchievementsScreen />}
      </div>
      <BottomNav active={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
