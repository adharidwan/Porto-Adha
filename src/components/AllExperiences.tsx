import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";
import { ENTRIES, SKILL_GROUPS, type Entry, type EntryType } from "../content/experiences";

const EXPERIENCE_ENTRIES = ENTRIES.filter((entry) => entry.type === "Experience");
const VOLUNTEER_ENTRIES = ENTRIES.filter((entry) => entry.type === "Volunteer");

const Page = styled.main`
  min-height: 100vh;
  background: var(--bg-base);
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 900px) {
    padding: 4rem 1.2rem 6rem;
    gap: 2rem;
  }
`;

const Header = styled.div`
  margin-bottom: 0.3rem;
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

const GroupTitle = styled.h2`
  margin: 0;
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(1.35rem, 2.6vw, 1.7rem);
  font-weight: 400;
  color: var(--text-primary);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);
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

const SkillsBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const SkillsTitle = styled(GroupTitle)`
  font-size: clamp(1.5rem, 2.7vw, 1.9rem);
`;

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

const Empty = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 0.82rem;
  color: var(--text-dim);
  text-align: center;
  padding: 4rem 0;
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

export function AllExperiences() {
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

          <Title>Experience & Volunteer</Title>
          <Subtitle>
            {ENTRIES.length} timeline item{ENTRIES.length !== 1 ? "s" : ""} across professional and community roles.
          </Subtitle>
        </Header>

        {ENTRIES.length === 0 ? (
          <Empty>No experience entries yet.</Empty>
        ) : (
          <Groups>
            <Group>
              <GroupTitle>Experience</GroupTitle>
              <List>{renderEntries(EXPERIENCE_ENTRIES)}</List>
            </Group>

            <Group>
              <GroupTitle>Volunteer</GroupTitle>
              <List>{renderEntries(VOLUNTEER_ENTRIES)}</List>
            </Group>
          </Groups>
        )}

        <SkillsBlock>
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
    </Page>
  );
}
