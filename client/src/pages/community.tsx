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

import cafeImg1 from "@assets/stock_images/cozy_korean_cafe_int_30540cfd.jpg";
import cafeImg2 from "@assets/stock_images/cozy_comic_book_cafe_e96dcdc1.jpg";
import cafeImg3 from "@assets/stock_images/modern_art_gallery_e_6114cef1.jpg";

const categories = ["전체", "궁금해요", "얼마예요", "함께해요"];

const featuredPosts = [
  {
    id: 1,
    tag: "공지사항",
    title: "처음 오셨다면, 이렇게 이용해보세요.",
    bgColor: "bg-sky-500",
    textColor: "text-white",
  },
  {
    id: 2,
    tag: "궁금해요",
    title: "성수에서 부모님이랑 가기 좋은 코스 있을까요?",
    bgColor: "bg-gray-50",
    textColor: "text-gray-900",
    views: 672,
    comments: 15,
  },
  {
    id: 3,
    tag: "준비중",
    title: "곧 새로운 이야기들이 올라와요",
    bgColor: "bg-gray-50",
    textColor: "text-gray-400",
  },
];

const listPosts = [
  {
    id: 1,
    tag: "함께해요",
    title: "오늘 날씨 좋아서 그냥 나가고 싶네요",
    desc: "혼자 가려다 글 남겨봐요",
    views: 672,
    comments: 15,
    image: cafeImg3,
  },
  {
    id: 2,
    tag: "함께해요",
    title: "성수 카페 같이 가실 분?",
    desc: "사진 찍는 거 좋아해요",
    views: 421,
    comments: 9,
    image: cafeImg1,
  },
  {
    id: 3,
    tag: "함께해요",
    title: "조용한 카페 추천해주세요",
    desc: "혼자 작업할 곳 찾고 있어요",
    views: 198,
    comments: 3,
    image: cafeImg3,
  },
];

export default function CommunityPage() {
  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      {/* 홈과 동일한 여백 pb-[100px] 설정 */}
      <div className="w-full max-w-[430px] min-h-screen bg-white pb-[100px] shadow-2xl relative flex flex-col overflow-x-hidden">

        {/* Header - 홈과 동일한 border-b 적용 */}
        <header className="flex items-center justify-between px-5 h-[60px] bg-white sticky top-0 z-[100] border-b border-gray-50">
          <h1 className="text-[22px] font-bold text-gray-900">커뮤니티</h1>
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-gray-800 cursor-pointer" />
            <Menu className="w-6 h-6 text-gray-800 cursor-pointer" />
          </div>
        </header>

        {/* Tabs */}
        <nav className="flex border-b border-gray-100 bg-white sticky top-[60px] z-[90]">
          {categories.map((cat, idx) => (
            <Link
              key={cat}
              href={cat === "전체" ? "/community" : "/community1"}
              className="flex-1"
            >
              <button
                className={`w-full py-4 text-[15px] font-medium relative text-center ${
                  idx === 0 ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {cat}
                {idx === 0 && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[2px] bg-gray-900" />
                )}
              </button>
            </Link>
          ))}
        </nav>

        {/* Main Scroll Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Featured Section */}
          <section className="p-5 mt-4">
            <h2 className="text-[22px] font-bold mb-6 text-gray-900">
              요즘 다들 이렇게 놀아요
            </h2>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`w-[170px] h-[170px] shrink-0 rounded-[10px] p-4 flex flex-col justify-between border border-gray-100 shadow-sm ${post.bgColor}`}
                >
                  <div>
                    <span className={`text-[13px] font-medium ${post.textColor}`}>
                      {post.tag}
                    </span>
                    <h3 className={`mt-2 text-[15px] font-medium leading-[1.4] break-keep ${post.textColor}`}>
                      {post.title}
                    </h3>
                  </div>

                  {post.views && (
                    <div className="flex gap-3 text-[13px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {post.comments}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* List */}
          <section>
            {listPosts.map((post) => (
              <Link key={post.id} href="/community2">
                <div className="px-5 py-6 border-b border-gray-50 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <span className="text-[13px] text-gray-400 block mb-1">
                      {post.tag}
                    </span>
                    <h3 className="text-[15px] font-medium mb-1 text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-[14px] text-gray-500 mb-4">
                      {post.desc}
                    </p>
                    <div className="flex gap-3 text-[13px] text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
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
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </main>

        {/* FAB - 하단 바 위에 떠 있는 글쓰기 버튼 */}
        <div className="fixed bottom-[110px] right-6 z-[150] sm:right-[calc(50%-190px)]">
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
          <div className="w-[40px]" />

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