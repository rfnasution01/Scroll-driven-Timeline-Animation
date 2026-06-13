import { useEffect, useRef, useState, type ComponentType } from "react";
import { BadgeCheck, BookOpen, BriefcaseBusiness, Code2, Rocket, Trophy, type LucideProps } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["journey", "proof", "contact"];

type Milestone = {
	year: string;
	label: string;
	title: string;
	impact: string;
	metric: string;
	Icon: ComponentType<LucideProps>;
};

const milestones: Milestone[] = [
	{
		year: "2022",
		label: "Semester awal",
		title: "Masuk Kuliah",
		impact: "Mulai membangun dasar problem solving dan logika pemrograman.",
		metric: "Fondasi algoritma",
		Icon: BookOpen,
	},
	{
		year: "2023",
		label: "Project pertama",
		title: "Frontend Workflow",
		impact: "Membuat project pertama dan memahami alur desain ke kode.",
		metric: "3+ mini project",
		Icon: Code2,
	},
	{
		year: "2024",
		label: "Tim & deadline",
		title: "Magang / Organisasi",
		impact: "Belajar bekerja dalam tim, komunikasi teknis, dan delivery bertahap.",
		metric: "Kolaborasi agile",
		Icon: BriefcaseBusiness,
	},
	{
		year: "2025",
		label: "Kualitas naik",
		title: "Project 2 / Lomba",
		impact: "Meningkatkan kualitas UI, struktur kode, dan presentasi project.",
		metric: "10+ UI screens",
		Icon: Trophy,
	},
	{
		year: "2026",
		label: "Siap industri",
		title: "Lulus + Skill",
		impact: "Siap membawa React, UI engineering, dan problem solving ke dunia kerja.",
		metric: "React · TS · UI",
		Icon: BadgeCheck,
	},
	{
		year: "Now",
		label: "Open to work",
		title: "Available for Hire",
		impact: "Terbuka untuk role Frontend Developer / UI Engineer.",
		metric: "Ready to contribute",
		Icon: Rocket,
	},
];

function App() {
	return (
		<main className="min-h-screen bg-[#111827] text-[#F9FAFB]">
			<Navbar />
			<Hero />
			<TimelineSection />
			<Proof />
			<Contact />
		</main>
	);
}

function Navbar() {
	return (
		<header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#111827]/80 backdrop-blur-xl">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<a href="#hero" className="font-['Space_Grotesk'] text-lg font-bold tracking-tight text-white">
					{portfolio.profile.name}
				</a>
				<div className="hidden gap-6 text-sm text-[#9CA3AF] sm:flex">
					{navItems.map((item) => (
						<a key={item} href={`#${item}`} className="capitalize transition hover:text-[#10B981]">
							{item}
						</a>
					))}
				</div>
			</nav>
		</header>
	);
}

