import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";
import { ENTRIES, SKILL_GROUPS, type Entry, type EntryType } from "../content/experiences";

const MAX_EXPERIENCE_ITEMS = 2;
const MAX_VOLUNTEER_ITEMS = 2;

const EXPERIENCE_ENTRIES = ENTRIES.filter((entry) => entry.type === "Experience");
const VOLUNTEER_ENTRIES = ENTRIES.filter((entry) => entry.type === "Volunteer");

const EXPERIENCE_PREVIEW = EXPERIENCE_ENTRIES.slice(0, MAX_EXPERIENCE_ITEMS);
const VOLUNTEER_PREVIEW = VOLUNTEER_ENTRIES.slice(0, MAX_VOLUNTEER_ITEMS);
const EXPERIENCE_REMAINDER = EXPERIENCE_ENTRIES.length - MAX_EXPERIENCE_ITEMS;
const VOLUNTEER_REMAINDER = VOLUNTEER_ENTRIES.length - MAX_VOLUNTEER_ITEMS;

const Section = styled.section`
	position: relative;
	min-height: 100vh;
	background: linear-gradient(
		180deg,
		color-mix(in srgb, var(--hero-bg-1) 86%, var(--bg-elevated)) 20%,
		color-mix(in srgb, var(--hero-bg-2) 84%, var(--bg-elevated)) 60%,
		color-mix(in srgb, var(--hero-bg-3) 82%, var(--bg-elevated)) 90%,
		color-mix(in srgb, var(--hero-bg-4) 80%, var(--bg-elevated)) 100%
	);
	display: flex;
	align-items: flex-start;
	overflow: hidden;
`;

const Vignette = styled.div`
	position: absolute;
	inset: 0;
	pointer-events: none;
	background:
		radial-gradient(ellipse 60% 55% at 20% 30%, var(--hero-vignette-1) 0%, transparent 70%),
		radial-gradient(ellipse 50% 40% at 80% 70%, var(--hero-vignette-2) 0%, transparent 70%);
`;

const Grain = styled.div`
	position: absolute;
	inset: 0;
	pointer-events: none;
	opacity: 0.025;
	background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
	background-size: 200px 200px;
`;

const Inner = styled.div`
	position: relative;
	z-index: 10;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 80px 3rem 7rem;
	display: flex;
	flex-direction: column;
	gap: 2.5rem;

	@media (max-width: 900px) {
		padding: 80px 1.5rem 5rem;
		gap: 2rem;
	}
`;

const HeaderRow = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: baseline;
`;

const Title = styled.h2`
	font-family: 'DM Serif Display', 'Playfair Display', Georgia, serif;
	font-size: clamp(2rem, 5vw, 3.2rem);
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

const SeeAll = styled(Link)`
	position: absolute;
	right: 0;
	bottom: 0.2rem;
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	font-family: 'DM Mono', monospace;
	font-size: 0.72rem;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--text-dim);
	text-decoration: none;
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
			transform: translate(2px, -2px);
		}
	}
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	border-top: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);
`;

const Groups = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 2rem;

	@media (max-width: 980px) {
		grid-template-columns: 1fr;
		gap: 1.6rem;
	}
`;

const Group = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.9rem;
`;

const GroupTitle = styled.h3`
	margin: 0;
	font-family: 'DM Serif Display', Georgia, serif;
	font-size: clamp(1.35rem, 2.6vw, 1.7rem);
	font-weight: 400;
	color: var(--text-primary);
`;

const SkillsBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 0.25rem;
`;

const SkillsTitle = styled(GroupTitle)``;

const SkillRows = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1.3rem 1.5rem;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
		gap: 1rem;
	}
`;

const SkillRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.72rem;
`;

const SkillLabel = styled.p`
	margin: 0;
	font-family: 'DM Serif Display', Georgia, serif;
	font-size: clamp(1.25rem, 2.3vw, 1.72rem);
	line-height: 1.2;
	color: color-mix(in srgb, var(--text-primary) 90%, var(--text-muted));

	&::before {
		content: "|";
		margin-right: 0.45rem;
		color: var(--text-dim);
	}
`;

const SkillChips = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.52rem;
`;

const SkillChip = styled.span`
	display: inline-flex;
	align-items: center;
	font-family: 'DM Sans', sans-serif;
	font-size: 0.9rem;
	font-weight: 500;
	letter-spacing: 0.01em;
	padding: 0.48rem 1rem;
	border-radius: 999px;
	color: color-mix(in srgb, var(--text-primary) 92%, var(--text-muted));
	background: color-mix(in srgb, var(--bg-base) 82%, #202020 18%);
	border: 1px solid color-mix(in srgb, var(--text-dim) 20%, transparent);
	line-height: 1;
`;

const Item = styled.article`
	display: grid;
	grid-template-columns: 220px 1fr;
	gap: 1.2rem;
	padding: 1.4rem 0;
	border-bottom: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);

	@media (max-width: 780px) {
		grid-template-columns: 1fr;
		gap: 0.65rem;
	}
`;

const LeftMeta = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

const Period = styled.p`
	margin: 0;
	font-family: 'DM Mono', monospace;
	font-size: 0.74rem;
	letter-spacing: 0.06em;
	color: var(--text-dim);
`;

const Location = styled.p`
	margin: 0;
	font-family: 'DM Sans', sans-serif;
	font-size: 0.82rem;
	color: var(--text-muted);
`;

