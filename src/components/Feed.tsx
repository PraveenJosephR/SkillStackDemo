import { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';

export default function Feed() {
  const slides = [
    {
      image: '/assets/img/startup.png',
      title: 'Startup Excellence Award',
      description: 'Team Alpha won 1st place in National Startup Summit.',
    },
    {
      image: '/assets/img/football.jpg',
      title: 'Inter-College Sports Victory',
      description: 'Sathyabama secured overall championship trophy.',
    },
    {
      image: '/assets/img/certificate.png',
      title: 'Global Certification Milestone',
      description: '50+ students completed international certifications.',
    },
  ];

  const news = [
    {
      title: 'Placement Eligibility Reminder',
      content: 'Students must complete 16 tokens before final semester.',
    },
    {
      title: 'New Internship Opportunities',
      content: 'Summer internship portal now open for applications.',
    },
    {
      title: 'Startup Pitch Event',
      content: 'Register for the upcoming campus startup showcase.',
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10">
      
      {/* Carousel */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="mt-2 text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* News Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Newspaper className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold">Campus News</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
