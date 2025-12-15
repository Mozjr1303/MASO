import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import News from '../components/News';
import Schedule from '../components/Schedule';
import Gallery from '../components/Gallery';
import Venue from '../components/Venue';
import Partners from '../components/Partners';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <main>
                <Hero />
                <About />
                <News />
                <Schedule />
                <Gallery />
                <Venue />
                <Partners />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
