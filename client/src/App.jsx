import { useState } from 'react'
import BookingForm from "./components/BookingForm";
import NumberCounter from "./components/NumberCounter";
import TreatmentCard from "./components/TreatmentCard";
import ScrollAnimation from "./components/ScrollAnimation";

function App() {
  return (
    <>
      <div className="topBar">
        <div className="container">
          <a href="https://www.google.com/maps/search/?api=1&query=Sarajevo" target="_blank" rel="noreferrer">
            <span>📍 Sarajevo, Bosnia and Herzegovina</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
      <div className="hero" id="home">
        <div className="container">
          <div className="heroInner newHeroLayout">
            {/* Left Nav */}
            <div className="heroNavCard left">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Start</a>
              <a href="#about" onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}>About Us</a>
              <a href="#team" onClick={(e) => {
                e.preventDefault();
                document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
              }}>Team</a>
            </div>

            {/* Center Title */}
            <div className="heroCenter">
              <h1 className="heroTitle">Beauty Salon</h1>
            </div>

            {/* Right Nav */}
            <div className="heroNavCard right">
              <a href="#treatments" onClick={(e) => {
                e.preventDefault();
                document.getElementById('treatments')?.scrollIntoView({ behavior: 'smooth' });
              }}>Treatments</a>
              <a href="#book-online" onClick={(e) => {
                e.preventDefault();
                document.getElementById('book-online')?.scrollIntoView({ behavior: 'smooth' });
              }}>Book</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </div>

      <div className="section belowHeroSection">
        <div className="belowHeroImage">
          <img src="/src/assets/salon_interior.png" alt="Our Salon" />
        </div>
        <div className="belowHeroContent">
          <div className="heroCard belowHeroStats">
            <div style={{ fontWeight: 900, fontSize: 24, marginBottom: 10 }}>Why clients choose us</div>
            <div style={{ color: "hsl(var(--muted-foreground))", marginBottom: 20, fontSize: 16 }}>
              Experience the difference with our premium services.
            </div>

            <div style={{ color: "hsl(var(--foreground))", fontSize: 16, marginBottom: 20, lineHeight: 1.6 }}>
              <strong>Hygiene first:</strong> We maintain hospital-grade sanitation. <br />
              <strong>Professional team:</strong> Certified experts in every treatment. <br />
              <strong>Organic products:</strong> Only the best for your skin and hair.
            </div>

            <div className="statRow">
              <div className="stat">
                <div className="statNum">
                  <NumberCounter end={200} suffix="+" duration={5000} />
                </div>
                <div className="statLabel">Monthly clients</div>
              </div>
              <div className="stat">
                <div className="statNum">
                  <NumberCounter end={10} suffix="+" duration={5000} />
                </div>
                <div className="statLabel">Years of experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section" id="about">
        <div className="container aboutGrid">
          <div>
            <h2 className="sectionTitle">Our Story</h2>
            <p className="sectionLead">
              Beauty Hub is a hair & beauty salon with years of experience in the beauty industry.
              Our treatments are designed to refresh you and highlight your natural beauty.
            </p>
            <p className="sectionLead" style={{ marginTop: 20 }}>
              We believe in the power of relaxation and self-care. Our dedicated team ensures
              that every visit is a step towards a healthier, happier you.
            </p>
          </div>

          <div className="aboutCollage">
            <ScrollAnimation direction="right" distance="100px">
              <img src="/src/assets/collage_facial_1767512497249.png" alt="Facial Treatment" />
            </ScrollAnimation>
            <ScrollAnimation direction="right" distance="150px" duration="1s">
              <img src="/src/assets/collage_nails_1767512510371.png" alt="Nails" />
            </ScrollAnimation>
            <ScrollAnimation direction="right" distance="200px" duration="1.2s">
              <img src="/src/assets/collage_products_1767512524845.png" alt="Products" />
            </ScrollAnimation>
          </div>
        </div>
      </div>

      <div className="section" id="treatments" style={{ background: 'linear-gradient(to bottom, hsl(var(--background)), hsl(var(--secondary)))' }}>
        <div className="container">
          <h2 className="sectionTitle">Treatments</h2>
          <p className="sectionLead">
            Choose a category — click on a card to learn more.
          </p>

          <div className="grid">
            {[
              {
                title: "Permanent Make-Up",
                text: "Long-lasting beauty, natural results.",
                details: "Using precision techniques to enhance eyebrows, lips, and eyeliner for a subtle, natural look that lasts years.",
                price: "€90 - €200"
              },
              {
                title: "Facial Treatments",
                text: "Glow and refresh your skin.",
                details: "Customized facials using organic products to cleanse, exfoliate, and hydrate your skin for a radiant glow.",
                price: "€40 - €400"
              },
              {
                title: "Nails",
                text: "A polished look for every style.",
                details: "Manicures ranging from basic care to elaborate gel designs, ensuring your hands look their absolute best.",
                price: "€20 - €60"
              },
              {
                title: "Lash Lift",
                text: "Lift and shape your natural lashes.",
                details: "A keratin-infused treatment that lifts and curls your natural lashes, making them look longer and fuller without extensions.",
                price: "€30 - €50"
              },
              {
                title: "Pedicure",
                text: "Beautiful feet for every season.",
                details: "Relaxing foot baths, exfoliation, and nail care to keep your feet soft, smooth, and beautiful.",
                price: "€20 - €60"
              },
              {
                title: "Lash Extensions",
                text: "Wake up with longer, fuller lashes.",
                details: "Individual synthetic lashes applied one by one to your natural lashes for a dramatic, yet natural look.",
                price: "€50 - €180"
              },
            ].map((x, index) => (
              <TreatmentCard
                key={x.title}
                title={x.title}
                description={x.text}
                details={x.details}
                price={x.price}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="section" id="team" style={{ background: 'linear-gradient(to bottom, hsl(var(--secondary)), hsl(var(--background)))' }}>
        <div className="container">
          <h2 className="sectionTitle">Our Team</h2>
          <p className="sectionLead">
            Meet our talented specialists dedicated to making you look and feel your best.
          </p>

          <div className="grid">
            {[
              {
                name: "Džoana",
                specialty: "Nail Art & Pedicure",
                bio: "Creative nail artist specializing in intricate designs and relaxing spa treatments.",
                joined: "2021"
              },
              {
                name: "Ema",
                specialty: "Permanent Make-Up & Lash Extensions",
                bio: "Expert in creating natural-looking permanent makeup and stunning lash transformations.",
                joined: "2024"
              },
              {
                name: "Abdullah",
                specialty: "Facial Treatments & Skincare",
                bio: "Passionate about organic skincare and helping clients achieve radiant, healthy skin.",
                joined: "2017"
              }
            ].map((member) => (
              <div className="card team-card" key={member.name}>
                <span className="badge">{member.specialty}</span>
                <div className="cardTitle">{member.name}</div>
                <div className="cardText" style={{ marginBottom: '8px' }}>{member.bio}</div>
                <div style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', fontWeight: '500' }}>
                  Joined {member.joined}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="book-online" className="section" style={{ background: 'linear-gradient(to bottom, hsl(var(--background)), hsl(var(--secondary)))' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            {/* Contact Section */}
            <div id="contact">
              <h2 className="sectionTitle">Contact Us</h2>
              <p className="sectionLead">Get in touch with us for any inquiries or appointments.</p>

              <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: 'hsl(var(--muted-foreground))' }}>Phone</div>
                    <a href="tel:+38733123456" style={{ fontSize: '16px', fontWeight: '500', textDecoration: 'none', color: 'hsl(var(--foreground))' }}>+387 33 123 456</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: 'hsl(var(--muted-foreground))' }}>Email</div>
                    <a href="mailto:info@beautyhub.ba" style={{ fontSize: '16px', fontWeight: '500', textDecoration: 'none', color: 'hsl(var(--foreground))' }}>info@beautyhub.ba</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Online Section */}
            <div>
              <h2 className="sectionTitle">Book Online</h2>
              <p className="sectionLead">Select your service and preferred times below.</p>
              <div style={{ marginTop: '30px' }}>
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
