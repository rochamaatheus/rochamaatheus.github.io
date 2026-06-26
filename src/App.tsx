import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Services } from "./components/Services";
import { CaseWesen } from "./components/CaseWesen";
import { Differentiators } from "./components/Differentiators";
import { Process } from "./components/Process";
import { Testimonial } from "./components/Testimonial";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <CaseWesen />
        <Differentiators />
        <Process />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
