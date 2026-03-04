import { useEffect, useState } from "react";
import { Newspaper, Pencil, X } from "lucide-react";

type Slide = {
  image: string;
  title: string;
  description: string;
};

type NewsItem = {
  title: string;
  content: string;
};

export default function Feed() {
  const [slides, setSlides] = useState<Slide[]>([
    {
      image: "/assets/img/startup.png",
      title: "Startup Excellence Award",
      description: "Team Alpha won 1st place in National Startup Summit.",
    },
    {
      image: "/assets/img/football.jpg",
      title: "Inter-College Sports Victory",
      description: "Sathyabama secured overall championship trophy.",
    },
    {
      image: "/assets/img/certificate.png",
      title: "Global Certification Milestone",
      description: "50+ students completed international certifications.",
    },
  ]);

  const [news, setNews] = useState<NewsItem[]>([
    {
      title: "Placement Eligibility Reminder",
      content: "Students must complete 16 tokens before final semester.",
    },
    {
      title: "New Internship Opportunities",
      content: "Summer internship portal now open for applications.",
    },
    {
      title: "Startup Pitch Event",
      content: "Register for the upcoming campus startup showcase.",
    },
  ]);

  const [current, setCurrent] = useState(0);

  const [editing, setEditing] = useState<{
    type: "slide" | "news";
    index: number;
  } | null>(null);

  const isStaff = localStorage.getItem("isStaff") === "2";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const closeModal = () => setEditing(null);

return (
  <div className="space-y-10">

    {/* ================= CAROUSEL ================= */}
    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg">

      <div className="relative w-full h-full">
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 text-white">
          {isStaff && (
            <button
              onClick={() => setEditing({ type: "slide", index: current })}
              className="absolute top-4 right-4 bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 p-2 rounded-full shadow-lg transition"
            >
              <Pencil size={16} />
            </button>
          )}

          <h2 className="text-3xl font-bold">
            {slides[current].title}
          </h2>
          <p className="mt-2 text-lg text-zinc-200">
            {slides[current].description}
          </p>
        </div>
      </div>
    </div>


    {/* ================= NEWS ================= */}
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="w-6 h-6 text-rose-600 dark:text-rose-400" />
        <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Campus News
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 relative transition hover:shadow-md"
          >
            {isStaff && (
              <button
                onClick={() => setEditing({ type: "news", index })}
                className="absolute top-3 right-3 bg-zinc-100 dark:bg-zinc-700 p-2 rounded-full shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
              >
                <Pencil size={16} className="text-zinc-700 dark:text-zinc-200" />
              </button>
            )}

            <h4 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
              {item.title}
            </h4>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>


    {/* ================= EDIT MODAL ================= */}
    {editing && (
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-zinc-900 w-[90%] max-w-lg p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 relative transition">

          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition"
          >
            <X />
          </button>

          <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
            Edit Content
          </h2>

          {editing.type === "slide" && (
            <div
              className="w-96 h-36 mx-auto mb-4 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-2xl flex items-center justify-center cursor-pointer hover:border-rose-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition relative overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  const updated = [...slides];
                  updated[editing.index].image = reader.result as string;
                  setSlides(updated);
                };
                reader.readAsDataURL(file);
              }}
              onClick={() => {
                document.getElementById("slideUpload")?.click();
              }}
            >
              {slides[editing.index].image ? (
                <img
                  src={slides[editing.index].image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-zinc-400 text-sm text-center px-4">
                  Drag & Drop Image
                  <br />
                  or Click to Upload
                </span>
              )}

              <input
                id="slideUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const updated = [...slides];
                    updated[editing.index].image = reader.result as string;
                    setSlides(updated);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
          )}

          <input
            type="text"
            value={
              editing.type === "slide"
                ? slides[editing.index].title
                : news[editing.index].title
            }
            onChange={(e) => {
              if (editing.type === "slide") {
                const updated = [...slides];
                updated[editing.index].title = e.target.value;
                setSlides(updated);
              } else {
                const updated = [...news];
                updated[editing.index].title = e.target.value;
                setNews(updated);
              }
            }}
            className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
            placeholder="Title"
          />

          <textarea
            value={
              editing.type === "slide"
                ? slides[editing.index].description
                : news[editing.index].content
            }
            onChange={(e) => {
              if (editing.type === "slide") {
                const updated = [...slides];
                updated[editing.index].description = e.target.value;
                setSlides(updated);
              } else {
                const updated = [...news];
                updated[editing.index].content = e.target.value;
                setNews(updated);
              }
            }}
            className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
            placeholder="Content"
          />

          <button
            onClick={closeModal}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition"
          >
            Done
          </button>

        </div>
      </div>
    )}
  </div>
);
}