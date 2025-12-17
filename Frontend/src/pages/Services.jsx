import React from "react";
import { FaHospital, FaHotel, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      icon: <FaHospital size={36} />,
      title: "Nearby Hospitals",
      desc: "Locate hospitals, clinics, and emergency facilities anywhere in Maharashtra.",
      link: "/nearby-hospitals",
      external: false,
    },
    {
      id: 2,
      icon: <FaHotel size={36} />,
      title: "Accommodation",
      desc: "Find hotels, resorts, and homestays near your travel destinations.",
      link: "/accommodation",
      external: false,
    },
    {
      id: 3,
      icon: <FaUserTie size={36} />,
      title: "Guided Tours",
      desc: "Connect with verified local guides for heritage and cultural tours.",
      link: "/guides",
      external: false,
    },
  ];

  const handleServiceClick = (service) => {
    if (service.external) {
      window.open(service.link, "_blank");
    } else {
      window.open(service.link, "_blank"); 
    }
  };

  return (
    <section
      id="services"
      className="bg-linear-to-b from-white via-orange-50 to-white pt-16 pb-12 px-6 md:px-12 scroll-mt-20 border-t-4 border-green-400"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Assistance Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
         Making your travel simpler, safer, and more enjoyable.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-orange-400 shadow-sm hover:shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
