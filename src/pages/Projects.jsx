import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "Residential Solar Installation",
      mainImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      category: "Solar",
      subCategory: "Solar On-Grid Systems",
      description: "Complete on-grid solar installation for residential property with high-efficiency panels.",
      images: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Commercial Hybrid Solar System",
      mainImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
      category: "Solar",
      subCategory: "Hybrid Solar Systems",
      description: "Advanced hybrid solar system with battery backup for commercial building.",
      images: [
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Off-Grid Solar Farm",
      mainImage: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop",
      category: "Solar",
      subCategory: "Off-Grid Solar Systems",
      description: "Large-scale off-grid solar installation for remote location.",
      images: [
        "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 4,
      title: "On-Grid Power Inverter System",
      mainImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
      category: "Inverter",
      subCategory: "On-Grid Inverter",
      description: "High-performance on-grid inverter installation for maximum efficiency.",
      images: [
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 5,
      title: "Hybrid Inverter Installation",
      mainImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
      category: "Inverter",
      subCategory: "Hybrid Inverter",
      description: "Smart hybrid inverter with battery management system.",
      images: [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 6,
      title: "Micro Inverter Setup",
      mainImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
      category: "Inverter",
      subCategory: "Micro Inverter",
      description: "Individual panel micro inverter installation for optimized performance.",
      images: [
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 7,
      title: "Security CCTV Camera Installation",
      mainImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop",
      category: "CCTV",
      subCategory: "CCTV Cameras",
      description: "Complete CCTV camera surveillance system installation.",
      images: [
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591213373537-c2a9eaa325ed?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 8,
      title: "NVR Surveillance System",
      mainImage: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
      category: "CCTV",
      subCategory: "NVR",
      description: "Network Video Recorder system for IP camera management.",
      images: [
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590642917317-c87d5aeb88c3?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 9,
      title: "DVR Security Monitoring",
      mainImage: "https://images.unsplash.com/photo-1591213373537-c2a9eaa325ed?w=800&h=600&fit=crop",
      category: "CCTV",
      subCategory: "DVR",
      description: "Digital Video Recorder setup for analog camera systems.",
      images: [
        "https://images.unsplash.com/photo-1591213373537-c2a9eaa325ed?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590642917317-c87d5aeb88c3?w=800&h=600&fit=crop"
      ]
    }
  ];

  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Solar', 'Inverter', 'CCTV'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`, { state: { project } });
  };

  return (
    <>
      {/* SEO Meta Tags for Projects Page */}
      <Helmet>
        <title>Our Projects | Solar Edge Innovation - Solar Installations, Inverters, Batteries, CCTV</title>
        <meta
          name="description"
          content="Browse Solar Edge Innovation's portfolio of projects, showcasing solar panel installations, inverters, batteries, and CCTV solutions for homes and businesses."
        />
        <meta
          name="keywords"
          content="solar projects, solar installations, inverters, batteries, CCTV solutions, sustainable energy projects, Solar Edge Innovation, renewable energy portfolio, best solar in varkala, best inverter in varkala, best cctv in varkala, best solar in elakamon, best inverter in elakamon, best cctv in elakamon, best solar in onninmoodu, best inverter in onninmoodu, best cctv in onninmoodu, best solar in parippally, best inverter in parippally, best cctv in parippally, best solar in paravur, best inverter in paravur, best cctv in paravur, elakamon, onninmoodu, parippally, paravur, solar varkala, inverter varkala, cctv varkala, solar panel installation varkala, inverter battery varkala, cctv camera installation varkala, solar company varkala, inverter shop varkala, cctv dealers varkala, solar panel price in varkala, inverter service varkala, security cameras varkala, solar elakamon, inverter elakamon, cctv elakamon, solar onninmoodu, inverter onninmoodu, cctv onninmoodu, solar parippally, inverter parippally, cctv parippally, solar paravur, inverter paravur, cctv paravur, kollam, pthanamthitta, pathanamthitta, thrivananthapuram, trivandrum, varkala, ayroor, elakamon, solar trivandrum, solar edge trivandrum, solar varkala, solar kollam, solar store, inverter kollam, inverter paripally, inverter parippally, battery varkala, camera pathanamthita, camera pathanamthitta, cctv kollam, solar pthanamthitta, solar pathanamthitta, solar edge kollam, solar edge pathanamthitta, solar edge varkala, solar edge thrivananthapuram, solar ayroor, inverter ayroor, battery ayroor, cctv ayroor, inverter trivandrum, inverter pathanamthitta, battery trivandrum, battery kollam, camera trivandrum, camera kollam, camera varkala, cctv trivandrum, cctv pathanamthitta, cctv varkala, cctv elakamon, solar store kollam, solar store trivandrum, solar store varkala"
        />
        <link rel="canonical" href="https://www.solaredgeinnovation.in/projects" />

        {/* Social Media Preview */}
        <meta property="og:title" content="Our Projects | Solar Edge Innovation - Solar Installations, Inverters, Batteries, CCTV" />
        <meta property="og:description" content="Explore our completed projects featuring solar panels, inverters, batteries, and CCTV solutions for reliable and sustainable energy." />
        <meta property="og:image" content="https://www.solaredgeinnovation.in/logo.png" />
        <meta property="og:url" content="https://www.solaredgeinnovation.in/projects" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#F8F8FA] to-gray-100 py-6 px-4 sm:px-8 md:px-16 lg:px-20">
        
        <div className="mx-auto mt-30">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Project Gallery</h1>
            <p className="text-gray-600 text-lg">Explore our latest work and designs</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                  filter === category
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => handleProjectClick(project)}
              >
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay with Sub-category */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block">
                      {project.subCategory}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects;