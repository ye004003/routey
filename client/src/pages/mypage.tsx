import {
  Settings,
  Home,
  Compass,
  MessageCircle,
  User,
  Plus,
  Heart,
  ThumbsUp,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/* ✅ 여행 멤버 이미지 */
const tripMembers = [
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=100",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100",
];

export default function MyPage() {
  const [location] = useLocation();

  const menuGroups = [
    {
      label: "루트",
      items: ["내 루트", "최근 루트", "DIY 루트"],
    },
    {
      label: "약속",
      items: ["약속 목록", "코스수정 및 재사용"],
    },
    {
      label: "알림 및 연동",
      items: ["알림", "캘린더 연동", "지도 연동"],
    },
  ];

  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen bg-white pb-[100px] shadow-2xl relative overflow-x-hidden flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-5 h-[60px] bg-white sticky top-0 z-[100]">
          <h1 className="font-bold text-gray-900 text-[22px]">마이페이지</h1>
          <Settings className="w-6 h-6 text-gray-800 cursor-pointer" />
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-4 pb-[90px]">
          {/* User Profile */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150" />
              <AvatarFallback>RT</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-[20px] text-lg text-gray-900">ROUTEY 님</span>
              <button className="text-[14px] font-light text-gray-400 font-light hover:underline text-left">
                프로필 편집
              </button>
            </div>
          </div>

          {/* D-Day Card */}
          <div className="bg-[#E9F5FF] rounded-[20px] p-5 mb-6 relative">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-[18px] text-gray-900">부산 여행</h3>

              <div className="text-[13px] font-light text-[#8E949A] flex items-center gap-2">
                부산 |
                <span className="flex -space-x-2">
                  {tripMembers.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="trip member"
                      className="w-5 h-5 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </span>
              </div>
            </div>

            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[32px] font-light text-sky-500">
              D-7
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gray-50 rounded-[20px] overflow-hidden mb-8">
            <div className="flex border-b border-gray-100">
              <div className="flex-1 py-4 flex flex-col items-center">
                <span className="text-[16px] font-light mb-1">쿠폰</span>
                <span className="text-lg font-light text-[25px]">0 개</span>
              </div>
              <div className="w-px bg-gray-100 my-4" />
              <div className="flex-1 py-4 flex flex-col items-center">
                <span className="text-[16px] font-light mb-1">포인트</span>
                <span className="text-lg font-light text-[25px]">10,000 P</span>
              </div>
            </div>

            <div className="flex">
              <div className="flex-1 py-4 flex flex-col items-center gap-1 hover:bg-gray-100 cursor-pointer">
                <Heart className="w-5 h-5 text-gray-800" />
                <span className="text-[13px] font-light">찜</span>
              </div>
              <div className="w-px bg-gray-100 my-4" />
              <div className="flex-1 py-4 flex flex-col items-center gap-1 hover:bg-gray-100 cursor-pointer">
                <ThumbsUp className="w-5 h-5 text-gray-800" />
                <span className="text-[13px] font-light">리뷰</span>
              </div>
              <div className="w-px bg-gray-100 my-4" />
              <div className="flex-1 py-4 flex flex-col items-center gap-1 hover:bg-gray-100 cursor-pointer">
                <HelpCircle className="w-5 h-5 text-gray-800" />
                <span className="text-[13px] font-light">문의</span>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-8 pb-10">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <h4 className="text-[13px] text-gray-400 font-light">
                  {group.label}
                </h4>
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="text-[16px] font-normal text-gray-800 cursor-pointer hover:text-sky-500"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </main>

        {/* Fixed Bottom Nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-[85px] bg-white border-t border-gray-100 flex items-center justify-around px-4 sm:px-6 z-[200] rounded-t-[25px] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          <Link href="/home">
            <div className="flex flex-col items-center gap-1 text-gray-300 cursor-pointer">
              <Home className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[10px] font-medium">홈</span>
            </div>
          </Link>
          <Link href="/discover">
            <div className="flex flex-col items-center gap-1 text-gray-300 cursor-pointer">
              <Compass className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[10px] font-medium">탐색</span>
            </div>
          </Link>

          {/* 빈 공간 (다른 아이콘 간격 유지용) */}
          <div className="w-[40px]" />

          <Link href="/community">
            <div className="flex flex-col items-center gap-1 text-gray-300 cursor-pointer">
              <MessageCircle className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[10px] font-medium">커뮤니티</span>
            </div>
          </Link>
          <Link href="/mypage">
            <div className="flex flex-col items-center gap-1 text-sky-500 cursor-pointer">
              <User className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[10px] font-medium">마이페이지</span>
            </div>
          </Link>
        </nav>

        {/* 플러스 버튼 - nav 바깥, 별도 fixed */}
        <Link href="/create-schedule" className="fixed bottom-[35px] left-1/2 -translate-x-1/2 z-[201]">
          <div className="w-[60px] h-[60px] bg-sky-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform border-[4px] border-white">
            <Plus className="w-8 h-8 text-white stroke-[3px]" />
          </div>
        </Link>
      </div>
    </div>
  );
}
