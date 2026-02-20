import {
  ChevronLeft,
  MoreVertical,
  Eye,
  Heart,
  Bookmark,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

import beachImg from "@assets/stock_images/winter_sea_beach_66cbd965.jpg";
import cafeImg from "@assets/stock_images/winter_sea_beach_66cbd965.jpg";

export default function Community2Page() {
  const [, setLocation] = useLocation();

  const comments = [
    {
      id: 1,
      author: "홍길동",
      location: "논현동",
      time: "2시간전",
      content:
        "저도 이 코스 혼자 갈까 말까 고민했는데\n글 보고 더 끌리네요.\n시간만 맞으면 같이 가고 싶어요!",
      avatar: cafeImg,
    },
    {
      id: 2,
      author: "김땡땡",
      location: "논현동",
      time: "2시간전",
      content:
        "여기 예전부터 가보고 싶었는데\n혼자 가긴 애매했어요.\n같이 가면 훨씬 재밌을 것 같아요",
      avatar: cafeImg,
    },
  ];

  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen bg-white pb-[80px] shadow-2xl relative flex flex-col overflow-x-hidden">

        {/* Header */}
        <header className="flex items-center justify-between px-5 h-[60px] bg-white sticky top-0 z-[100] border-b border-gray-50">
          <Link href="/community">
            <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">함께해요</h1>
          <div className="w-6" />
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {/* 작성자 정보 */}
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={cafeImg} />
                <AvatarFallback>홍</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-gray-900">
                  홍길동
                </span>
                <span className="text-[12px] text-gray-400">
                  2026.01.02 18:01
                </span>
              </div>
            </div>
            <span className="text-[12px] text-gray-400">2시간 전</span>
          </div>

          {/* 메인 이미지 */}
          <div className="px-5 mb-4">
            <img
              src={beachImg}
              alt="Post"
              className="w-full aspect-square object-cover rounded-[16px]"
            />
          </div>

          {/* 본문 텍스트 */}
          <div className="px-5 mb-6">
            <p className="text-[15px] text-gray-800 leading-relaxed">
              이 코스 혼자 가봤는데, 다음엔 같이 가도 좋을 듯
            </p>
          </div>

          {/* 포스트 통계 */}
          <div className="px-5 mb-8 flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-5 h-5" />
              <span className="text-[14px]">70</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5" />
              <span className="text-[14px]">10</span>
            </div>
            <div className="flex items-center gap-1">
              <Bookmark className="w-5 h-5" />
              <span className="text-[14px]">60</span>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="px-5 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-bold text-gray-900">
                댓글 (6)
              </h2>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="best"
                    className="
                      w-4 h-4
                      border-sky-500
                      data-[state=checked]:bg-sky-500
                      data-[state=checked]:border-sky-500
                      data-[state=checked]:text-white
                    "
                  />
                  <label
                    htmlFor="best"
                    className="text-[12px] text-gray-400 font-medium"
                  >
                    BEST댓글
                  </label>
                </div>
                
              </div>
            </div>

            <div className="flex flex-col gap-8 mb-8">
              {comments.map((c) => (
                <div key={c.id} className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={c.avatar} />
                        <AvatarFallback>{c.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[13px] font-bold">{c.author}</p>
                        <p className="text-[11px] text-gray-400">
                          {c.location} · {c.time}
                        </p>
                      </div>
                    </div>
                    <MoreVertical className="w-4 h-4 text-gray-300" />
                  </div>

                  <p className="pl-11 text-[14px] whitespace-pre-wrap">
                    {c.content}
                  </p>

                  <div className="pl-11">
                    <button className="text-[12px] text-gray-400 font-bold">
                      답글쓰기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* 댓글 입력창 */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 py-3 bg-white border-t border-gray-100 flex items-center gap-3 z-[150]">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-gray-50 text-gray-500 text-[12px]">
              나
            </AvatarFallback>
          </Avatar>
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-[14px] outline-none placeholder:text-gray-400"
            data-testid="input-comment"
          />
          <button
            className="w-[60px] h-[36px] bg-sky-500 text-white text-[14px] font-medium rounded-full hover:bg-sky-600 active:bg-sky-700 transition-colors"
            data-testid="button-send-comment"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
