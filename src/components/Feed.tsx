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
      {/* ================= CAROUSEL ================= */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg">

        {/* Only render active slide */}
        <div className="relative w-full h-full">
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
            {isStaff && (
              <button
                onClick={() => setEditing({ type: "slide", index: current })}
                className="absolute top-4 right-4 bg-white text-black p-2 rounded-full shadow-lg"
              >
                <Pencil size={16} />
              </button>
            )}

            <h2 className="text-3xl font-bold">
              {slides[current].title}
            </h2>
            <p className="mt-2 text-lg">
              {slides[current].description}
            </p>
          </div>
        </div>

      </div>

      {/* ================= NEWS ================= */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Newspaper className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold">Campus News</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow relative"
            >
              {isStaff && (
                <button
                  onClick={() => setEditing({ type: "news", index })}
                  className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full shadow"
                >
                  <Pencil size={16} />
                </button>
              )}

              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-lg p-6 rounded-xl relative">

            <button
              onClick={closeModal}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Content</h2>

            {editing.type === "slide" && (
              <>
                {/* Drag & Drop Upload Square */}
                <div
                  className="w-96 h-36 mx-auto mb-4 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition relative overflow-hidden"
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
                    <span className="text-gray-400 text-sm text-center px-4">
                      Drag & Drop Image
                      <br />
                      or Click to Upload
                    </span>
                  )}

                  {/* Hidden File Input */}
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
              </>
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
              className="w-full border p-2 rounded mb-3"
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
              className="w-full border p-2 rounded mb-4"
              placeholder="Content"
            />

            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Done
            </button>

          </div>
        </div>
      )}
    </div>
  );
}