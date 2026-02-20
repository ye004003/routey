import {
  Search,
  Menu,
  Eye,
  MessageSquare,
  PenLine,
  Home,
  Compass,
  MessageCircle,
  User,
  Plus,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

import cafeImg3 from "@assets/stock_images/modern_art_gallery_e_6114cef1.jpg";

const categories = ["전체", "궁금해요", "얼마예요", "함께해요"];

const listPosts = [
  {
    id: 1,
    tag: "궁금해요",
    title: "혼밥 하기 좋은 식당 어디인가요?",
    desc: "맛집 추천 받습니다",
    views: 672,
    comments: 15,
    image: cafeImg3,
  },
  {
    id: 2,
    tag: "궁금해요",
    title: "여러분의 오늘 점심 메뉴가 궁금해요!",
    desc: "다들 뭐 드셨는지",
    views: 672,
    comments: 15,
    image: cafeImg3,
  },
  {
    id: 3,
    tag: "궁금해요",
    title: "혼밥 하기 좋은 식당 어디인가요?",
    desc: "맛집 추천 받습니다",
    views: 672,
    comments: 15,
    image: cafeImg3,
  },
  {
    id: 4,
    tag: "궁금해요",
    title: "여러분의 오늘 점심 메뉴가 궁금해요!",
    desc: "다들 뭐 드셨는지",
    views: 672,
    comments: 15,
    image: cafeImg3,
  },
  {
    id: 5,
    tag: "궁금해요",
    title: "혼밥 하기 좋은 식당 어디인가요?",
    desc: "맛집 추천 받습니다",
    views: 672,
    comments: 15,
    image: cafeImg3,
  },
];

export default function Community1Page() {
  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl relative flex flex-col overflow-x-hidden">

        {/* Header */}
        <header className="flex items-center justify-between px-5 h-[60px] bg-white sticky top-0 z-[100] border-b border-gray-50">
          <h1 className="text-[22px] font-bold text-gray-900">커뮤니티</h1>
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 cursor-pointer text-gray-800" />
            <Menu className="w-6 h-6 cursor-pointer text-gray-800" />
          </div>
        </header>

        {/* Tabs */}
        <nav className="flex border-b border-gray-100 bg-white sticky top-[60px] z-[90]">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "전체" ? "/community" : "/community1"}
              className="flex-1"
            >
              <button
                className={`w-full py-4 text-[15px] font-medium relative text-center ${
                  cat === "궁금해요" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {cat}
                {cat === "궁금해요" && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[2px] bg-gray-900" />
                )}
              </button>
            </Link>
          ))}
        </nav>

        {/* Main Scroll Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-[120px]">
          <section>
            {listPosts.map((post) => (
              <Link key={post.id} href="/community2">
                <div className="px-5 py-6 border-b border-gray-50 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <span className="text-[12px] text-gray-400 block mb-1">
                      {post.tag}
                    </span>
                    <h3 className="text-[16px] font-medium mb-1 text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-[14px] text-gray-500 mb-4">
                      {post.desc}
                    </p>
                    <div className="flex gap-3 text-[13px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {post.comments}
                      </div>
                    </div>
                  </div>

                  <div className="w-[85px] h-[85px] rounded-[10px] overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={post.image}
                      alt="post thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </main>

        {/* FAB */}
        <div className="fixed bottom-[120px] right-6 z-[150] sm:right-[calc(50%-190px)]">
          <Button
            size="icon"
            className="w-[50px] h-[50px] bg-sky-400 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <PenLine className="w-6 h-6" />
          </Button>
        </div>

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
          <div className="w-[60px]" />

          <Link href="/community">
            <div className="flex flex-col items-center gap-1 text-sky-500 cursor-pointer">
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
