import { useState } from 'react';

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'PartTime-Job', href: '#' },
  { name: 'Our Aim', href: '#' },
  { name: 'Meet our Team', href: '#' },
];
const stats = [
  { name: 'Offices All-India', value: '12' },
  { name: 'Full-time Worker', value: '300+' },
  { name: 'Hours per Day', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
];

export default function Example() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState('right'); // Track the direction of slide

  const slides = [
    { 
      title: 'Work with our Home-maid Team', 
      description: 'Professional home maid services, ensuring your home is spotless and inviting.', 
      img: 'https://media.istockphoto.com/id/1417833200/photo/happy-professional-cleaners-cleaning-a-bathroom-at-an-apartment.jpg?s=2048x2048&w=is&k=20&c=U7CoMVG6D4QWyXgC8-xlukhzAzyzaXRDLI1v_CEzKA0=',
      links, 
      stats 
    },
    { 
      title: 'Work with our Carpenter Team', 
      description: 'Expert carpentry services, transforming your space with precision and craftsmanship.', 
      img: 'https://plus.unsplash.com/premium_photo-1674852890869-045efbe8c54b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      links, 
      stats 
    },
    { 
      title: 'Work with our Plumber Team', 
      description: 'Reliable plumbing solutions to keep your water flowing smoothly and efficiently.', 
      img: 'https://media.istockphoto.com/id/1219060122/photo/side-view-of-handyman-working-on-installing-a-shower-bus-conversion.jpg?s=2048x2048&w=is&k=20&c=VV8IKn8wYIWtRUMIHzmT40JP3j9d1ybOQdTDA1Ctb5U=',
      links, 
      stats 
    },
  ];

  const handleNext = () => {
    setDirection('right');
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16 md:py-24 lg:py-32">
      <div 
        className={`absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center transition-transform duration-500 ${direction === 'right' ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundImage: `url(${slides[currentSlide].img})`, backgroundSize: 'cover' }}
      ></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white">{slides[currentSlide].title}</h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl leading-7 text-gray-300">{slides[currentSlide].description}</p>
        </div>
        <div className="mx-auto mt-8 md:mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10 justify-center md:justify-start">
            {slides[currentSlide].links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-10 md:mt-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {slides[currentSlide].stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse items-center md:items-start">
                <dt className="text-sm md:text-base leading-7 text-gray-300">{stat.name}</dt>
                <dd className="text-xl md:text-2xl lg:text-3xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex justify-between mt-8 md:mt-10">
          <button
            onClick={handlePrev}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            &larr; Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
