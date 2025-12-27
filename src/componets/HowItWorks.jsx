import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search for Services',
    description: 'Browse or search for the service you need from our wide range of categories',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: UserCheck,
    title: 'Choose a Professional',
    description: 'Review profiles, ratings, and reviews to select the perfect service provider',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: CheckCircle,
    title: 'Book & Get It Done',
    description: 'Schedule your service and get the job done by verified professionals',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Get started in three simple steps and connect with the best professionals
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative`}>
                      <Icon className="w-10 h-10 text-white" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                        <span className="text-lg font-bold text-gray-900">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;