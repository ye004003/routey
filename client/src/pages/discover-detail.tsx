import {
  ChevronLeft,
  Heart,
  Share2,
} from "lucide-react";
import { Link } from "wouter";

import gangneungBannerImg from "@assets/강문해변_1769499927736.png";
import seaViewImg from "@assets/Rectangle_34625321.png";
import beachImg from "@assets/stock_images/winter_sea_beach_66cbd965.jpg";

export default function DiscoverDetailPage() {
  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen bg-white pb-[20px] shadow-2xl relative flex flex-col overflow-x-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-5 h-[60px] bg-white sticky top-0 z-[100] border-b border-gray-50">
          <Link href="/discover">
            <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">탐색</h1>
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-gray-800 cursor-pointer" />
            <Share2 className="w-5 h-5 text-gray-800 cursor-pointer" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Title Section */}
          <div className="px-5 py-6">
            <h2 className="text-[17px] font-bold text-gray-900 mb-1">
              낮에는 푸른 파도, 밤에는 빛나는 야경
            </h2>
            <p className="text-[14px] text-gray-400 font-light">
              강릉 여행을 위한 필수코스
            </p>
          </div>

          {/* Main Course Image */}
          <div className="px-5 mb-8">
            <img
              src={gangneungBannerImg}
              alt="강릉여행코스 DAY 1"
              className="w-full rounded-xl shadow-sm"
            />
          </div>

          {/* Quote Section */}
          <div className="flex flex-col items-center mb-8 px-8">
            <span className="text-2xl font-serif text-gray-300">“</span>
            <p className="text-[18px] font-bold text-gray-800 text-center mb-2">
              파도로 여는 한 해, 강릉에서
            </p>
            <span className="text-2xl font-serif text-gray-300 mt-2">”</span>
            
          </div>

          {/* Description Text */}
          <div className="px-6 mb-8 text-[14px] text-gray-600 leading-relaxed font-light text-center break-keep">
            연초의 강릉 여행은, 한 해의 첫 페이지를 바다로 여는 일이다. 차가운
            공기 속에서도 동해는 묵묵히 숨 쉬고, 파도는 어제의 피로를 벗어내듯
            잔잔히 부서진다. 해가 수평선 위로 고개를 들 때, 새해의 다짐들은
            말없이 마음속에 내려앉는다. 잘 해내겠다는 욕심보다, 꾸준히
            걸어가겠다는 다짐이 파도처럼 반복된다.
          </div>

          {/* [수정 포인트] Sub Image 1: h-[250px] 등 고정 높이 설정 가능 */}
          <div className="w-full h-[120px] overflow-hidden mb-10">
            <img
              src={seaViewImg}
              alt="Sea View"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Place Detail 1 */}
          <div className="text-center mb-8">
            <h3 className="text-[18px] font-bold text-gray-900 mb-1 mt-10">
              강문해변
            </h3>
            <p className="text-[14px] text-gray-400 font-light">
              바다랑 커피는 여기서
            </p>
          </div>

          {/* Place Image 1 */}
          <div className="px-5 mb-8">
            <img
              src={beachImg}
              alt="Gangmun Beach"
              className="w-full aspect-[4/5] object-cover rounded-lg"
            />
          </div>

          {/* Info Section */}
          <div className="px-5 pb-10">
            <div className="mb-6">
              <h4 className="text-[15px] font-bold text-gray-900 mb-3">
                교통안내
              </h4>
              <div className="space-y-2">
                <div className="flex text-[13px]">
                  <span className="w-16 text-gray-500">자가용</span>
                  <span className="text-gray-300 px-2">|</span>
                  <span className="text-gray-400">
                    강릉 시내에서 약 10분 거리, 주차가능
                  </span>
                </div>
                <div className="flex text-[13px]">
                  <span className="w-16 text-gray-500">대중교통</span>
                  <span className="text-gray-300 px-2">|</span>
                  <span className="text-gray-400">
                    시내버스 211번 이용 가능
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-gray-900 mb-3">
                이용안내
              </h4>
              <div className="flex text-[13px]">
                <span className="w-16 text-gray-500">이용안내</span>
                <span className="text-gray-300 px-2">|</span>
                <span className="text-gray-400">연중무휴 / 상시 개방</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
