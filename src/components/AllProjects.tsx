import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";

interface ProjectItem {
	name: string;
	desc: string;
	image: string;
	tech: string[];
	href: string;
}

const PROJECTS: ProjectItem[] = [
	{
		name: "32 Bit Operating System",
		desc: "Operating System that is handmade from scratch using C and Assembly, has basic functionality with extra advanced features",
		image: "/projects/os.png",
		tech: ["C", "Assembly"],
		href: "https://github.com/adharidwan/os-2025-keosskuband",
	},
	{
		name: "Meshle - BLE Based Offline First LMS",
		desc: "Mobile LMS App leveraging BLE Mesh protocol for offline communication, aimed to tackle 4th & 9th SDGs.",
		image: "/projects/meshle.png",
		tech: ["Kotlin", "Jetpack Compose"],
		href: "https://github.com/adharidwan/Meshle-BLE-Mesh-Learning-System",
	},
	{
		name: "Little Alchemy 2 Recipe Finder",
		desc: "2nd Big Project for Algorithm Strategy Course, BFS and DFS implementation to search recipes for specific elements.",
		image: "/projects/stima2.png",
		tech: ["React", "React Flow", "Gin", "Go", "Docker"],
		href: "https://github.com/adharidwan/Tubes2_AshtonHallMorningRoutine",
	},
	{
		name: "Nimonspedia",
		desc: "Big Project for Web Based Development Course, an ecommerce and real time auction website with functionality up to payment.",
		image: "/projects/nimonspedia.png",
		tech: ["PHP", "TypeScript", "React", "Fastify", "Docker", "NGINX"],
		href: "https://github.com/adharidwan/Tubes-IF3110-WBD_Nimonspedia",
	},
];

const Page = styled.main`
	min-height: 100vh;
	background: var(--bg-base);
`;

const Inner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 6rem 2rem 8rem;

	@media (max-width: 640px) {
		padding: 4rem 1.2rem 6rem;
	}
`;

const Header = styled.div`
	margin-bottom: 2.4rem;
`;

const BackLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	font-family: 'DM Mono', monospace;
	font-size: 0.7rem;
	letter-spacing: 0.07em;
	text-transform: uppercase;
	color: var(--text-dim);
	text-decoration: none;
	margin-bottom: 1.8rem;
	transition: color 0.2s;

	svg {
		width: 11px;
		height: 11px;
		stroke: currentColor;
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform 0.2s;
	}

	&:hover {
		color: var(--text-primary);

		svg {
			transform: translateX(-2px);
		}
	}
`;

const Title = styled.h1`
	font-family: 'DM Serif Display', 'Playfair Display', Georgia, serif;
	font-size: clamp(2rem, 5vw, 3rem);
	font-weight: 400;
	letter-spacing: -0.02em;
	color: var(--text-primary);
	margin: 0;

	&::after {
		content: '';
		display: block;
		margin-top: 0.3rem;
		height: 2px;
		width: 2.4rem;
		background: var(--text-primary);
		opacity: 0.35;
		border-radius: 2px;
	}
`;

const Subtitle = styled.p`
	font-family: 'DM Sans', sans-serif;
	font-size: 0.88rem;
	color: var(--text-dim);
	margin: 0.95rem 0 0;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1.15rem;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

const Card = styled.a`
	position: relative;
	border-radius: 14px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	text-decoration: none;
	background: color-mix(in srgb, var(--bg-elevated) 82%, transparent);
	border: 1px solid color-mix(in srgb, var(--text-dim) 16%, transparent);
	transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;

	&:hover {
		border-color: color-mix(in srgb, var(--text-primary) 35%, transparent);
		transform: translateY(-4px);
		box-shadow: 0 20px 48px -14px color-mix(in srgb, var(--text-primary) 10%, transparent);
	}

	&:hover .project-img {
		transform: scale(1.04);
	}

	&:hover .project-overlay {
		opacity: 1;
	}
`;

const ImageWrap = styled.div`
	position: relative;
	width: 100%;
	height: 190px;
	overflow: hidden;
`;

const CardImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const HoverOverlay = styled.div`
	position: absolute;
	inset: 0;
	background: color-mix(in srgb, var(--bg-base) 60%, transparent);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.25s;

	svg {
		width: 28px;
		height: 28px;
		stroke: var(--text-primary);
		fill: none;
		stroke-width: 1.6;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
`;

const TechRow = styled.div`
	position: absolute;
	bottom: 0.6rem;
	left: 0.7rem;
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
`;

const TechBadge = styled.span`
	display: inline-flex;
	align-items: center;
	font-family: 'DM Mono', monospace;
	font-size: 0.63rem;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	padding: 0.18rem 0.52rem;
	border-radius: 999px;
	background: var(--bg-base);
	color: var(--text-primary);
	border: 1px solid color-mix(in srgb, var(--text-primary) 18%, transparent);
	backdrop-filter: blur(8px);
`;

const CardBody = styled.div`
	padding: 1rem 1.1rem 1.15rem;
	display: flex;
	flex-direction: column;
	gap: 0.45rem;
`;

const CardName = styled.h2`
	font-family: 'DM Serif Display', Georgia, serif;
	font-size: 1.05rem;
	font-weight: 400;
	color: var(--text-primary);
	margin: 0;
	line-height: 1.3;
`;

const CardDesc = styled.p`
	font-family: 'DM Sans', sans-serif;
	font-size: 0.82rem;
	line-height: 1.6;
	color: var(--text-dim);
	margin: 0;
`;

const Empty = styled.p`
	font-family: 'DM Mono', monospace;
	font-size: 0.82rem;
	color: var(--text-dim);
	text-align: center;
	padding: 4rem 0;
`;

export function AllProjects() {
	return (
		<Page>
			<Inner>
				<Header>
					<BackLink to="/">
						<svg viewBox="0 0 12 12" aria-hidden="true">
							<line x1="10" y1="6" x2="2" y2="6" />
							<polyline points="5,3 2,6 5,9" />
						</svg>
						Home
					</BackLink>

					<Title>Projects</Title>
					<Subtitle>
						{PROJECTS.length} project{PROJECTS.length !== 1 ? "s" : ""} in systems, robotics, and web engineering.
					</Subtitle>
				</Header>

				{PROJECTS.length === 0 ? (
					<Empty>No projects yet.</Empty>
				) : (
					<Grid>
						{PROJECTS.map((project) => (
							<Card
								key={project.name}
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={project.name}
							>
								<ImageWrap>
									<CardImg
										className="project-img"
										src={project.image}
										alt={project.name}
										loading="lazy"
									/>
									<HoverOverlay className="project-overlay">
										<svg viewBox="0 0 24 24" aria-hidden="true">
											<line x1="5" y1="19" x2="19" y2="5" />
											<polyline points="9,5 19,5 19,15" />
										</svg>
									</HoverOverlay>

									<TechRow>
										{project.tech.map((tech) => (
											<TechBadge key={tech}>{tech}</TechBadge>
										))}
									</TechRow>
								</ImageWrap>

								<CardBody>
									<CardName>{project.name}</CardName>
									<CardDesc>{project.desc}</CardDesc>
								</CardBody>
							</Card>
						))}
					</Grid>
				)}
			</Inner>
		</Page>
	);
}
