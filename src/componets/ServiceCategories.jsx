import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Zap, Car, Scissors, Hammer, Paintbrush, Wind, Tv } from 'lucide-react';


const categories = [
  {
    icon: Wrench,
    title: 'Plumber',
    description: 'Pipe repairs, installations & maintenance',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100'
  },
  {
    icon: Zap,
    title: 'Electrician',
    description: 'Wiring, fixtures & electrical repairs',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    hoverColor: 'hover:bg-yellow-100'
  },
  {
    icon: Car,
    title: 'Mechanic',
    description: 'Vehicle repairs & maintenance',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    hoverColor: 'hover:bg-red-100'
  },
  {
    icon: Scissors,
    title: 'Barber',
    description: 'Haircuts, styling & grooming',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100'
  },
  {
    icon: Hammer,
    title: 'Carpenter',
    description: 'Furniture, woodwork & installations',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    hoverColor: 'hover:bg-orange-100'
  },
  {
    icon: Paintbrush,
    title: 'Painter',
    description: 'Interior & exterior painting',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  },
  {
    icon: Wind,
    title: 'AC Technician',
    description: 'AC installation, repair & servicing',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    hoverColor: 'hover:bg-cyan-100'
  },
  {
    icon: Tv,
    title: 'TV Repair',
    description: 'TV & electronics repair services',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    hoverColor: 'hover:bg-indigo-100'
  }
];

const ServiceCategories = () => {
  const handleCategoryClick = (category) => {
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Popular Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Browse through our wide range of professional services available in your area
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => handleCategoryClick(category.title)}
                className={`${category.bgColor} ${category.hoverColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg group`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;