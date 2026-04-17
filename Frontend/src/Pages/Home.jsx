import { Navbar } from "../Components/Navbar";
import { Hero } from "../Components/Hero";
import { Features } from "../Components/Features";
import { ProductCard } from "../Components/ProductCard";
import { About } from "../Components/About";
import { Footer } from "../Components/Footer";
import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <ProductCard />
      <About />
      <Footer />
    </>
  );
}

export default Home;
