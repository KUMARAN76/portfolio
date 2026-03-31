import { useEffect, useRef, useState } from "react";
import "./App.css";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}
function Rise({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return <div ref={ref} className={`rise ${inView ? "risen" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const projects = [
  {
    num: "01", title: "ThreadHaus", tags: ["React", "PHP", "MySQL", "Vite"],
    desc: "Full-stack e-commerce platform with product management, cart, checkout, coupon system, and a complete admin dashboard.",
    img: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=700&q=80", color: "#7fff6e",
  },
  {
    num: "02", title: "La Maison", tags: ["React", "CSS Animations", "Vite"],
    desc: "Luxury restaurant landing page with dark gold aesthetic, animated hero, tabbed menu, and reservation form.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", color: "#c8a96e",
  },
  {
    num: "03", title: "Flux SaaS", tags: ["React", "Framer Motion", "Vite"],
    desc: "Modern SaaS product landing page with animated dashboard mockup, pricing toggle, and FAQ accordion.",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=80", color: "#4f7fff",
  },
  {
    num: "04", title: "Velvet Studio", tags: ["React", "CSS", "Vite"],
    desc: "Beauty salon website with organic blob shapes, floating badges, service selector, and appointment booking form.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80", color: "#c4856a",
  },
];

const skills = [
  { cat: "Frontend", list: ["React", "Vite", "HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"] },
  { cat: "Backend", list: ["PHP", "MySQL", "REST APIs", "XAMPP", "Node.js"] },
  { cat: "Tools", list: ["Git", "GitHub", "Vercel", "VS Code", "Figma (basics)", "npm"] },
  { cat: "Specialties", list: ["Landing Pages", "E-Commerce", "Animations", "UI/UX", "Template Development"] },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [typed, setTyped] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const heroRef = useRef(null);
  const words = ["Web Developer.", "UI Crafter.", "Freelancer.", "Problem Solver."];
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  // Typewriter effect
  useEffect(() => {
    const tick = () => {
      const word = words[wordIdx.current];
      if (!deleting.current) {
        setTyped(word.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === word.length) {
          deleting.current = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        setTyped(word.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          wordIdx.current = (wordIdx.current + 1) % words.length;
        }
      }
      setTimeout(tick, deleting.current ? 60 : 100);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Parallax hero bg
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("kumaran@dev.in");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="portfolio">
      {/* NAV */}
      <nav className={`pnav ${scrolled ? "pnav--scrolled" : ""}`}>
        <a href="#" className="pnav__logo">K<span>.</span></a>
        <button className="pnav__burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "x" : ""}></span>
          <span className={menuOpen ? "x" : ""}></span>
        </button>
        <ul className={`pnav__links ${menuOpen ? "open" : ""}`}>
          {["Work", "About", "Skills", "Contact"].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a></li>
          ))}
          <li>
            <a href="#contact" className="pnav__cta" onClick={() => setMenuOpen(false)}>Hire Me</a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="phero">
        <div className="phero__bg" ref={heroRef}>
          <div className="phero__dot-grid"></div>
          <div className="phero__glow"></div>
        </div>
        <div className="phero__content">
          <Rise className="phero__greeting">
            <span className="wave">👋</span> Hey, I'm Kumaran
          </Rise>
          <Rise delay={120}>
            <h1 className="phero__title">
              Creative<br />
              <span className="phero__typewriter">
                {typed}<span className="cursor-blink">|</span>
              </span>
            </h1>
          </Rise>
          <Rise delay={240}>
            <p className="phero__sub">
              I build fast, beautiful websites and web apps for businesses that want to stand out. 
              Based in Chennai — working with clients worldwide.
            </p>
          </Rise>
          <Rise delay={340} className="phero__actions">
            <a href="#work" className="pbtn pbtn--accent">View My Work</a>
            <a href="#contact" className="pbtn pbtn--ghost">Let's Talk</a>
          </Rise>
          <Rise delay={440} className="phero__meta">
            <span className="status-dot"></span>
            <span>Available for freelance projects</span>
          </Rise>
        </div>
        <Rise delay={300} className="phero__card">
          <div className="pcard">
            <div className="pcard__header">
              <div className="pcard__dots"><span></span><span></span><span></span></div>
              <span className="pcard__title">kumaran.dev</span>
            </div>
            <div className="pcard__code">
              <p><span className="c-purple">const</span> <span className="c-blue">dev</span> = {'{'}</p>
              <p>&nbsp;&nbsp;<span className="c-green">name</span>: <span className="c-yellow">"Kumaran"</span>,</p>
              <p>&nbsp;&nbsp;<span className="c-green">role</span>: <span className="c-yellow">"Freelance Dev"</span>,</p>
              <p>&nbsp;&nbsp;<span className="c-green">stack</span>: [<span className="c-yellow">"React"</span>, <span className="c-yellow">"PHP"</span>],</p>
              <p>&nbsp;&nbsp;<span className="c-green">location</span>: <span className="c-yellow">"Chennai 🇮🇳"</span>,</p>
              <p>&nbsp;&nbsp;<span className="c-green">available</span>: <span className="c-accent">true</span></p>
              <p>{'}'}</p>
              <p className="pcard__blink">█</p>
            </div>
          </div>
        </Rise>
      </section>

      {/* MARQUEE */}
      <div className="pmarquee">
        <div className="pmarquee__track">
          {Array(4).fill(["React", "Vite", "PHP", "MySQL", "CSS", "JavaScript", "UI Design", "Freelancer", "Chennai"]).flat().map((t, i) => (
            <span key={i}>{t}<em> · </em></span>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section className="pwork" id="work">
        <Rise className="pwork__header">
          <span className="p-label">Selected Work</span>
          <h2 className="p-title">Projects I've Built</h2>
        </Rise>
        <div className="pwork__list">
          {projects.map((p, i) => (
            <Rise key={p.num} delay={i * 80} className="pproject">
              <div
                className={`pproject__inner ${hoveredProject === i ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="pproject__left">
                  <span className="pproject__num" style={{ color: p.color }}>{p.num}</span>
                  <div>
                    <h3 className="pproject__title">{p.title}</h3>
                    <p className="pproject__desc">{p.desc}</p>
                    <div className="pproject__tags">
                      {p.tags.map(t => <span key={t} style={{ borderColor: p.color + "40", color: p.color }}>{t}</span>)}
                    </div>
                  </div>
                </div>
                <div className="pproject__img">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="pabout" id="about">
        <div className="pabout__left">
          <Rise>
            <span className="p-label">About Me</span>
            <h2 className="p-title">The person<br /><em>behind the code</em></h2>
          </Rise>
          <Rise delay={100}>
            <p>I'm a self-driven web developer from Chennai with a passion for turning ideas into polished digital experiences. I specialize in building React-powered frontends and PHP/MySQL backends that are fast, clean, and client-ready.</p>
            <p>I started freelancing to help local businesses and startups establish a strong online presence — without the agency price tag. Every project I take on gets my full attention, custom work, and post-launch support.</p>
          </Rise>
          <Rise delay={180} className="pabout__highlights">
            {[["5", "Templates Built"], ["1", "E-Commerce App"], ["∞", "Coffee Consumed"]].map(([n, l]) => (
              <div key={l} className="phighlight">
                <strong>{n}</strong><span>{l}</span>
              </div>
            ))}
          </Rise>
        </div>
        <Rise delay={150} className="pabout__right">
          <div className="pabout__img-wrap">
            <img src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&q=80" alt="Developer" />
          </div>
          <div className="pabout__tags">
            {["Chennai-based 📍", "Available Now ✅", "React + PHP 💻", "Client-focused 🤝"].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </Rise>
      </section>

      {/* SKILLS */}
      <section className="pskills" id="skills">
        <Rise>
          <span className="p-label center">My Stack</span>
          <h2 className="p-title center">Skills & Tools</h2>
        </Rise>
        <div className="pskills__grid">
          {skills.map((s, i) => (
            <Rise key={s.cat} delay={i * 80} className="pskill-card">
              <h3>{s.cat}</h3>
              <ul>
                {s.list.map(item => (
                  <li key={item}><span className="skill-check">✓</span>{item}</li>
                ))}
              </ul>
            </Rise>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="pservices">
        <Rise>
          <span className="p-label center">What I Offer</span>
          <h2 className="p-title center">Freelance Services</h2>
        </Rise>
        <div className="pservices__grid">
          {[
            { icon: "🎨", title: "Landing Pages", desc: "High-converting, animated landing pages for any business — delivered in 5–7 days.", price: "From ₹8,000" },
            { icon: "🛒", title: "E-Commerce Sites", desc: "Full shopping experiences with cart, checkout, payments, and admin control.", price: "From ₹25,000" },
            { icon: "⚡", title: "Business Websites", desc: "5–8 page professional sites with contact forms, SEO basics, and mobile-first design.", price: "From ₹12,000" },
            { icon: "🔧", title: "Fixes & Updates", desc: "Bug fixes, redesigns, feature additions, and performance improvements.", price: "From ₹2,000" },
          ].map((s, i) => (
            <Rise key={s.title} delay={i * 80} className="pservice-card">
              <span className="pservice-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="pservice-card__price">{s.price}</div>
            </Rise>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="pcontact" id="contact">
        <div className="pcontact__glow"></div>
        <Rise>
          <span className="p-label center">Get In Touch</span>
          <h2 className="p-title center">Let's build<br /><em>something great</em></h2>
          <p className="pcontact__sub">Got a project in mind? I'd love to hear about it. Send me a message and I'll get back within 24 hours.</p>
        </Rise>
        <Rise delay={100} className="pcontact__options">
          <button className="pcontact__email" onClick={copyEmail}>
            <span>✉️</span>
            <span>kumaran@dev.in</span>
            <span className="copy-hint">{copiedEmail ? "Copied! ✓" : "Click to copy"}</span>
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="pcontact__link">GitHub ↗</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="pcontact__link">LinkedIn ↗</a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="pcontact__link pcontact__link--wa">WhatsApp ↗</a>
        </Rise>
        <Rise delay={200} className="pform-wrap">
          <form className="pform" onSubmit={e => e.preventDefault()}>
            <div className="pform__row">
              <div className="pform__group">
                <label>Your Name</label>
                <input type="text" placeholder="What should I call you?" />
              </div>
              <div className="pform__group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="pform__group">
              <label>Project Type</label>
              <select>
                {["Landing Page", "Business Website", "E-Commerce", "Fixes & Updates", "Other"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="pform__group">
              <label>Tell me about your project</label>
              <textarea rows="5" placeholder="Describe what you need..."></textarea>
            </div>
            <button type="submit" className="pbtn pbtn--accent pbtn--full">Send Message ✉️</button>
          </form>
        </Rise>
      </section>

      {/* FOOTER */}
      <footer className="pfooter">
        <div className="pfooter__inner">
          <span className="pnav__logo" style={{ textDecoration: "none" }}>K<span style={{ color: "var(--accent)" }}>.</span></span>
          <p>Built with React + Vite · Hosted on Vercel</p>
          <p className="pfooter__copy">© 2025 Kumaran. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
