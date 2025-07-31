"use client";
import { useEffect, useState } from "react";

// Book type definition
interface Book {
  id: string;
  title: string;
  pdf: string;
  thumbnail: string;
}

const ITEMS_PER_PAGE = 6;

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const mockBooks: Book[] = [
      {
        id: "1",
        title: "The Art of War",
        pdf: "https://www.af.mil/Portals/1/documents/AFD-130904-064.pdf",
        thumbnail: "https://covers.openlibrary.org/b/id/10541545-L.jpg",
      },
      {
        id: "2",
        title: "Pride and Prejudice",
        pdf: "https://www.gutenberg.org/files/1342/1342-h/1342-h.htm",
        thumbnail: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
      },
      {
        id: "3",
        title: "1984",
        pdf: "https://www.george-orwell.org/1984/0.html",
        thumbnail: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      },
      {
        id: "4",
        title: "To Kill a Mockingbird",
        pdf: "https://www.pdfdrive.com/to-kill-a-mockingbird-e158726129.html",
        thumbnail: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
      },
      {
        id: "5",
        title: "The Great Gatsby",
        pdf: "https://www.planetebook.com/free-ebooks/the-great-gatsby.pdf",
        thumbnail: "https://covers.openlibrary.org/b/id/7352166-L.jpg",
      },
      {
        id: "6",
        title: "Moby Dick",
        pdf: "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm",
        thumbnail: "https://covers.openlibrary.org/b/id/5552160-L.jpg",
      },
      {
        id: "7",
        title: "War and Peace",
        pdf: "https://www.gutenberg.org/files/2600/2600-h/2600-h.htm",
        thumbnail: "https://covers.openlibrary.org/b/id/8231853-L.jpg",
      },
      {
        id: "8",
        title: "Crime and Punishment",
        pdf: "https://www.gutenberg.org/files/2554/2554-h/2554-h.htm",
        thumbnail: "https://covers.openlibrary.org/b/id/8232151-L.jpg",
      },
      {
        id: "9",
        title: "The Odyssey",
        pdf: "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        thumbnail: "https://covers.openlibrary.org/b/id/8232413-L.jpg",
      },
      {
        id: "10",
        title: "Don Quixote",
        pdf: "https://www.gutenberg.org/files/996/996-h/996-h.htm",
        thumbnail: "https://covers.openlibrary.org/b/id/8232471-L.jpg",
      },
    ];

    setTimeout(() => {
      try {
        setBooks(mockBooks);
        setLoading(false);
      } catch (e) {
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      }
    }, 1000);
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-indigo-500">
              My Book Library
            </h1>
            <p className="text-lg pt-2 text-zinc-400">
              Browse your favourite books. You can also upload & remove books
              from your library.
            </p>
          </div>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            Upload Book
          </button>
        </div>

        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {loading ? (
          <p className="text-center text-lg">Loading books...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedBooks.map((book) => (
                <div
                  key={book.id}
                  className="border border-gray-300 bg-white flex flex-col hover:border-indigo-500 transition duration-300 cursor-pointer rounded-md"
                  onClick={() => setSelectedBook(book)}
                >
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-t-md"
                  />
                  <div className="p-4 flex-grow flex flex-col">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                      {book.title}
                    </h2>
                    <button
                      className="mt-auto bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBook(book);
                      }}
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                  page === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                }`}
              >
                Previous
              </button>
              <p className="text-sm text-gray-700">
                Page {page} of {pageCount}
              </p>
              <button
                disabled={page === pageCount}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                  page === pageCount
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {selectedBook && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-white w-full max-w-5xl h-[90vh] relative rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-3 right-4 text-3xl font-bold text-gray-600 hover:text-red-600"
              aria-label="Close modal"
            >
              &times;
            </button>
            <iframe
              src={selectedBook.pdf}
              className="w-full h-full rounded-md"
              title={selectedBook.title}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
