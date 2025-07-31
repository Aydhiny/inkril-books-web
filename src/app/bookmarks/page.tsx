"use client";

import { BookMarked } from "lucide-react";

const exampleBookmarks = [
  {
    bookTitle: "Meditations",
    content:
      "You have power over your mind - not outside events. Realize this, and you will find strength.",
    location: "Page 85",
    date: "2025-07-30",
  },
  {
    bookTitle: "Sapiens",
    content:
      "You could never convince a monkey to give you a banana by promising him limitless bananas after death in monkey heaven.",
    location: "Chapter 3",
    date: "2025-07-28",
  },
  {
    bookTitle: "The Great Gatsby",
    content:
      "So we beat on, boats against the current, borne back ceaselessly into the past.",
    location: "Last Page",
    date: "2025-07-27",
  },
];

export default function page() {
  return (
    <main className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        <BookMarked className="w-6 h-6 text-indigo-500" />
        Bookmarks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exampleBookmarks.map((bookmark, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl bg-white p-4 flex flex-col justify-between"
          >
            <div className="mb-3">
              <p className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">
                {bookmark.bookTitle}
              </p>
              <p className="text-gray-800 font-medium leading-relaxed text-sm">
                “{bookmark.content}”
              </p>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{bookmark.location}</span>
              <span>{bookmark.date}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
