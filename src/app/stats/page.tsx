"use client";
import Image from "next/image";
import Streak from "../../../public/streak.png";
import Clock from "../../../public/clock.png";
import Trophy1 from "../../../public/trophy.png";
import Idea from "../../../public/idea.png";
// BookOpen is still used for recent reads
import { BookOpen } from "lucide-react";

const dummyStats = {
  currentStreak: 5,
  maxStreak: 21,
  totalMinutes: 320,
  achievements: ["First Flame", "Consistency Champ", "Bookworm"],
  ideasLogged: 13,
  contributions: Array(365)
    .fill(0)
    .map(() => Math.random() > 0.7),
  recentReads: [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      minutes: 45,
      date: "2025-07-30",
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      minutes: 60,
      date: "2025-07-29",
    },
    {
      title: "Meditations",
      author: "Marcus Aurelius",
      minutes: 30,
      date: "2025-07-28",
    },
  ],
  goals: [
    { name: "Read 5 books this month", current: 3, target: 5, unit: "books" },
    { name: "Read 1000 minutes", current: 320, target: 1000, unit: "minutes" },
  ],
  topCategories: [
    { name: "Philosophy", minutes: 120 },
    { name: "Sci-Fi", minutes: 90 },
    { name: "History", minutes: 70 },
    { name: "Biography", minutes: 40 },
  ],
};

export default function EloquencePage() {
  return (
    <main className="text-[#222] p-4 md:p-6 lg:p-8 w-full h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Streak + Minutes */}
        <section className="md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Streak,
              label: "Streak",
              value: `${dummyStats.currentStreak} Days`,
              sub: `Max: ${dummyStats.maxStreak}`,
            },
            {
              icon: Clock,
              label: "Minutes",
              value: dummyStats.totalMinutes,
              sub: "Total Eloquence Time",
            },
          ].map(({ icon, label, value, sub }, idx) => (
            <div
              key={idx}
              className="border-2 border-gray-200 rounded-2xl p-4 flex items-center space-x-3 bg-white"
            >
              <Image
                src={icon}
                alt={label}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <div>
                <h2 className="text-sm uppercase text-gray-500 font-medium">
                  {label}
                </h2>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Heatmap */}
        <section className="lg:col-span-8 border-2 border-gray-200 rounded-2xl p-4 bg-white flex flex-col">
          <h1 className="text-xl font-semibold text-indigo-700 mb-4">
            Eloquence Activity
          </h1>
          <div className="overflow-x-auto pb-2">
            <div className="grid grid-flow-col auto-cols-min gap-[3px]">
              {Array.from({ length: 53 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const i = weekIndex * 7 + dayIndex;
                    const isActive = dummyStats.contributions[i];
                    return (
                      <div
                        key={dayIndex}
                        className={`w-4 h-4 rounded-sm ${
                          isActive ? "bg-indigo-500" : "bg-indigo-100"
                        }`}
                        title={isActive ? "Active day" : "No activity"}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 self-end">
            10+ minutes daily = 1 eloquence point
          </p>
        </section>

        {/* Recent Reads */}
        <section className="lg:col-span-4 border-2 border-gray-200 rounded-2xl p-4 bg-white">
          <h2 className="text-lg font-semibold text-indigo-700 mb-3">
            Recent Reads
          </h2>
          <ul className="space-y-3 text-sm">
            {dummyStats.recentReads.map((read, i) => (
              <li key={i} className="flex items-start space-x-3">
                <BookOpen className="text-blue-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">{read.title}</p>
                  <p className="text-xs text-gray-500">
                    {read.author} &bull; {read.minutes} min &bull;{" "}
                    {read.date.substring(5)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Goals */}
        <section className="lg:col-span-4 border-2 border-gray-200 rounded-2xl p-4 bg-white">
          <h2 className="text-lg font-semibold text-indigo-700 mb-3">Goals</h2>
          <div className="space-y-4">
            {dummyStats.goals.map((goal, i) => (
              <div key={i} className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">{goal.name}</span>
                  <span className="text-gray-600 text-xs font-semibold">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(goal.current / goal.target) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ideas + Categories */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          <div className="border-2 border-gray-200 rounded-2xl p-4 flex items-center space-x-3 bg-white">
            <Image
              src={Idea}
              alt="Idea Icon"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <div>
              <h2 className="text-sm uppercase text-gray-500 font-medium">
                Ideas Logged
              </h2>
              <p className="text-3xl font-bold text-gray-800">
                {dummyStats.ideasLogged}
              </p>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-2xl p-4 bg-white flex-grow">
            <h2 className="text-lg font-semibold text-indigo-700 mb-3">
              Top Categories
            </h2>
            <ul className="space-y-2 text-sm">
              {dummyStats.topCategories.map((cat, i) => (
                <li key={i} className="flex justify-between text-gray-800">
                  <span className="font-medium">{cat.name}</span>
                  <span className="font-semibold text-indigo-600">
                    {cat.minutes}m
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Achievements */}
        <section className="lg:col-span-12 border-2 border-gray-200 rounded-2xl p-4 bg-white">
          <h2 className="text-lg font-semibold text-indigo-700 mb-4">
            Achievements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {dummyStats.achievements.map((title, idx) => (
              <div
                key={idx}
                className="border-2 border-indigo-100 rounded-lg px-3 py-3 text-center text-sm font-medium text-gray-700 flex flex-col items-center justify-center hover:bg-indigo-100 transition-colors"
              >
                <Image
                  src={Trophy1}
                  alt="Trophy"
                  width={24}
                  height={24}
                  className="w-6 h-6 mb-2 object-contain"
                />
                {title}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
