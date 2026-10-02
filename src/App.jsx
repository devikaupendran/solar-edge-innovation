import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import RotatingRings from './utils/RotatingRings';
import ProjectDetails from './pages/ProjectDetails';
import Lenis from 'lenis';
import PrivacyPolicy from './pages/LegalPrivacy';
import TermsOfService from './pages/TermsOfService';
import AdminPage from './pages/AdminPage';
import Contact from './pages/Contact';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash.substring(1));
                if (element) {
                    if (window.lenis) {
                        window.lenis.scrollTo(element, { duration: 1.2 });
                    } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 150);
        } else {
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }
        }
    }, [pathname, hash]);

    return null;
};

const AppContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    useEffect(() => {
        if (window.lenis) {
            if (isAdminRoute) {
                window.lenis.stop();
            } else {
                window.lenis.start();
            }
        }
    }, [isAdminRoute]);

    return (
        <>
            <ScrollToTop />
            {!isAdminRoute && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
            {!isAdminRoute && <Footer />}
        </>
    );
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutQuart
            smoothWheel: true,
            smoothTouch: false,
        });

        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        setTimeout(() => setIsLoading(false), 600);

        return () => {
            lenis.destroy();
            window.lenis = null;
        };
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <div className="min-h-screen w-full flex items-center justify-center bg-white">
                        <RotatingRings size="xl" message="Loading..." />
                    </div>
                ) : (
                    <AppContent />
                )
            }
        </>
    );

};

export default App;
