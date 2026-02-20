import { useState, useCallback, useEffect } from "react";
import {
  Search,
  Home,
  Compass,
  MessageCircle,
  User,
  Plus,
  Menu,
  Ticket,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import useEmblaCarousel from "embla-carousel-react";

import winterSeaImg from "@assets/겨울바다2_1768552243091.png";
import bannerImg from "@assets/c5ada233-c66d-44af-8a3b-a08142eef180_1768552256594.png";
import poster1Img from "@assets/Rectangle_34625271_1768274051475.png";
import poster2Img from "@assets/Rectangle_34625272_1768274051475.png";
import { MapPin } from "lucide-react";  


const bannerSlides = [
  { id: 1, img: winterSeaImg, alt: "2026 겨울바다" },
  { id: 2, img: bannerImg, alt: "흑백요리사2 이벤트" },
];

const categories = [
  { label: "맛집", icon: "🍱" },
  { label: "카페", icon: "☕" },
  { label: "축제/콘서트", icon: "🎵" },
  { label: "이색체험", icon: "🎨" },
  { label: "호캉스", icon: "🏨" },
  { label: "글램핑", icon: "🏕️" },
  { label: "뷰티/마사지", icon: "💆" },
  { label: "공방", icon: "🏺" },
  { label: "테마파크", icon: "🎡" },
  { label: "전시/팝업", icon: "🖼️" },
  { label: "오락", icon: "🎮" },
  { label: "스포츠", icon: "⚽" },
];

const rankingItems = [
  { title: "뮤지컬", active: true },
  { title: "콘서트", active: false },
  { title: "연극", active: false },
  { title: "전시/팝업", active: false },
  { title: "테마파크", active: false },
];

const posters = [
  { id: 1, title: "1위 시카고", img: poster1Img, info: "24,400원 | 2시간" },
  { id: 2, title: "2위 킹키부츠", img: poster2Img, info: "24,400원 | 2시간" },
];

export default function DiscoverPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setLocation] = useLocation();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleBannerClick = (id: number) => {
    if (id === 1) {
      setLocation("/discover/detail");
    }
  };

  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen bg-white pb-[100px] shadow-2xl relative overflow-x-hidden flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-5 h-[60px] bg-white sticky top-0 z-[100] border-b border-gray-50">
          <h1 className="text-[22px] font-bold text-gray-900">탐색</h1>
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-gray-800 cursor-pointer" />
            <Menu className="w-6 h-6 text-gray-800 cursor-pointer" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Category Section Header */}
          <div className="flex items-center justify-between px-[25px] mt-[25px] mb-[17px]">

            {/* 지역 설정 버튼 */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5
                         border border-gray-300 rounded-full
                         text-[13px] font-light
                         hover:bg-gray-50 active:bg-gray-100
                         transition"
            >
              <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>지역설정</span>
            </button>

            {/* 현재 위치 주변 (디자인 유지 + 버튼 느낌만 추가) */}
            <span
              className="text-[13px] text-[#767676] font-light
                         underline underline-offset-2 decoration-[#767676]
                         cursor-pointer
                         hover:text-gray-900
                         active:opacity-70
                         transition"
            >
              현재 위치 주변
            </span>

          </div>


          {/* Category Grid Box */}
          <div className="mx-[18px] mb-[15px]">
            <div className="w-full bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] grid grid-cols-4 grid-rows-3 p-[30px_25px] gap-x-[20px] gap-y-[17px]">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="w-[45px] h-[40px] flex items-center justify-center text-2xl">
                    {cat.icon}
                  </div>
                  <span className="text-[13px] text-black font-normal whitespace-nowrap">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links Box */}
          <div className="mx-[18px] mb-[45px]">
            <div className="w-full h-[50px] bg-white border border-[#f3f3f3] rounded-[7px] flex items-center justify-evenly">
              <div className="flex items-center gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-ticket-icon lucide-ticket"
                >
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
                <span className="text-[14px] text-black font-medium">
                  할인쿠폰
                </span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-alarm-clock-icon lucide-alarm-clock"
                >
                  <circle cx="12" cy="13" r="8" />
                  <path d="M12 9v4l2 2" />
                  <path d="M5 3 2 6" />
                  <path d="m22 6-3-3" />
                  <path d="M6.38 18.7 4 21" />
                  <path d="M17.64 18.67 20 21" />
                </svg>
                <span className="text-[14px] text-black font-medium">
                  한정특가
                </span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-gift-icon lucide-gift"
                >
                  <rect x="3" y="8" width="18" height="4" rx="1" />
                  <path d="M12 8v13" />
                  <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                  <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                </svg>
                <span className="text-[14px] text-black font-medium">
                  이벤트
                </span>
              </div>
            </div>
          </div>

          {/* Event Banner Carousel */}
          <div className="w-full mb-[45px] relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {bannerSlides.map((slide) => (
                  <div
                    key={slide.id}
                    className="flex-[0_0_100%] min-w-0 h-[130px] cursor-pointer"
                    onClick={() => handleBannerClick(slide.id)}
                  >
                    <img
                      src={slide.img}
                      alt={slide.alt}
                      className="w-full h-full object-cover object-center"
                      style={{ imageRendering: "crisp-edges" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="absolute bottom-3 right-4 flex gap-1.5">
              {bannerSlides.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    idx === selectedIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Ticket Ranking */}
          <div className="mb-[45px]">
            <h2 className="text-[22px] font-bold text-black px-[25px] mb-4">
              ROUTEY 티켓 랭킹
            </h2>
            <div className="flex gap-[3px] px-[25px] overflow-hidden">
              {rankingItems.map((item, idx) => (
                <button
                  key={idx}
                  data-testid={`button-ranking-${item.title}`}
                  className={`h-[33px] px-4 rounded-full text-[14px] whitespace-nowrap flex items-center justify-center transition-colors ${
                    item.active
                      ? "bg-[#111111] text-white"
                      : "bg-[#f3f3f3] text-[#111111] hover:bg-[#111111] hover:text-white"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Poster Grid - No Slide */}
            <div className="mt-[15px] mb-[10px] px-[18px] flex gap-[12px]">
              {posters.map((poster) => (
                <div key={poster.id} className="flex-1 flex flex-col gap-2">
                  <div className="w-full aspect-[3/4] rounded-[10px] border border-[#f2f2f2] overflow-hidden shadow-sm">
                    <img
                      src={poster.img}
                      alt={poster.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-[16px] font-bold text-black">
                      {poster.title}
                    </h3>
                    <p className="text-[13px] text-[#555555] font-light">
                      {poster.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="flex flex-col items-center gap-1 text-sky-500 cursor-pointer">
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
            <div className="flex flex-col items-center gap-1 text-gray-300 cursor-pointer">
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
