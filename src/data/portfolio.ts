export const portfolio = {
	profile: {
		name: "Fresh Grad Dev",
		role: "Frontend Developer / UI Engineer",
		tagline: "Your journey unfolds with scroll.",
		description:
			"Portfolio fresh graduate berbasis timeline: menunjukkan proses belajar, project, kolaborasi, dan kesiapan kerja secara bertahap.",
		location: "Indonesia",
		resumeUrl: "/CV.pdf",
	},
	socials: [
		{ label: "Email", href: "mailto:hello@example.com" },
		{ label: "LinkedIn", href: "https://linkedin.com/in/username" },
		{ label: "GitHub", href: "https://github.com/username" },
	],
	skills: ["React", "TypeScript", "TailwindCSS", "UI Engineering", "Responsive Design", "Problem Solving"],
	projects: [
		{
			title: "Portfolio Timeline",
			description: "Single page portfolio dengan GSAP ScrollTrigger untuk menceritakan growth dari kuliah sampai ready hire.",
			tags: ["GSAP", "React", "Timeline"],
			link: "#journey",
		},
		{
			title: "Frontend Case Study",
			description: "Implementasi UI responsif, component rhythm, dan struktur kode yang mudah dikembangkan.",
			tags: ["TypeScript", "Tailwind", "UI"],
			link: "#proof",
		},
		{
			title: "Ready Hire Package",
			description: "Ringkasan skill, bukti project, dan CTA yang membantu HRD memahami kesiapan kandidat.",
			tags: ["Fresh Grad", "React", "Career"],
			link: "#contact",
		},
	],
	experience: [],
	contact: {
		email: "hello@example.com",
		phone: "+62 812 0000 0000",
		cta: "Saya siap berkontribusi sebagai Frontend Developer / UI Engineer.",
	},
} as const;
