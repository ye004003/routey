import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [phase, setPhase] = useState<"logo" | "expanding" | "login">("logo");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase("expanding");
    }, 2000);

    const timer2 = setTimeout(() => {
      setPhase("login");
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleExplore = () => {
    setLocation("/home");
  };

  return (
    <div className="flex justify-center min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen relative overflow-hidden">
        
        {/* Phase 1: Logo Screen */}
        {phase === "logo" && (
          <div className="w-full h-screen bg-sky-500 flex items-center justify-center">
            <div className="flex items-center text-white font-bold text-[42px] tracking-wide">
              <span>R</span>
              <div className="w-[38px] h-[38px] bg-white rounded-full mx-[-2px]" />
              <span>UTEY</span>
            </div>
          </div>
        )}

        {/* Phase 2: Expanding Circle Animation */}
        {phase === "expanding" && (
          <div className="w-full h-screen bg-sky-500 flex items-center justify-center">
            <div 
              className="absolute bg-white rounded-full"
              style={{
                animation: "expandCircle 1s ease-out forwards",
              }}
            />
            <style>{`
              @keyframes expandCircle {
                0% {
                  width: 38px;
                  height: 38px;
                }
                100% {
                  width: 250vmax;
                  height: 250vmax;
                }
              }
            `}</style>
          </div>
        )}

        {/* Phase 3: Login Screen */}
        {phase === "login" && (
          <div className="w-full h-screen bg-white flex flex-col items-center justify-center px-6">
            <div className="flex-1 flex flex-col items-center justify-center">
              <h1 className="text-sky-500 font-bold text-[40px] tracking-wide mb-3">
                ROUTEY
              </h1>
              <p className="text-gray-700 text-[16px]">
                AI가 만드는 나만의 코스
              </p>
            </div>

            <div className="w-full pb-16">
              <button
                className="w-full h-[56px] bg-sky-400 text-white text-[17px] font-semibold rounded-xl mb-4"
                data-testid="button-login"
              >
                로그인
              </button>
              <button
                onClick={handleExplore}
                className="w-full text-sky-500 text-[15px] font-medium underline"
                data-testid="button-explore"
              >
                서비스 둘러보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
