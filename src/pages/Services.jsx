import React from 'react'
import { assets } from '../assets/assets'
import ServicesDisplay from '../sections/ServicesDisplay'
import TypesOfSolars from '../sections/TypesOfSolars'
import TypesOfInverter from '../sections/TypesOfInverter'
import MalayalamSection from '../sections/MalayalamSection'
import AssuranceIcons from '../sections/AssuranceIcons'
import SolarServices from '../sections/SolarServices'
import InverterServices from '../sections/InverterServices'
import CctvSection from '../sections/CctvSection'
import CctvServices from '../sections/CctvServices'
import ServiceAreas from '../sections/ServiceAreas'
import { Helmet } from 'react-helmet-async'
import PdfDownload from '../sections/PdfDownload'


const Services = () => {

  const pdfs = [
    { id: "p1", title: "Battery", path: "/brochures/solaredgeinnovation-battery.pdf" },
    { id: "p2", title: "Inverter", path: "/brochures/solaredgeinnovation-inverter.pdf" },
    { id: "p3", title: "Solar", path: "/brochures/solaredgeinnovation-solar.pdf" },
  ];
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Our Services | Solar Edge Innovation - Solar Panels, Inverters, Batteries, CCTV</title>
        <meta
          name="description"
          content="Explore Solar Edge Innovation’s wide range of services including solar panels, inverters, batteries, and CCTV solutions for homes and businesses."
        />
        <meta
          name="keywords"
          content="solar panels, inverter, batteries, CCTV, solar energy solutions, sustainable energy, Solar Edge Innovation, security cameras, best solar in varkala, best inverter in varkala, best cctv in varkala, best solar in elakamon, best inverter in elakamon, best cctv in elakamon, best solar in onninmoodu, best inverter in onninmoodu, best cctv in onninmoodu, best solar in parippally, best inverter in parippally, best cctv in parippally, best solar in paravur, best inverter in paravur, best cctv in paravur, elakamon, onninmoodu, parippally, paravur, solar varkala, inverter varkala, cctv varkala, solar panel installation varkala, inverter battery varkala, cctv camera installation varkala, solar company varkala, inverter shop varkala, cctv dealers varkala, solar panel price in varkala, inverter service varkala, security cameras varkala, solar elakamon, inverter elakamon, cctv elakamon, solar onninmoodu, inverter onninmoodu, cctv onninmoodu, solar parippally, inverter parippally, cctv parippally, solar paravur, inverter paravur, cctv paravur, kollam, pthanamthitta, pathanamthitta, thrivananthapuram, trivandrum, varkala, ayroor, elakamon, solar trivandrum, solar edge trivandrum, solar varkala, solar kollam, solar store, inverter kollam, inverter paripally, inverter parippally, battery varkala, camera pathanamthita, camera pathanamthitta, cctv kollam, solar pthanamthitta, solar pathanamthitta, solar edge kollam, solar edge pathanamthitta, solar edge varkala, solar edge thrivananthapuram, solar ayroor, inverter ayroor, battery ayroor, cctv ayroor, inverter trivandrum, inverter pathanamthitta, battery trivandrum, battery kollam, camera trivandrum, camera kollam, camera varkala, cctv trivandrum, cctv pathanamthitta, cctv varkala, cctv elakamon, solar store kollam, solar store trivandrum, solar store varkala"
        />
        <link rel="canonical" href="https://www.solaredgeinnovation.in/services" />

        {/* Social Media Preview */}
        <meta property="og:title" content="Our Services | Solar Edge Innovation - Solar Panels, Inverters, Batteries, CCTV" />
        <meta property="og:description" content="Discover our services: solar panels, inverters, batteries, and CCTV solutions for sustainable and reliable energy." />
        <meta property="og:image" content="https://www.solaredgeinnovation.in/logo.png" />
        <meta property="og:url" content="https://www.solaredgeinnovation.in/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Solar Edge Innovation - Services",
  "url": "https://www.solaredgeinnovation.in/services",
  "description": "Comprehensive solar, inverter, battery, and CCTV services for homes and businesses in Kerala.",
  "itemListElement": [
    {
      "@type": "Service",
      "name": "Solar Panel Installation",
      "url": "https://www.solaredgeinnovation.in/services",
      "description": "Professional installation of high-efficiency solar panels for homes, businesses, and industries in Kerala.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Solar Edge Innovation",
        "telephone": "+919526801406",
        "email": "solaredgeinnovations25@gmail.com"
      },
      "areaServed": [
        "Kerala",
        "Thiruvananthapuram",
        "Trivandrum",
        "TVM",
        "Kollam",
        "Parippally",
        "Varkala",
        "Elakamon",
        "Onninmoodu",
        "Paravoor",
        "Attingal",
        "Kallambalam"
      ]
    },
    {
      "@type": "Service",
      "name": "Solar Battery Backup Installation",
      "url": "https://www.solaredgeinnovation.in/services",
      "description": "Reliable battery backup solutions for uninterrupted power supply using long-lasting solar batteries.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Solar Edge Innovation"
      },
      "areaServed": [
        "Kerala",
        "Thiruvananthapuram",
        "Trivandrum",
        "TVM",
        "Kollam",
        "Parippally",
        "Varkala",
        "Elakamon",
        "Onninmoodu",
        "Paravoor",
        "Attingal",
        "Kallambalam"
      ]
    },
    {
      "@type": "Service",
      "name": "Inverter Installation & Repair",
      "url": "https://www.solaredgeinnovation.in/services",
      "description": "Top-quality inverter installation, repair, and maintenance services for homes and commercial buildings.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Solar Edge Innovation"
      },
      "areaServed": [
        "Kerala",
        "Thiruvananthapuram",
        "Trivandrum",
        "TVM",
        "Kollam",
        "Parippally",
        "Varkala",
        "Elakamon",
        "Onninmoodu",
        "Paravoor",
        "Attingal",
        "Kallambalam"
      ]
    },
    {
      "@type": "Service",
      "name": "CCTV & Security Camera Installation",
      "url": "https://www.solaredgeinnovation.in/services",
      "description": "Professional CCTV camera setup, wiring, and maintenance for enhanced home and business security.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Solar Edge Innovation"
      },
      "areaServed": [
        "Kerala",
        "Thiruvananthapuram",
        "Trivandrum",
        "TVM",
        "Kollam",
        "Parippally",
        "Varkala",
        "Elakamon",
        "Onninmoodu",
        "Paravoor",
        "Attingal",
        "Kallambalam"
      ]
    },
    {
      "@type": "Service",
      "name": "Solar Maintenance & AMC",
      "url": "https://www.solaredgeinnovation.in/services",
      "description": "Scheduled solar maintenance, cleaning, and annual maintenance contracts to improve lifespan and efficiency.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Solar Edge Innovation"
      },
      "areaServed": [
        "Kerala",
        "Thiruvananthapuram",
        "Trivandrum",
        "TVM",
        "Kollam",
        "Parippally",
        "Varkala",
        "Elakamon",
        "Onninmoodu",
        "Paravoor",
        "Attingal",
        "Kallambalam"
      ]
    }
  ]
}
`}
        </script>

      </Helmet>

      <div className="bg-[#fafafa]">
        <div
          className="w-full mt-30 min-h-[65vh] flex flex-col items-center justify-center px-5 sm:px-7 xl:px-20 relative"
          style={{
            backgroundImage: `url(${assets.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
          }}
        >
          {/* White Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 1,
            }}
          />

          {/* Content Section */}
          <div className="flex flex-col xl:flex-row items-center justify-between mt-12 gap-12 relative z-10">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
                We deliver{" "}
                <span className="font-semibold text-gray-900">reliable </span>, sustainable energy
                <br className="hidden md:inline" />
                from solar panels to battery storage{" "}
                <span className="font-semibold text-gray-900">designed for your</span>
                <br className="hidden md:inline" />
                <span className="font-semibold text-gray-900">home and future.</span>
              </p>
            </div>

            <div className="relative w-full text-center flex justify-center lg:justify-end mt-8 lg:mt-0">
              <h1
                className="font-extrabold text-7xl sm:text-9xl md:text-[190px] lg:text-[250px] leading-none text-gray-900"
                style={{
                  WebkitTextStroke: '0px black',
                  color: 'transparent',
                  backgroundImage: `url(${assets.transparentbackground})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                }}
              >
                Service
              </h1>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <AssuranceIcons />
        </div>

        <div className="pt-10 px-4 sm:px-8 md:px-16 lg:px-20">
          <ServicesDisplay />
        </div>

        <MalayalamSection />
        <PdfDownload files={pdfs} />
        <TypesOfSolars />
        <SolarServices />
        <TypesOfInverter />
        <InverterServices />
        <CctvSection />
        <CctvServices />
      </div>
    </>

  )
}

export default Services
