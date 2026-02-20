import { useEffect, useRef, useState } from "react";
import {
  Search,
  Menu,
  Heart,
  Info,
  Star,
  Home,
  Compass,
  MessageCircle,
  User,
  MapPin,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Import stock images
import s1_1Img from "@assets/s1-1_1768265879267.png";
import palaceImg from "@assets/stock_images/korean_palace_winter_9e5931cb.jpg";
import beachImg from "@assets/stock_images/winter_sea_beach_66cbd965.jpg";
import perfumeImg from "@assets/stock_images/perfume_making_works_81b7327b.jpg";
import libraryImg from "@assets/stock_images/modern_vinyl_library_04729a47.jpg";
import comicCafeImg from "@assets/stock_images/cozy_comic_book_cafe_e96dcdc1.jpg";
import cinemaImg from "@assets/stock_images/cinema_theater_inter_36a21a03.jpg";
import parkImg from "@assets/stock_images/han_river_park_seoul_961e6b70.jpg";
import cafeImg from "@assets/stock_images/cozy_korean_cafe_int_30540cfd.jpg";
import potteryImg from "@assets/stock_images/pottery_ceramic_work_081324e4.jpg";
import galleryImg from "@assets/stock_images/modern_art_gallery_e_6114cef1.jpg";
import s1_3Img from "@assets/s1img3.png";
import s1_4Img from "@assets/s1img4.png";
import s1_5Img from "@assets/s1img5.png";
import s2_1Img from "@assets/s2-1.png";
import s2_2Img from "@assets/s2-2.png";
import s2_3Img from "@assets/s2-3.png";
import s3_1Img from "@assets/s3-1.png";
import s3_2Img from "@assets/s3-2.png";
import s3_3Img from "@assets/s3-3.png";
import welcomeBannerImg from "@assets/welcome_banner_2026.png";
import aiChatBtnImg from "@assets/ai_chat_button.png";
import aiRobotImg from "@assets/다운로드_1_1769500037516.png";


const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return ref;
};

