import "./HomePage.css";
import { Link } from "react-router-dom";
import heroimage from "../assets/heroimage.jpg"; 

export default function HomePage() {
  return (
    <div className="cb-landing">

      {/* IMAGE ONLY */}
      <section className="cb-hero">
        <img
          className="cb-hero-img"
          src={heroimage}
          alt="CatalystBench Hero"
        />
      </section>

    
      <section className="cb-below-hero">
        <h1>Report Your Incident to CatalystBench Corporate</h1>

        <Link to="/register" className="cb-hero-btn">
          Get Started Here
        </Link>

        <p className="cb-hero-terms">
          *Welcome to CatalystBench. Additional terms may apply.
        </p>
      </section>

    </div>
  );
}