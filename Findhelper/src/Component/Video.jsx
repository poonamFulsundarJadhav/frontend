import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const videoUrls = [
  "https://www.youtube.com/embed/gbxk0WnTmEU?si=m9n6DrnpRWn066ga&amp;start=12",
  "https://www.youtube.com/embed/TQHW7gGjrCQ?si=cdi7EC0tBEft3eSR&amp;start=12",
  "https://www.youtube.com/embed/DrpFqBFyi30?si=u-3Vlq0GWIJrZQRT&amp;start=12",
  "https://www.youtube.com/embed/7dBHUFn8bQ4?si=jd8yStgJM4Ji4usO&amp;start=12"
];

const buttonLabels = ["Carpenter", "Teacher", "Plumber", "Pest Control"];

const Category = () => {
  const [playing, setPlaying] = useState(new Array(videoUrls.length).fill(false));

  const handlePlayPause = (index) => {
    const iframe = document.getElementById(`video-${index}`);
    const player = iframe.contentWindow;
    const isPlaying = playing[index];

    player.postMessage(`{"event":"command","func":"${isPlaying ? "pauseVideo" : "playVideo"}","args":""}`, '*');

    setPlaying(prevState => {
      const newPlaying = [...prevState];
      newPlaying[index] = !isPlaying;
      return newPlaying;
    });
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-full px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center text-white bg-gray-800 py-3 text-2xl font-bold mb-8">
          Our Demo Work
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
          {videoUrls.map((url, index) => (
            <div key={index} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg">
              <div
                className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-200"
                style={{ aspectRatio: '16 / 9' }}
              >
                <iframe
                  id={`video-${index}`}
                  width="100%"
                  height="100%"
                  src={url}
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <button
                  onClick={() => handlePlayPause(index)}
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  {buttonLabels[index]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
