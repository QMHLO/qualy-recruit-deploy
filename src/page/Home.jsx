import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ToTopBtn from "../components/ToTopBtn";
import Loading from "../components/Loading";
import MvSection from "../section/MvSection";
import AboutSection from "../section/AboutSection";
import RequirmentSection from "../section/RequirmentSection";
import CareerSection from "../section/CareerSection";
import InterviewSection from "../section/InterviewSection";
import SnsSection from "../section/SnsSection";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay for demonstration purposes
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Cleanup function to clear the timeout in case component unmounts before the timeout
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MvSection />
          <AboutSection />
          <RequirmentSection />
          <CareerSection />
          <InterviewSection />
          <SnsSection />
          <Footer />
          <ToTopBtn />
        </>
      )}
    </>
  );
}

export default Home;
