import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function App() {
	useEffect(() => {
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const ctx = gsap.context(() => {
			if (prefersReduced) {
				gsap.set([".content-card", ".timeline-dot"], { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 });
				return;
			}

			gsap.to(".top-progress-bar", {
				width: "100%",
				ease: "none",
				scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
			});

			gsap.to(".timeline-line-progress", {
				height: "100%",
				ease: "none",
				scrollTrigger: { trigger: ".timeline-container", start: "top 50%", end: "bottom 50%", scrub: true },
			});

			gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
				const dot = item.querySelector<HTMLElement>(".timeline-dot");
				const card = item.querySelector<HTMLElement>(".content-card");
				if (!dot || !card) return;

				const isLeftSideCard = Boolean(item.querySelector(".side-left .content-card"));
				const directionX = isLeftSideCard ? -60 : 60;
				gsap.set(card, { opacity: 0, y: 40, x: window.innerWidth > 1024 ? directionX : 0 });

				ScrollTrigger.create({
					trigger: item,
					start: "top 60%",
					end: "bottom 40%",
					onEnter: () => activateItem(item, dot, card),
					onEnterBack: () => activateItem(item, dot, card),
					onLeave: () => deactivateItem(item, dot),
					onLeaveBack: () => deactivateItem(item, dot),
				});
			});

			if (window.innerWidth > 1024) {
				gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
					gsap.to(img, {
						yPercent: 15,
						ease: "none",
						scrollTrigger: { trigger: img.closest(".timeline-item"), start: "top bottom", end: "bottom top", scrub: true },
					});
				});
			}

			gsap.utils.toArray<HTMLElement>(".counter").forEach((counter) => {
				const target = Number.parseInt(counter.dataset.target ?? "0", 10);
				gsap.to(counter, {
					innerText: target,
					duration: 2,
					snap: { innerText: 1 },
					scrollTrigger: { trigger: counter, start: "top 85%", toggleActions: "play none none none" },
				});
			});
		});

		const cards = Array.from(document.querySelectorAll<HTMLElement>(".content-card"));
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
			const activeIndex = cards.findIndex((card) => card === document.activeElement);
			if (activeIndex === -1) return;
			event.preventDefault();
			const nextIndex = event.key === "ArrowDown" ? Math.min(cards.length - 1, activeIndex + 1) : Math.max(0, activeIndex - 1);
			cards[nextIndex]?.focus({ preventScroll: true });
			cards[nextIndex]?.closest(".timeline-item")?.scrollIntoView({ behavior: "smooth", block: "center" });
		};
		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			ctx.revert();
		};
	}, []);

	return (
		<>
			<div className="top-progress-bar" aria-hidden="true" />
			<HeroSection />
			<TimelineSection />
			<CurrentStatusSection />
			<StatsSection />
			<ContactSection />
		</>
	);
}

function activateItem(item: HTMLElement, dot: HTMLElement, card: HTMLElement) {
	item.classList.add("is-active");
	gsap.to(dot, {
		scale: 1.5,
		backgroundColor: "#3B82F6",
		boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)",
		duration: 0.3,
	});
	gsap.to(card, { opacity: 1, y: 0, x: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
}

function deactivateItem(item: HTMLElement, dot: HTMLElement) {
	item.classList.remove("is-active");
	gsap.to(dot, { scale: 1, backgroundColor: "var(--line-base)", boxShadow: "none", duration: 0.3 });
}

function HeroSection() {
	return (
		<section className="hero-section" aria-labelledby="hero-title">
			<div className="hero-content">
				<p className="eyebrow">Founder story · Scroll-driven timeline</p>
				<h1 id="hero-title">{portfolio.profile.heroTitle}</h1>
				<p>{portfolio.profile.heroSubtitle}</p>
				<button className="cta-arrow" type="button" aria-label="Scroll to timeline" onClick={() => document.querySelector(".timeline-container")?.scrollIntoView({ behavior: "smooth" })}>
					↓
				</button>
			</div>
			<div className="hero-timeline-indicator" aria-hidden="true">
				<div className="pulse-dot" />
			</div>
		</section>
	);
}

function TimelineSection() {
	return (
		<main className="timeline-container" aria-label="Career timeline">
			<div className="timeline-line-base" aria-hidden="true">
				<div className="timeline-line-progress" />
			</div>

			{portfolio.timeline.map((item, index) => {
				const card = <TimelineCard item={item} index={index} />;
				const year = <div className="sticky-year">{item.year}</div>;
				const isOdd = index % 2 === 0;

				return (
					<section className="timeline-item" data-year={item.year} key={`${item.year}-${item.title}`}>
						<div className="timeline-dot-anchor" aria-hidden="true">
							<div className="timeline-dot" />
						</div>
						<div className={`timeline-side side-left ${isOdd ? "year-side" : "card-side"}`}>{isOdd ? year : card}</div>
						<div className={`timeline-side side-right ${isOdd ? "card-side" : "year-side"}`}>{isOdd ? card : year}</div>
					</section>
				);
			})}
		</main>
	);
}

function TimelineCard({ item, index }: { item: (typeof portfolio.timeline)[number]; index: number }) {
	return (
		<article className="content-card" tabIndex={0} aria-labelledby={`milestone-${index}`}>
			<span className="card-date">{item.date}</span>
			<h2 id={`milestone-${index}`}>{item.title}</h2>
			<ul className="impact-bullets">
				{item.bullets.map((bullet) => (
					<li key={bullet}>{bullet}</li>
				))}
			</ul>
			<div className="card-media">
				<img src={item.image} alt={item.imageAlt} className="parallax-img" loading="lazy" />
			</div>
		</article>
	);
}

function CurrentStatusSection() {
	return (
		<section className="current-status-section">
			<div className="status-card">
				<div className="pulse-dot-active" aria-hidden="true" />
				<p className="eyebrow">Current status</p>
				<h2>What I'm doing now</h2>
				<p>{portfolio.profile.currentStatus}</p>
				<a href="#contact" className="cta-button">Let's Talk</a>
			</div>
		</section>
	);
}

function StatsSection() {
	return (
		<section className="stats-section" aria-label="Career stats">
			<div className="stats-grid">
				{portfolio.stats.map((stat) => (
					<div className="stat-box" key={stat.label}>
						<div><span className="counter" data-target={stat.value}>0</span>{stat.suffix}</div>
						<p>{stat.label}</p>
					</div>
				))}
			</div>
		</section>
	);
}

function ContactSection() {
	return (
		<section id="contact" className="contact-section">
			<p className="eyebrow">Contact</p>
			<h2>Let's write the next chapter together.</h2>
			<a className="btn-primary" href={`mailto:${portfolio.profile.contactEmail}`}>Get In Touch</a>
		</section>
	);
}

export default App;