export default function HomePage() {
  const scrollRef1 = useDragScroll();
  const scrollRef2 = useDragScroll();

  // State for Section 1 icons (heart and info for each card)
  const [section1Hearts, setSection1Hearts] = useState<Record<number, boolean>>(
    {},
  );
  const [section1Infos, setSection1Infos] = useState<Record<number, boolean>>(
    {},
  );

  // State for Section 2 hearts
  const [section2Hearts, setSection2Hearts] = useState<Record<number, boolean>>(
    {},
  );

  // AI Chat Modal State
  const [showAiChat, setShowAiChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'ai' | 'user', content: string}>>([]);
  const [chatStep, setChatStep] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const step1Tags = ["# 에너지 뿜뿜! 활동적으로", "# 맛집 탐방", "# 힐링, 편안하게"];
  const step2Tags = ["# 자연과 함께", "#맛집 탐방", "#쇼핑", "#뷰티", "# 원데이 클래스", "# 전시/관람", "#운동", "#SNS 핫플", "#카페"];
  const step3Tags = ["#베이커리류", "#한식", "#일식", "#중식", "#양식", "#분식"];

  const handleOpenAiChat = () => {
    setShowAiChat(true);
    setChatStep(0);
    setChatMessages([]);
    setSelectedTags([]);
  };

  const handleCloseAiChat = () => {
    setShowAiChat(false);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) return;
    
    const newTags = [...selectedTags, tag];
    setSelectedTags(newTags);
    setChatMessages(prev => [...prev, { type: 'user', content: tag }]);
    
    if (chatStep === 0) {
      setChatStep(1);
    } else if (chatStep === 1) {
      setChatStep(2);
    } else if (chatStep === 2) {
      setChatStep(3);
    }
  };

  const toggleSection1Heart = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSection1Hearts((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleSection1Info = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSection1Infos((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleSection2Heart = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSection2Hearts((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen bg-white pb-[100px] shadow-2xl relative overflow-x-hidden flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-5 h-[60px] bg-white sticky top-0 z-[100] border-b border-gray-50">
          <div className="flex items-center gap-1 text-sky-500 font-bold text-xl tracking-tight">
            <Compass className="w-6 h-6" />
            <span>ROUTEY</span>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-gray-800 cursor-pointer" />
            <Menu className="w-6 h-6 text-gray-800 cursor-pointer" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {/* Section 1 */}
          <section className="mt-10">
            <div className="flex items-center justify-between px-5 mb-4">
              <h2 className="text-[22px] font-bold text-gray-900">
                내 취향에 맞는 활동 추천
              </h2>
              <Button
                variant="ghost"
                className="text-[13px] text-[#767676] font-light h-auto p-0 hover:bg-transparent"
                
              >
                더보기 +
              </Button>
            </div>
            <div
              ref={scrollRef1}
              className="flex gap-[10px] px-5 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollSnapType: "x proximity" }}
            >
              {[
                {
                  img: s1_1Img,
                  title: "눈 내린 고궁과 온실 속 티타임",
                  tags: ["#혼자놀기", "#눈오는날", "#고궁산책"],
                  info: {
                    duration: "약 4~5시간",
                    cost: "약 43,500원",
                  },
                },
                {
                  img: beachImg,
                  title: "겨울바다 여행과 강릉 감성",
                  tags: ["#4인여행", "#1박2일", "#겨울바다"],
                  info: {
                    duration: "1박 2일",
                    cost: "약 566,000원",
                  },
                },
                {
                  img: s1_3Img,
                  title: "경주, 시간이 멈춘 겨울의 온기",
                  tags: ["#가족여행", "#2박3일", "#한옥체험"],
                  info: {
                    duration: "2박 3일",
                    cost: "약 1,080,000원",
                  },
                },
                {
                  img: s1_4Img,
                  title: "우리끼리 용산 모임",
                  tags: ["#동창모임", "#5인 모임장소", "#용리단길"],
                  info: {
                    duration: "약 7시간",
                    cost: "약 75,000원",
                  },
                },
                {
                  img: s1_5Img,
                  title: "한남동 로맨틱데이트",
                  tags: ["#기념일", "#실내데이트", "#미술관"],
                  info: {
                    duration: "약 7시간",
                    cost: "약 220,000원",
                  },
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[280px] h-[350px] relative rounded-[10px] overflow-hidden shrink-0 shadow-lg scroll-snap-align-start group"
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <button
                      onClick={(e) => toggleSection1Heart(idx, e)}
                      className="transition-all duration-200 hover:scale-110 active:scale-95"
                      data-testid={`button-heart-section1-${idx}`}
                    >
                      <Heart
                        className="w-6 h-6 transition-all duration-200"
                        fill={section1Hearts[idx] ? "#0EA5EA" : "#A1A1A1"}
                        fillOpacity={section1Hearts[idx] ? 1 : 0.6}
                        stroke="white"
                        strokeWidth={1.5}
                      />
                    </button>
                    <div className="relative flex items-start gap-2">
                      <button
                        onClick={(e) => toggleSection1Info(idx, e)}
                        className="transition-all duration-200 hover:scale-110 active:scale-95"
                        data-testid={`button-info-section1-${idx}`}
                      >
                        <Info
                          className="w-6 h-6 transition-all duration-200"
                          fill={section1Infos[idx] ? "#0EA5EA" : "#A1A1A1"}
                          fillOpacity={section1Infos[idx] ? 1 : 0.6}
                          stroke="white"
                          strokeWidth={1.5}
                        />
                      </button>

                      {/* ✅ info 박스 */}
                      {section1Infos[idx] && (
                        <div
                          className="
                            absolute left-8 top-0
                            bg-white/60 backdrop-blur-md
                            rounded-[10px]
                            px-2 py-2
                            shadow-lg
                            text-[12px]
                            text-gray-700
                            min-w-[150px]
                            z-10
                          "
                        >
                          <p>소요기간 {item.info.duration}</p>
                          <p>예상비용 {item.info.cost}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white text-xl font-medium text-[18px] mb-3 leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[13px] px-2 py-2 bg-transparent backdrop-blur-md rounded-full text-white border border-white/20 font-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="min-w-[20px] shrink-0" />
            </div>
          </section>

          {/* Section 2 */}
          <section className="mt-10">
            <div className="flex items-center justify-between px-5 mb-4">
              <h2 className="text-[22px] font-bold text-gray-900">
                오늘을 특별하게 만드는 방법
              </h2>
              <Button
                variant="ghost"
                className="text-[13px] text-[#767676] font-light h-auto p-0 hover:bg-transparent"
              >
                더보기 +
              </Button>
            </div>
            <div
              ref={scrollRef2}
              className="flex gap-[10px] px-5 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollSnapType: "x proximity" }}
            >
              {[
                {
                  img: s2_1Img,
                  name: "닷노트",
                  loc: "강남구 향수공방",
                  star: "5.0",
                  count: "1.5k",
                },
                {
                  img: s2_2Img,
                  name: "현대카드 뮤직라이브러리",
                  loc: "용산구 도서관",
                  star: "5.0",
                  count: "800",
                },
                {
                  img: s2_3Img,
                  name: "응봉산 팔각정",
                  loc: "성동구 산",
                  star: "4.8",
                  count: "2.3k",
                },
                {
                  img: s2_1Img,
                  name: "닷노트",
                  loc: "강남구 향수공방",
                  star: "5.0",
                  count: "1.5k",
                },
                {
                  img: s2_2Img,
                  name: "현대카드 뮤직라이브러리",
                  loc: "용산구 도서관",
                  star: "5.0",
                  count: "800",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[150px] shrink-0 flex flex-col gap-2 group"
                >
                  <div className="w-full h-[150px] rounded-[10px] overflow-hidden relative shadow-md border border-gray-100">
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                      draggable={false}
                    />
                    <button
                      onClick={(e) => toggleSection2Heart(idx, e)}
                      className="absolute top-3 left-3 transition-all duration-200 hover:scale-110 active:scale-95"
                      data-testid={`button-heart-section2-${idx}`}
                    >
                      <Heart
                        className={`w-6 h-6 transition-all duration-200`}
                        fill={section2Hearts[idx] ? "#0EA5EA" : "#A1A1A1"}
                        fillOpacity={section2Hearts[idx] ? 1 : 0.6}
                        stroke="white"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                  <div className="px-1">
                    <h3 className="font-medium text-[16px] group-hover:text-sky-500 transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-[13px] text-gray-500 font-light">
                      {item.loc}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[13px] font-bold">{item.star}</span>
                      <span className="text-[14px] text-gray-400">
                        ({item.count})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="min-w-[20px] shrink-0" />
            </div>
          </section>

          {/* Pink Banner Image */}
          <section className="mt-10">
            <img
              src={welcomeBannerImg}
              alt="2026 새해 웰컴 쿠폰팩 배너"
              className="w-full"
            />
          </section>

          {/* Section 3 */}
          <section className="mt-10 px-5 mb-10">
            <h2 className="text-[22px] font-bold text-gray-900 mb-5">
              내 주변의 새로운 발견
            </h2>
            <div className="flex flex-col gap-6">
              {[
                {
                  img: s3_1Img,
                  name: "벌툰 논현점",
                  loc: "서울-강남구",
                  dist: "도보 5~10분",
                },
                {
                  img: s3_2Img,
                  name: "KU 시네마테크",
                  loc: "서울-강남구",
                  dist: "도보 10~15분",
                },
                {
                  img: s3_3Img,
                  name: "망원 한강공원",
                  loc: "서울-마포구",
                  dist: "차량 15분",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-[10px] overflow-hidden shrink-0 shadow-sm border border-gray-50 relative">
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-medium text-base">{item.name}</h3>
                    <p className="text-sm text-gray-400 font-light">
                      {item.loc}
                    </p>
                    <div className="flex items-center gap-1 text-[13px] text-gray-400 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{item.dist}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        

        {/* Fixed Bottom Nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-[85px] bg-white border-t border-gray-100 flex items-center justify-around px-4 sm:px-6 z-[200] rounded-t-[25px] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          
            <div className="flex flex-col items-center gap-1 text-sky-500 cursor-pointer">
              <Home className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[10px] font-medium">홈</span>
            </div>
          
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

      

      {/* AI Chat Floating Button */}
      <button
        onClick={handleOpenAiChat}
        data-testid="button-ai-chat"
        className="fixed z-[9999] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        style={{
          left: "49.8%",
          transform: "translateX(145px)",
          bottom: "110px",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          border: "2px solid white",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <img
          src={aiRobotImg}
          alt="AI 루티"
          className="w-full h-full object-contain"
        />
      </button>

      {/* AI Chat Modal */}
      {showAiChat && (
        <div className="fixed inset-0 z-[10000] flex justify-center bg-black/50">
          <div className="w-full max-w-[430px] h-full bg-[#F8F9FA] flex flex-col">
            {/* Modal Header */}
            <header className="h-[56px] bg-sky-400 flex items-center justify-center relative">
              <button
                onClick={handleCloseAiChat}
                data-testid="button-close-ai-chat"
                className="absolute left-4 text-white text-2xl font-light"
              >
                &times;
              </button>
              <h1 className="text-white font-bold text-[18px]">AI 루티</h1>
            </header>

            {/* Chat Content */}
            <main className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
              {/* Date */}
              <p className="text-center text-[13px] text-sky-500 mb-6">2025년 12월 02일</p>

              {/* Initial AI Message */}
              <div className="mb-4 px-1">
                <h2 className="text-[18px] font-bold text-gray-900 mb-1">루티만의</h2>
                <h2 className="text-[18px] font-bold text-gray-900 mb-3">성향 분석을 시작합니다.</h2>
                <p className="text-[14px] text-gray-500 mb-4">마음에 드는 키워드를 선택해주세요.</p>
                
                <div className="flex flex-wrap gap-2">
                  {step1Tags.map((tag) => (
                    <button
                      key={tag}
                      data-testid={`tag-step1-${tag}`}
                      onClick={() => handleTagSelect(tag)}
                      disabled={selectedTags.includes(tag)}
                      className={`px-3 py-2 rounded-full text-[13px] border transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-sky-100 border-sky-300 text-sky-600"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Selected Tags */}
              {chatMessages.filter(m => m.type === 'user').slice(0, 1).map((msg, idx) => (
                <div key={idx} className="flex justify-end mb-4">
                  <div className="bg-sky-400 text-white px-4 py-2 rounded-2xl text-[14px]">
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Step 2: Activity Types */}
              {chatStep >= 1 && (
                <>
                  <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <p className="text-[14px] text-gray-700 mb-3">
                      선택하신 분위기를 바탕으로 최적의 장소를 탐색합니다. 보다 정밀한 추천을 위해 희망하는 활동 유형을 선택해 주세요.(중복가능)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step2Tags.map((tag) => (
                        <button
                          key={tag}
                          data-testid={`tag-step2-${tag}`}
                          onClick={() => handleTagSelect(tag)}
                          disabled={selectedTags.includes(tag)}
                          className={`px-3 py-2 rounded-full text-[13px] border transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-sky-100 border-sky-300 text-sky-600"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {chatMessages.filter(m => m.type === 'user').slice(1, 2).map((msg, idx) => (
                    <div key={idx} className="flex justify-end mb-4">
                      <div className="bg-sky-400 text-white px-4 py-2 rounded-2xl text-[14px]">
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Step 3: Food Preference */}
              {chatStep >= 2 && (
                <>
                  <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <p className="text-[14px] text-gray-700 mb-3">
                      평소 어떤 음식을 가장 선호하시나요?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step3Tags.map((tag) => (
                        <button
                          key={tag}
                          data-testid={`tag-step3-${tag}`}
                          onClick={() => handleTagSelect(tag)}
                          disabled={selectedTags.includes(tag)}
                          className={`px-3 py-2 rounded-full text-[13px] border transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-sky-100 border-sky-300 text-sky-600"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {chatMessages.filter(m => m.type === 'user').slice(2, 3).map((msg, idx) => (
                    <div key={idx} className="flex justify-end mb-4">
                      <div className="bg-sky-400 text-white px-4 py-2 rounded-2xl text-[14px]">
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Step 4: Complete */}
              {chatStep >= 3 && (
                <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                  <p className="text-[14px] text-gray-700 mb-3">
                    성향 분석이 완료되었습니다! 취향에 맞는 여행지를 추천해 드릴게요.
                  </p>
                  <button
                    onClick={handleCloseAiChat}
                    data-testid="button-complete-analysis"
                    className="w-full h-[44px] bg-sky-500 text-white rounded-lg text-[15px] font-medium"
                  >
                    추천 받기
                  </button>
                </div>
              )}
            </main>

            {/* Input Area */}
            <div className="h-[60px] bg-white border-t border-gray-100 flex items-center px-4 gap-3">
              <button className="text-gray-400 text-xl">+</button>
              <div className="flex-1 h-[40px] bg-gray-100 rounded-full px-4 flex items-center">
                <input
                  type="text"
                  placeholder="메시지 보내기"
                  className="flex-1 bg-transparent text-[14px] outline-none"
                  data-testid="input-chat-message"
                />
                <button className="text-gray-400 text-lg">:)</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
