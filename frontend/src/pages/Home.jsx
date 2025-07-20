import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import ServicesSection from "../components/ServicesSection";

export default function Home(){
    return(
        <div>
             <Nav/>
          
            <Hero/>
            <ServicesSection/>
            <About/>
            <Footer/>
        </div>
    )
}