const TypeBadge = styled.span<{ $type: EntryType }>`
	width: fit-content;
	margin-top: 0.2rem;
	font-family: 'DM Mono', monospace;
	font-size: 0.62rem;
	letter-spacing: 0.07em;
	text-transform: uppercase;
	border-radius: 999px;
	padding: 0.18rem 0.55rem;
	color: ${({ $type }) => ($type === "Experience" ? "var(--text-primary)" : "var(--text-dim)")};
	border: 1px solid
		${({ $type }) =>
			$type === "Experience"
				? "color-mix(in srgb, var(--text-primary) 26%, transparent)"
				: "color-mix(in srgb, var(--text-dim) 22%, transparent)"};
	background: ${({ $type }) =>
		$type === "Experience"
			? "color-mix(in srgb, var(--text-primary) 8%, transparent)"
			: "color-mix(in srgb, var(--text-dim) 8%, transparent)"};
`;

const RightContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Role = styled.h3`
	margin: 0;
	font-family: 'DM Serif Display', Georgia, serif;
	font-size: 1.2rem;
	font-weight: 400;
	color: var(--text-primary);
`;

const Org = styled.p`
	margin: 0;
	font-family: 'DM Sans', sans-serif;
	font-size: 0.9rem;
	color: var(--text-muted);
`;

const HighlightList = styled.ul`
	margin: 0.2rem 0 0;
	padding-left: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.35rem;

	li {
		font-family: 'DM Sans', sans-serif;
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--text-dim);
	}
`;

const AndOthers = styled.p`
	font-family: 'DM Mono', monospace;
	font-size: 0.7rem;
	letter-spacing: 0.06em;
	color: var(--text-dim);
	margin: 0;
	padding-top: 0.2rem;

	strong {
		color: var(--text-primary);
		font-weight: 500;
	}
`;

const renderEntries = (entries: Entry[]) =>
	entries.map((entry) => (
		<Item key={`${entry.role}-${entry.org}-${entry.period}`}>
			<LeftMeta>
				<Period>{entry.period}</Period>
				<Location>{entry.location}</Location>
				<TypeBadge $type={entry.type}>{entry.type}</TypeBadge>
			</LeftMeta>

			<RightContent>
				<Role>{entry.role}</Role>
				<Org>{entry.org}</Org>
				<HighlightList>
					{entry.highlights.map((point) => (
						<li key={point}>{point}</li>
					))}
				</HighlightList>
			</RightContent>
		</Item>
	));

const WaveBottom = styled.div`
	position: absolute;
	bottom: -2px;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	pointer-events: none;
`;

export function Experiences() {
	return (
		<Section id="experience">
			<Vignette />
			<Grain />

			<Inner>
				<HeaderRow>
					<Title>Experience & Volunteer</Title>
					<SeeAll to="/experiences" aria-label="See all experiences and volunteer history">
						See All
						<svg viewBox="0 0 12 12" aria-hidden="true">
							<line x1="2" y1="10" x2="10" y2="2" />
							<polyline points="5,2 10,2 10,7" />
						</svg>
					</SeeAll>
				</HeaderRow>

				<Groups>
					<Group>
						<GroupTitle>Experience</GroupTitle>
						<List>{renderEntries(EXPERIENCE_PREVIEW)}</List>
						{EXPERIENCE_REMAINDER > 0 && (
							<AndOthers>
								and <strong>{EXPERIENCE_REMAINDER} others</strong>
							</AndOthers>
						)}
					</Group>

					<Group>
						<GroupTitle>Volunteer</GroupTitle>
						<List>{renderEntries(VOLUNTEER_PREVIEW)}</List>
						{VOLUNTEER_REMAINDER > 0 && (
							<AndOthers>
								and <strong>{VOLUNTEER_REMAINDER} others</strong>
							</AndOthers>
						)}
					</Group>
				</Groups>

				<SkillsBlock id="skills">
					<SkillsTitle>Technical Skills</SkillsTitle>
					<SkillRows>
						{SKILL_GROUPS.map((group) => (
							<SkillRow key={group.label}>
								<SkillLabel>{group.label}</SkillLabel>
								<SkillChips>
									{group.items.map((item) => (
										<SkillChip key={item}>{item}</SkillChip>
									))}
								</SkillChips>
							</SkillRow>
						))}
					</SkillRows>
				</SkillsBlock>
			</Inner>

			<WaveBottom>
				<svg
					viewBox="0 0 1440 160"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					style={{ display: "block", width: "100%", height: "clamp(80px, 12vw, 160px)" }}
				>
					<defs>
						<linearGradient id="wg-exp" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="var(--wave-stop-top)" stopOpacity="0" />
							<stop offset="100%" stopColor="var(--wave-stop-bottom)" stopOpacity="1" />
						</linearGradient>
					</defs>
					<path d="M0,80 C120,50 200,110 320,90 C440,70 500,115 640,95 C780,75 840,118 960,98 C1080,78 1160,112 1280,92 C1360,78 1400,96 1440,88 L1440,160 L0,160 Z" fill="var(--wave-layer-1)" />
					<path d="M0,100 C80,78 180,122 300,104 C420,86 520,124 640,108 C760,92 860,126 960,110 C1060,94 1180,120 1300,106 C1380,96 1420,110 1440,104 L1440,160 L0,160 Z" fill="var(--wave-layer-2)" />
					<path d="M0,120 C100,105 220,135 360,122 C500,109 580,138 720,125 C860,112 940,138 1080,126 C1200,114 1340,132 1440,122 L1440,160 L0,160 Z" fill="var(--wave-layer-3)" />
					<rect x="0" y="150" width="1440" height="10" fill="var(--wave-base)" />
				</svg>
			</WaveBottom>
		</Section>
	);
}