function Hero() {
	return (
		<section id="hero" className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 pt-28 pb-20 lg:grid-cols-[1.05fr_0.95fr]">
			<div>
				<p className="section-label">Scroll-driven Timeline Animation</p>
				<h1 className="mt-5 max-w-4xl font-['Space_Grotesk'] text-5xl font-bold leading-none tracking-tight text-white md:text-7xl">
					Your journey unfolds with scroll.
				</h1>
				<p className="mt-6 max-w-2xl text-lg leading-8 text-[#9CA3AF]">
					Portfolio fresh graduate yang menunjukkan proses: kuliah, project, magang, lulus, lalu siap kerja. Bukan sekadar daftar skill—tapi bukti pertumbuhan.
				</p>
				<div className="mt-8 flex flex-wrap gap-4">
					<a className="rounded-full bg-[#10B981] px-6 py-3 font-semibold text-[#111827] transition hover:bg-emerald-300" href="#journey">
						Start Journey
					</a>
					<a className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-[#10B981] hover:text-[#10B981]" href={portfolio.profile.resumeUrl}>
						Download CV
					</a>
				</div>
			</div>
			<div className="rounded-[2rem] border border-white/10 bg-[#1F2937] p-8 shadow-2xl shadow-emerald-950/30">
				<p className="text-sm uppercase tracking-[0.3em] text-[#9CA3AF]">Career readiness</p>
				<h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold">Kenapa saya sudah siap kerja sekarang?</h2>
				<div className="mt-8 grid gap-3 text-[#D1D5DB]">
					<p>Progress terukur dari fondasi hingga delivery.</p>
					<p>Milestone jelas dengan konteks sebab-akibat.</p>
					<p>Fokus role: Frontend Developer / UI Engineer.</p>
				</div>
			</div>
		</section>
	);
}

function TimelineSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const lineRef = useRef<SVGPathElement | null>(null);
	const progressRef = useRef<HTMLSpanElement | null>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!sectionRef.current || !lineRef.current) return;
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const ctx = gsap.context(() => {
			const dots = gsap.utils.toArray<HTMLElement>(".milestone-dot");
			const cards = gsap.utils.toArray<HTMLElement>(".event-card");
			const years = gsap.utils.toArray<HTMLElement>(".year-marker");

			if (prefersReduced) {
				gsap.set([dots, cards, years, lineRef.current], { clearProps: "all", opacity: 1, scale: 1, y: 0, filter: "blur(0px)" });
				setProgress(100);
				return;
			}

			const mm = gsap.matchMedia();
			mm.add("(min-width: 768px)", () => {
				const line = lineRef.current!;
				const length = line.getTotalLength();

				gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
				gsap.set(dots, { scale: 0, opacity: 0 });
				gsap.set(cards, { y: 50, opacity: 0, filter: "blur(5px)" });
				gsap.set(years, { y: 24, opacity: 0 });

				const updateStates = (value: number) => {
					const pct = Math.round(value * 100);
					setProgress(pct);
					if (progressRef.current) progressRef.current.textContent = `${pct}%`;
					const activeIndex = Math.min(milestones.length - 1, Math.floor(value * milestones.length));
					cards.forEach((card, index) => {
						card.classList.toggle("completed", index < activeIndex);
						card.classList.toggle("active", index === activeIndex);
						card.classList.toggle("locked", index > activeIndex);
					});
					dots.forEach((dot, index) => {
						dot.classList.toggle("completed", index < activeIndex);
						dot.classList.toggle("active", index === activeIndex);
						dot.classList.toggle("locked", index > activeIndex);
					});
				};

				gsap.to(line, {
					strokeDashoffset: 0,
					ease: "none",
					scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: 2, onUpdate: (self) => updateStates(self.progress) },
				});

				gsap.to(dots, { scale: 1, opacity: 1, ease: "power1.out", stagger: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "bottom 20%", scrub: 2 } });
				gsap.to(cards, { y: 0, opacity: 1, filter: "blur(0px)", ease: "none", stagger: 0.2, scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "bottom 25%", scrub: 2 } });
				gsap.to(years, { y: 0, opacity: 1, ease: "none", stagger: 0.16, scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "bottom 25%", scrub: 2 } });
				updateStates(0);
			});

			mm.add("(max-width: 767px)", () => {
				gsap.set([dots, cards, years], { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" });
				setProgress(100);
			});

			return () => mm.revert();
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section id="journey" ref={sectionRef} className="timeline-section relative min-h-[430vh] bg-[#111827] text-white max-md:min-h-0 max-md:px-6 max-md:py-24">
			<div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden max-md:static max-md:h-auto max-md:block">
				<div className="absolute left-6 top-24 z-20 rounded-full border border-white/10 bg-[#1F2937]/90 px-5 py-3 text-sm font-semibold text-[#9CA3AF] backdrop-blur max-md:static max-md:mb-8 max-md:inline-flex">
					Journey Progress: <span ref={progressRef} className="ml-2 text-[#10B981]">{progress}%</span>
				</div>

				<svg className="pointer-events-none absolute h-[84vh] w-full max-md:hidden" viewBox="0 0 1000 1000" fill="none" aria-hidden="true">
					<path d="M500 60 L500 940" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
					<path ref={lineRef} className="timeline-line-progress" d="M500 60 L500 940" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
				</svg>

				<div className="relative z-10 h-[84vh] w-full max-w-6xl max-md:h-auto">
					{milestones.map((milestone, index) => {
						const top = 8 + index * 16.8;
						const isLeft = index % 2 === 0;
						const Icon = milestone.Icon;
						return (
							<article
								key={`${milestone.year}-${milestone.title}`}
								className={`event-card absolute w-[min(430px,42vw)] rounded-[1.5rem] border border-white/10 bg-[#1F2937] p-5 shadow-xl shadow-black/20 transition duration-300 hover:scale-[1.03] max-md:relative max-md:top-auto max-md:mb-6 max-md:w-full ${isLeft ? "text-right max-md:text-left" : "text-left"}`}
								style={{ top: `${top}%`, [isLeft ? "right" : "left"]: "calc(50% + 70px)", transform: "translateY(-50%)" }}
							>
								<div className={`mb-3 flex items-center gap-3 ${isLeft ? "justify-end max-md:justify-start" : "justify-start"}`}>
									<span className="rounded-full bg-[#10B981]/10 p-2 text-[#10B981]"><Icon size={20} /></span>
									<span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9CA3AF]">{milestone.label}</span>
								</div>
								<p className="year-marker font-['Space_Grotesk'] text-5xl font-bold leading-none text-white/10 md:text-7xl">{milestone.year}</p>
								<h3 className="event-title mt-2 text-[28px] font-bold leading-tight text-white">{milestone.title}</h3>
								<p className="event-desc mt-3 text-base leading-7 text-[#9CA3AF]">{milestone.impact}</p>
								<p className="mt-4 inline-flex rounded-full border border-[#10B981]/20 bg-[#10B981]/10 px-3 py-1 text-xs font-semibold text-emerald-200">{milestone.metric}</p>
								<span className="milestone-dot absolute top-1/2 hidden h-5 w-5 rounded-full border-4 border-[#111827] bg-[#10B981] md:block" style={{ [isLeft ? "right" : "left"]: "calc(-70px - 10px)" }} />
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function Proof() {
	return (
		<section id="proof" className="border-y border-white/10 bg-white/[0.03]">
			<div className="mx-auto max-w-6xl px-6 py-24">
				<p className="section-label">Proof of growth</p>
				<h2 className="section-title mt-6">Skill yang berkembang karena milestone, bukan muncul tiba-tiba.</h2>
				<div className="mt-10 grid gap-6 md:grid-cols-3">
					{portfolio.projects.map((project) => (
						<a key={project.title} href={project.link} className="rounded-3xl border border-white/10 bg-[#1F2937] p-6 transition hover:-translate-y-1 hover:border-[#10B981]/60">
							<h3 className="text-xl font-semibold">{project.title}</h3>
							<p className="mt-4 text-sm leading-6 text-[#9CA3AF]">{project.description}</p>
							<div className="mt-6 flex flex-wrap gap-2">
								{project.tags.map((tag) => <span key={tag} className="rounded-full bg-[#10B981]/10 px-3 py-1 text-xs text-emerald-200">{tag}</span>)}
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

function Contact() {
	return (
		<section id="contact" className="mx-auto max-w-6xl px-6 py-24">
			<div className="rounded-[2rem] bg-[#10B981] p-8 text-[#111827] md:p-12">
				<p className="text-sm font-semibold uppercase tracking-[0.3em]">Ready Hire</p>
				<h2 className="mt-4 max-w-3xl font-['Space_Grotesk'] text-4xl font-bold tracking-tight md:text-5xl">{portfolio.contact.cta}</h2>
				<div className="mt-8 flex flex-wrap gap-4">
					<a className="rounded-full bg-[#111827] px-6 py-3 font-semibold text-white" href={`mailto:${portfolio.contact.email}`}>Email me</a>
					<a className="rounded-full border border-[#111827]/20 px-6 py-3 font-semibold" href={`tel:${portfolio.contact.phone}`}>{portfolio.contact.phone}</a>
				</div>
			</div>
		</section>
	);
}

export default App;
