import { useMemo, useState } from "react";
import {
  ChevronLeft,
  Share2,
  MessageCircle,
  Plus,
  Home,
  Compass,
  User,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import BIFF from "@assets/Schedule6.png";
import gyeongbokgungImg from "@assets/Schedule4.png";
import cafeImg from "@assets/Schedule5.png";
import seaImg from "@assets/Schedule1.png";
import dong from "@assets/Schedule2.png";
import road from "@assets/Schedule3.png";

type StepType = "make" | "compose" | "manage";

interface ScheduleItem {
  id: string;
  day: number;
  time: string;
  name: string;
  desc: string;
  durationText: string;
  imageUrl: string;
  location: string;
}

const INITIAL_DATA: ScheduleItem[] = [
  {
    id: "1",
    day: 1,
    time: "14:00",
    name: "해운대 해수욕장",
    desc: "바다 보면서 커피 테이크 아웃",
    durationText: "10분",
    imageUrl: seaImg,
    location: "해운대구",
  },
  {
    id: "2",
    day: 1,
    time: "15:30",
    name: "동백섬",
    desc: "가볍게 산책 한 바퀴",
    durationText: "20분",
    imageUrl: dong,
    location: "해운대구",
  },
  {
    id: "3",
    day: 1,
    time: "17:00",
    name: "해리단길",
    desc: "근처 카페, 맛집가기",
    durationText: "10분",
    imageUrl: road,
    location: "해운대구",
  },
  {
    id: "4",
    day: 2,
    time: "14:00",
    name: "광안리 해수욕장",
    desc: "바다 보며 아침 산책",
    durationText: "30분",
    imageUrl: gyeongbokgungImg,
    location: "수영구",
  },
  {
    id: "5",
    day: 2,
    time: "15:30",
    name: "국제시장",
    desc: "점심&간식먹기",
    durationText: "20분",
    imageUrl: cafeImg,
    location: "중구",
  },
  {
    id: "6",
    day: 2,
    time: "17:00",
    name: "BIFF 광장",
    desc: "여행 마무리하며 거리 구경",
    durationText: "30분",
    imageUrl: BIFF,
    location: "중구",
  },
];

const DAY_TIME_SLOTS: Record<number, string[]> = {
  1: ["14:00", "15:30", "17:00"],
  2: ["14:00", "15:30", "17:00"],
};

const REGIONS = [
  "서울",
  "부산",
  "제주",
  "강릉",
  "경주",
  "여수",
  "전주",
  "속초",
  "인천",
  "대구",
  "광주",
  "대전",
];

const PEOPLE_TYPES = [
  { key: "alone", label: "혼자" },
  { key: "couple", label: "연인" },
  { key: "friend", label: "친구" },
  { key: "family", label: "가족" },
];

function isSameDay(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function toDateOnlyTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function isBetweenExclusive(d: Date, a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  const t = toDateOnlyTime(d);
  const ta = toDateOnlyTime(a);
  const tb = toDateOnlyTime(b);
  const [min, max] = ta <= tb ? [ta, tb] : [tb, ta];
  return t > min && t < max;
}

function calcNights(start: Date, end: Date) {
  const s = toDateOnlyTime(start);
  const e = toDateOnlyTime(end);
  return Math.max(0, Math.round((e - s) / (1000 * 60 * 60 * 24)));
}

function formatRangeLabel(start: Date | null, end: Date | null) {
  if (!start) return "날짜를 선택하세요";
  const sm = start.getMonth() + 1;
  const sd = start.getDate();
  if (!end) return `${sm}.${sd} (당일치기)`;
  const em = end.getMonth() + 1;
  const ed = end.getDate();
  const nights = calcNights(start, end);
  if (nights === 0) return `${sm}.${sd} (당일치기)`;
  return `${sm}.${sd} ~ ${em}.${ed} (${nights}박)`;
}

function MakeStep({
  region,
  setRegion,
  date,
  people,
  setPeople,
  onNext,
  onOpenCalendar,
}: {
  region: string;
  setRegion: (r: string) => void;
  date: string;
  people: Record<string, number>;
  setPeople: (p: Record<string, number>) => void;
  onNext: () => void;
  onOpenCalendar: () => void;
}) {
  const [regionOpen, setRegionOpen] = useState(false);

  const totalPeople = Object.values(people).reduce((a, b) => a + b, 0);
  const isValid = region !== "" && date !== "" && totalPeople > 0;

  const handlePeopleChange = (key: string, delta: number) => {
    const aloneSelected = (people.alone || 0) === 1;

    if (aloneSelected && key !== "alone") return;

    if (key === "alone") {
      const next = delta > 0 ? 1 : 0;

      if (next === 1) {
        setPeople({ alone: 1, couple: 0, friend: 0, family: 0 });
      } else {
        setPeople({ ...people, alone: 0 });
      }
      return;
    }

    setPeople({
      ...people,
      [key]: Math.max(0, (people[key] || 0) + delta),
    });
  };

  return (
    <main className="flex-1 overflow-y-auto px-5 py-6 scrollbar-hide">
      <div className="mb-4">
        <button
          data-testid="dropdown-region"
          onClick={() => setRegionOpen(!regionOpen)}
          className="w-full h-[50px] bg-[#F8F9FA] rounded-lg px-4 flex items-center justify-between text-[15px] border border-gray-100"
        >
          <span className={region ? "text-gray-900" : "text-gray-400"}>
            {region || "지역 (선택)"}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              regionOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {regionOpen && (
          <div className="mt-2 bg-white border border-gray-100 rounded-lg shadow-sm p-3 grid grid-cols-4 gap-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                data-testid={`button-region-${r}`}
                onClick={() => {
                  setRegion(r);
                  setRegionOpen(false);
                }}
                className={`h-[40px] rounded-full text-[13px] font-medium transition-all border ${
                  region === r
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-sky-50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-[17px] font-bold text-gray-900 mb-4">
          누구와 함께 가시나요?
        </h3>
        <div className="flex flex-col gap-3">
          {PEOPLE_TYPES.map((type) => (
            <div
              key={type.key}
              className="flex items-center justify-between h-[50px] bg-[#F8F9FA] rounded-lg px-4 border border-gray-100"
            >
              <span className="text-[15px] text-gray-700">{type.label}</span>
              <div className="flex items-center gap-3">
                <button
                  data-testid={`button-people-minus-${type.key}`}
                  onClick={() => handlePeopleChange(type.key, -1)}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-[15px] font-medium w-6 text-center">
                  {people[type.key] || 0}
                </span>
                <button
                  data-testid={`button-people-plus-${type.key}`}
                  onClick={() => handlePeopleChange(type.key, 1)}
                  className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  +
                </button>
                <span className="text-[13px] text-gray-400 ml-1">선택</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <button
          data-testid="dropdown-date"
          onClick={onOpenCalendar}
          className="w-full h-[50px] bg-[#F8F9FA] rounded-lg px-4 flex items-center justify-between text-[15px] border border-gray-100"
        >
          <span className={date ? "text-gray-900" : "text-gray-400"}>
            {date || "날짜 (선택)"}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {!isValid && (
        <p className="text-center text-[15px] text-gray-400 mb-10 font-medium">
          지역과 날짜를 선택해 주세요.
          <br />
          일정 조건을 모두 선택하면 다음으로 이동할 수 있어요.
        </p>
      )}

      <div className="flex gap-3 mt-4">
        <button
          data-testid="button-reset"
          className="flex-1 h-[50px] border border-gray-200 rounded-lg text-[15px] text-gray-500 font-medium bg-white"
          onClick={() => {
            setRegion("");
            setPeople({ alone: 0, couple: 0, friend: 0, family: 0 });
          }}
        >
          선택 초기화
        </button>
        <button
          data-testid="button-next-step1"
          disabled={!isValid}
          onClick={onNext}
          className={`flex-1 h-[50px] rounded-lg text-[15px] font-medium transition-colors ${
            isValid
              ? "bg-sky-500 text-white hover:bg-sky-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </div>
    </main>
  );
}

function ComposeStep({
  totalPeople,
  onNext,
  onBack,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onConfirmRange,
}: {
  totalPeople: number;
  onNext: () => void;
  onBack: () => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (d: Date | null) => void;
  setEndDate: (d: Date | null) => void;
  onConfirmRange: (rangeText: string) => void;
}) {
  const today = new Date();
  const initialYear = startDate?.getFullYear() ?? today.getFullYear();
  const initialMonth = startDate?.getMonth() ?? today.getMonth();

  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);

  const monthLabel = `${viewYear}년 ${viewMonth + 1}월`;

  const handleSelect = (clicked: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
      return;
    }

    const c = toDateOnlyTime(clicked);
    const s = toDateOnlyTime(startDate);

    if (c < s) {
      setStartDate(clicked);
      setEndDate(null);
    } else if (c === s) {
      setEndDate(null);
    } else {
      setEndDate(clicked);
    }
  };

  const goPrevMonth = () => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const goNextMonth = () => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const effectiveEnd = endDate ?? startDate;
  const dateRangeText = formatRangeLabel(startDate, effectiveEnd);
  const canNext = !!startDate;

  const startOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = startOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: Array<Date | null> = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(viewYear, viewMonth, d));
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);

  return (
    <main className="flex-1 overflow-y-auto px-5 py-6 scrollbar-hide">
      <div className="text-center mb-6">
        <h3 className="text-[15px] text-gray-500 font-medium">
          날짜 및 인원 선택
        </h3>
      </div>

      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-[14px] text-gray-700">{dateRangeText}</span>
        </div>
        <button
          onClick={onBack}
          data-testid="button-change-date"
          className="text-[13px] text-sky-500 font-medium"
        >
          변경
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goPrevMonth}
            className="px-2 py-1 text-gray-400 hover:text-gray-700"
            aria-label="prev-month"
          >
            ‹
          </button>
          <h4 className="text-[15px] font-bold text-center">{monthLabel}</h4>
          <button
            type="button"
            onClick={goNextMonth}
            className="px-2 py-1 text-gray-400 hover:text-gray-700"
            aria-label="next-month"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((d, idx) => (
            <div
              key={d}
              className={`text-center text-[12px] font-medium ${
                idx === 0
                  ? "text-red-400"
                  : idx === 6
                    ? "text-blue-400"
                    : "text-gray-400"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {cells.map((cell, idx) => {
            if (!cell) return <div key={idx} className="h-[36px]" />;

            const isStart = isSameDay(cell, startDate);
            const isEnd = isSameDay(cell, endDate);
            const inRange = isBetweenExclusive(cell, startDate, endDate);
            const selected = isStart || isEnd;

            let shape = "rounded-full";
            if (inRange) shape = "rounded-none";
            if (isStart && endDate) shape = "rounded-l-full";
            if (isEnd && startDate) shape = "rounded-r-full";
            if (isStart && isEnd) shape = "rounded-full";

            const weekday = cell.getDay();
            const baseText =
              weekday === 0
                ? "text-red-400"
                : weekday === 6
                  ? "text-blue-400"
                  : "text-gray-700";

            const bg = selected
              ? "bg-sky-500 text-white"
              : inRange
                ? "bg-sky-100"
                : "";

            const hover = !selected && !inRange ? "hover:bg-gray-100" : "";

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(cell)}
                className={`h-[36px] text-[13px] flex items-center justify-center transition-colors ${shape} ${
                  bg ? bg : baseText
                } ${hover}`}
              >
                {cell.getDate()}
              </button>
            );
          })}
        </div>

        <h4 className="text-[15px] font-bold text-center mt-6 mb-1 text-gray-300">
          {viewMonth === 11 ? viewYear + 1 : viewYear}년{" "}
          {viewMonth === 11 ? 1 : viewMonth + 2}월
        </h4>
      </div>

      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-[14px] text-gray-700">인원 {totalPeople}</span>
        </div>
        <button
          onClick={onBack}
          data-testid="button-change-people"
          className="text-[13px] text-sky-500 font-medium"
        >
          변경
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          data-testid="button-reset-compose"
          className="flex-1 h-[50px] border border-gray-200 rounded-lg text-[15px] text-gray-500 font-medium bg-white"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
          }}
        >
          선택 초기화
        </button>
        <button
          disabled={!canNext}
          onClick={() => {
            if (!startDate) return;
            const end = endDate ?? startDate;
            onConfirmRange(formatRangeLabel(startDate, end));
            onNext();
          }}
          className={`flex-1 h-[50px] rounded-lg text-[15px] font-medium transition-colors ${
            canNext
              ? "bg-sky-500 text-white hover:bg-sky-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </div>
    </main>
  );
}

function Timeline({
  timeLabel,
  showEndLine,
}: {
  timeLabel: string;
  showEndLine: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center self-stretch pt-1 pb-6 w-[50px] flex-shrink-0">
      <div className="w-5 h-5 rounded-full border-2 border-sky-400 bg-white flex items-center justify-center z-10 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-sky-400" />
      </div>
      <span className="mt-1 text-[12px] font-medium text-sky-500">
        {timeLabel}
      </span>
      <div className="w-[2px] flex-1 bg-gray-100 mt-2 min-h-[38px]" />
      {showEndLine && <div className="w-[2px] h-[28px] bg-gray-100 -mt-1" />}
    </div>
  );
}

function SortableCard({ item }: { item: ScheduleItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const cardStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      className={`flex items-start gap-3 flex-1 min-w-0 ${
        isDragging ? "bg-white shadow-lg rounded-lg opacity-90" : ""
      }`}
    >
      <div className="w-[75px] h-[80px] rounded-[10px] overflow-hidden flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 pr-1">
        <h3 className="text-[18px] font-bold text-gray-900 truncate mb-0.5">
          {item.name}
        </h3>
        <p className="text-[15px] text-gray-500 truncate font-light mb-1">
          {item.desc}
        </p>
        <div className="flex items-center gap-3 text-[13px] text-gray-400">
          <div className="flex items-center gap-0.5">
            <MapPin className="w-3 h-3" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" />
            <span>{item.durationText}</span>
          </div>
        </div>
      </div>

      <button
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        type="button"
        data-testid={`drag-handle-${item.id}`}
        className="p-2 flex-shrink-0 touch-none cursor-grab active:cursor-grabbing"
      >
        <div className="grid grid-cols-3 gap-[3px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="w-[3px] h-[3px] rounded-full bg-gray-300"
            />
          ))}
        </div>
      </button>
    </div>
  );
}

function DaySection({
  day,
  items,
  sensors,
  onDragEnd,
}: {
  day: number;
  items: ScheduleItem[];
  sensors: ReturnType<typeof useSensors>;
  onDragEnd: (e: DragEndEvent, day: number) => void;
}) {
  const slots = DAY_TIME_SLOTS[day] ?? [];

  return (
    <div className={day === 1 ? "mb-12" : "mb-8"}>
      <h3 className="text-[16px] font-black text-gray-900 mb-3 tracking-wider">
        DAY {day}
      </h3>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => onDragEnd(e, day)}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col">
            {items.map((item, idx) => (
              <div key={item.id} className="flex items-start gap-3 py-3">
                <Timeline
                  timeLabel={slots[idx] ?? ""}
                  showEndLine={idx === items.length - 1}
                />
                <SortableCard item={item} />
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {day === 2 && (
        <div className="mt-4 mb-8 py-2">
          <p className="text-center text-[15px] text-gray-400 font-medium">
            이 일정으로 1박 2일 코스를 마무리해요.
          </p>
        </div>
      )}
    </div>
  );
}

function ManageStep({
  region,
  totalPeople,
  date,
}: {
  region: string;
  totalPeople: number;
  date: string;
}) {
  const [items, setItems] = useState<ScheduleItem[]>(INITIAL_DATA);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const tags = [
    "해운대",
    "광안리",
    "송정",
    "서면",
    "남포동",
    "흰여울",
    "초량",
    "기장",
  ];
  const visibleTags = isTagsExpanded ? tags : tags.slice(0, 4);

  const day1Items = useMemo(() => items.filter((i) => i.day === 1), [items]);
  const day2Items = useMemo(() => items.filter((i) => i.day === 2), [items]);

  const handleDragEnd = (event: DragEndEvent, day: number) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const dayItems = prev.filter((i) => i.day === day);
      const otherItems = prev.filter((i) => i.day !== day);

      const oldIndex = dayItems.findIndex((i) => i.id === active.id);
      const newIndex = dayItems.findIndex((i) => i.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const reordered = arrayMove(dayItems, oldIndex, newIndex);
      return [...otherItems, ...reordered];
    });
  };

  return (
    <main className="flex-1 overflow-y-auto px-5 py-5 scrollbar-hide">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-[22px] font-bold text-gray-900">
            {region || "부산"} 여행
          </h2>
          <span className="text-[12px] text-gray-400 font-light cursor-pointer">
            (편집)
          </span>
          <Share2 className="w-4 h-4 text-gray-400 ml-auto cursor-pointer" />
        </div>
        <p className="text-[13px] text-gray-500 font-light">
          {(region || "부산")}{date ? `, ${date}` : ""}, 인원 {totalPeople || 2}
        </p>
      </div>

      <div className="mb-7">
        <div className="grid grid-cols-4 gap-x-[1px] gap-y-[6px] transition-all duration-300 ease-in-out">
          {visibleTags.map((tag) => (
            <Badge
              key={tag}
              className="w-[80px] h-[33.5px] p-0 leading-none bg-sky-500 hover:bg-sky-600 text-white border-none rounded-md text-[15px] font-medium flex items-center justify-center"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <button
          onClick={() => setIsTagsExpanded(!isTagsExpanded)}
          className="w-full flex justify-center mt-3 text-gray-300"
          data-testid="button-toggle-tags"
        >
          {isTagsExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      <DaySection
        day={1}
        items={day1Items}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      />
      <DaySection
        day={2}
        items={day2Items}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      />

      <div className="flex gap-3 mt-2">
        <Button
          variant="outline"
          className="flex-1 h-[44px] border-gray-200 text-gray-600 font-medium rounded-lg"
          data-testid="button-add-place"
        >
          장소 추가
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-[44px] border-gray-200 text-gray-600 font-medium rounded-lg"
          data-testid="button-add-memo"
        >
          메모 추가
        </Button>
      </div>
    </main>
  );
}

export default function SchedulePage() {
  const [step, setStep] = useState<StepType>("make");

  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [people, setPeople] = useState<Record<string, number>>({
    alone: 0,
    couple: 0,
    friend: 0,
    family: 0,
  });

  const [, setLocation] = useLocation();
  const totalPeople = Object.values(people).reduce((a, b) => a + b, 0);

  const headerTitle =
    step === "make"
      ? "일정 만들기"
      : step === "compose"
        ? "일정 구성"
        : "일정 관리";

  const handleBack = () => {
    if (step === "manage") setStep("compose");
    else if (step === "compose") setStep("make");
    else setLocation("/");
  };

  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen bg-white pb-[100px] shadow-2xl relative flex flex-col">
        <header className="flex items-center justify-between px-5 h-[60px] bg-white border-b border-gray-100">
          <button onClick={handleBack} data-testid="button-back">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">{headerTitle}</h1>
          <div className="w-6" />
        </header>

        {step === "make" && (
          <MakeStep
            region={region}
            setRegion={setRegion}
            date={date}
            people={people}
            setPeople={setPeople}
            onNext={() => setStep("compose")}
            onOpenCalendar={() => setStep("compose")}
          />
        )}

        {step === "compose" && (
          <ComposeStep
            totalPeople={totalPeople}
            onNext={() => setStep("manage")}
            onBack={() => setStep("make")}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onConfirmRange={(rangeText) => setDate(rangeText)}
          />
        )}

        {step === "manage" && (
          <ManageStep region={region} totalPeople={totalPeople} date={date} />
        )}

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

        <Link
          href="/create-schedule"
          className="fixed bottom-[35px] left-1/2 -translate-x-1/2 z-[201]"
        >
          <div className="w-[60px] h-[60px] bg-sky-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform border-[4px] border-white">
            <Plus className="w-8 h-8 text-white stroke-[3px]" />
          </div>
        </Link>
      </div>
    </div>
  );
}
