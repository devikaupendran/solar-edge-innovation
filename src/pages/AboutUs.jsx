import React from 'react';
import { assets } from '../assets/assets';
import MissionVisionValues from '../sections/MissionVisionValues';
import { motion } from 'framer-motion'
import ContactSection from '../sections/ContactSection';
import { Helmet } from "react-helmet-async";
import ProfileCard from '../sections/ProfileCard';

const AboutUs = () => {
    return (
        <>
            {/*  SEO Meta Tags */}
            <Helmet>
                <title>About Us | Solar Edge Innovation</title>
                <meta
                    name="description"
                    content="Learn about Solar Edge Innovation's mission to deliver reliable, sustainable solar energy solutions and smart technologies for homes and businesses."
                />
                <meta
                    name="keywords"
                    content="best solar panels in Kerala, affordable solar service Kerala, best solar company near me, solar panel installation Kerala, home solar solutions Kerala, solar power for home Kerala, solar energy service Kerala, solar battery Kerala, home solar battery Kerala, best solar batteries Kerala, affordable solar battery Kerala, reliable solar service Kerala, trusted solar company Kerala, solar maintenance Kerala, best CCTV cameras Kerala, CCTV installation near me, home security Kerala, affordable CCTV Kerala, CCTV service Kerala, security camera service Kerala, best solar in varkala, best inverter in varkala, best cctv in varkala, best solar in elakamon, best inverter in elakamon, best cctv in elakamon, best solar in onninmoodu, best inverter in onninmoodu, best cctv in onninmoodu, best solar in parippally, best inverter in parippally, best cctv in parippally, best solar in paravur, best inverter in paravur, best cctv in paravur, elakamon, onninmoodu, parippally, paravur, solar varkala, inverter varkala, cctv varkala, solar panel installation varkala, inverter battery varkala, cctv camera installation varkala, solar company varkala, inverter shop varkala, cctv dealers varkala, solar panel price in varkala, inverter service varkala, security cameras varkala, solar elakamon, inverter elakamon, cctv elakamon, solar onninmoodu, inverter onninmoodu, cctv onninmoodu, solar parippally, inverter parippally, cctv parippally, solar paravur, inverter paravur, cctv paravur, kollam, pthanamthitta, pathanamthitta, thrivananthapuram, trivandrum, varkala, ayroor, elakamon, solar trivandrum, solar edge trivandrum, solar varkala, solar kollam, solar store, inverter kollam, inverter paripally, inverter parippally, battery varkala, camera pathanamthita, camera pathanamthitta, cctv kollam, solar pthanamthitta, solar pathanamthitta, solar edge kollam, solar edge pathanamthitta, solar edge varkala, solar edge thrivananthapuram, solar ayroor, inverter ayroor, battery ayroor, cctv ayroor, inverter trivandrum, inverter pathanamthitta, battery trivandrum, battery kollam, camera trivandrum, camera kollam, camera varkala, cctv trivandrum, cctv pathanamthitta, cctv varkala, cctv elakamon, solar store kollam, solar store trivandrum, solar store varkala"
                />
                <link
                    rel="canonical"
                    href="https://www.solaredgeinnovation.in/about"
                />
                <meta property="og:title" content="About Us | Solar Edge Innovation" />
                <meta property="og:description" content="Discover how Solar Edge Innovation is transforming renewable energy through solar panels, inverters, and smart power solutions." />
                <meta property="og:image" content="https://www.solaredgeinnovation.in/logo.png" />
                <meta property="og:url" content="https://www.solaredgeinnovation.in/about" />
                <meta name="twitter:card" content="summary_large_image" />

                <script type="application/ld+json">
                    {`
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Solar Edge Innovation",
  "url": "https://www.solaredgeinnovation.in/about",
  "description": "Learn about Solar Edge Innovation’s mission and commitment to delivering reliable solar panels, inverters, batteries, and CCTV solutions across Kerala.",
  
  "mainEntity": {
    "@type": "Organization",
    "name": "Solar Edge Innovation",
    "url": "https://www.solaredgeinnovation.in/",
    "logo": "https://www.solaredgeinnovation.in/logo.png",
    "foundingDate": "2020",
    "description": "Solar Edge specializes in high-quality solar energy systems, security cameras, inverters, and custom energy solutions for homes and businesses.",
    
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Elakamon, Ayiroor, Varkala",
      "addressLocality": "Varkala",
      "addressRegion": "Kerala",
      "postalCode": "695310",
      "addressCountry": "IN"
    },

    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Kerala" },
      { "@type": "City", "name": "Thiruvananthapuram" },
      { "@type": "City", "name": "Trivandrum" },
      { "@type": "City", "name": "TVM" },
      { "@type": "City", "name": "Kollam" },
      { "@type": "City", "name": "Parippally" },
      { "@type": "City", "name": "Varkala" },
      { "@type": "City", "name": "Elakamon" },
      { "@type": "City", "name": "Onninmoodu" },
      { "@type": "City", "name": "Paravoor" },
      { "@type": "City", "name": "Attingal" },
      { "@type": "City", "name": "Kallambalam" }
    ],

    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+919526801406",
        "email": "solaredgeinnovations25@gmail.com",
        "contactType": "customer service",
        "availableLanguage": ["English", "Malayalam"]
      }
    ],

    "sameAs": [
      "https://maps.google.com?q=Elakamon,Ayiroor,Varkala"
    ]
  }
}
`}
                </script>

            </Helmet>

            <div className='mt-30 text-body bg-[#F8F8FA] w-full'>
                <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-7 xl:px-20"
                    style={{
                        backgroundImage: `url(${assets.bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                    }}>

                    {/* Optional overlay for better text readability */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            zIndex: 1,
                        }}>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mt-12 gap-12 relative z-10">
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                                We deliver <span className="font-semibold text-gray-900">reliable </span>, sustainable energy
                                from solar panels to battery storage <span className="font-semibold text-gray-900">designed for your</span><br className="hidden md:inline" />
                                <span className="font-semibold text-gray-900">home and future.</span>
                            </p>
                        </div>

                        <div className="relative w-full text-center flex justify-center lg:justify-end mt-8 lg:mt-0">
                            <h1
                                className="font-extrabold text-9xl md:text-[190px] lg:text-[250px] leading-none text-gray-900"
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
                                About
                            </h1>
                        </div>
                    </div>
                </div>



                <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 flex flex-col gap-3 text-justify">
                    <p
                        className="text-gray-700 leading-relaxed">
                        At Solar Edge, we are committed to powering your world with innovative and reliable
                        solutions. We specialize in providing top-quality solar energy systems, security cameras ,
                        and inverters tailored to meet the diverse needs of homes, businesses , and industries.
                    </p>

                    <motion.p
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.9, ease: "easeIn", delay: 0.2 }}
                        className="hidden md:block text-gray-700 leading-relaxed">
                        Beyond products, we deliver expert installation, regular maintenance, and responsive support—ensuring long-term performance, peace of mind, and sustainable value.
                    </motion.p>

                </div>
                <ProfileCard />

                <MissionVisionValues />
                <ContactSection />
            </div>
        </>

    );
};

export default AboutUs;




