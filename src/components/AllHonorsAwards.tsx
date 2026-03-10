import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";
import { HONORS, type HonorItem } from "../content/honors";

const Page = styled.main`
  min-height: 100vh;
  background: var(--bg-base);
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 6rem 2rem 8rem;

  @media (max-width: 900px) {
    padding: 4rem 1.2rem 6rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2.2rem;
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

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--text-dim) 14%, transparent) 0%,
      color-mix(in srgb, var(--text-dim) 24%, transparent) 50%,
      color-mix(in srgb, var(--text-dim) 14%, transparent) 100%
    );
  }

  @media (max-width: 900px) {
    &::before {
      left: 14px;
      transform: none;
    }
  }
`;

const TimelineItem = styled.article<{ $side: "left" | "right" }>`
  position: relative;
  display: flex;
  justify-content: ${({ $side }) => ($side === "left" ? "flex-start" : "flex-end")};

  &::before {
    content: '';
    position: absolute;
    top: 1.2rem;
    height: 1px;
    width: 2.4rem;
    background: color-mix(in srgb, var(--text-dim) 20%, transparent);
    left: ${({ $side }) => ($side === "left" ? "calc(50% - 2.4rem)" : "50%")};
  }

  @media (max-width: 900px) {
    justify-content: flex-start;

    &::before {
      left: 14px;
      width: 1.6rem;
    }
  }
`;

const Dot = styled.span`
  position: absolute;
  top: 0.86rem;
  left: 50%;
  width: 14px;
  height: 14px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: var(--bg-base);
  border: 2px solid color-mix(in srgb, var(--text-primary) 30%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--bg-base) 70%, transparent);

  @media (max-width: 900px) {
    left: 14px;
    transform: none;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--bg-elevated) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);
  width: calc(50% - 2.4rem);

  @media (max-width: 900px) {
    width: calc(100% - 2.2rem);
    margin-left: 2.2rem;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Badge = styled.span<{ $category: HonorItem["category"] }>`
  width: fit-content;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  color: ${({ $category }) =>
    $category === "3rd Winner"
      ? "var(--text-primary)"
      : $category === "Honorable Mention"
        ? "color-mix(in srgb, var(--text-primary) 92%, var(--text-muted))"
        : "var(--text-dim)"};
  border: 1px solid
    ${({ $category }) =>
      $category === "3rd Winner"
        ? "color-mix(in srgb, var(--text-primary) 30%, transparent)"
        : $category === "Honorable Mention"
          ? "color-mix(in srgb, var(--text-primary) 24%, transparent)"
          : "color-mix(in srgb, var(--text-dim) 22%, transparent)"};
  background: ${({ $category }) =>
    $category === "3rd Winner"
      ? "color-mix(in srgb, var(--text-primary) 13%, transparent)"
      : $category === "Honorable Mention"
        ? "color-mix(in srgb, var(--text-primary) 10%, transparent)"
        : "color-mix(in srgb, var(--text-dim) 8%, transparent)"};
`;

const Period = styled.p`
  margin: 0;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--text-primary);
`;

const Issuer = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.86rem;
  color: var(--text-muted);
`;

const Description = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--text-dim);
`;

const Empty = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 0.82rem;
  color: var(--text-dim);
  text-align: center;
  padding: 4rem 0;
`;

export function AllHonorsAwards() {
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

          <Title>Honors & Awards</Title>
          <Subtitle>
            {HONORS.length} achievement{HONORS.length !== 1 ? "s" : ""} from competitions and technical events.
          </Subtitle>
        </Header>

        {HONORS.length === 0 ? (
          <Empty>No honors yet.</Empty>
        ) : (
          <Timeline>
            {HONORS.map((honor, index) => {
              const side = index % 2 === 0 ? "left" : "right";

              return (
                <TimelineItem key={`${honor.title}-${honor.issuer}-${honor.period}`} $side={side}>
                  <Dot />
                  <Card>
                    <CardTop>
                      <Badge $category={honor.category}>{honor.category}</Badge>
                      <Period>{honor.period}</Period>
                    </CardTop>
                    <CardTitle>{honor.title}</CardTitle>
                    <Issuer>{honor.issuer}</Issuer>
                    <Description>{honor.description}</Description>
                  </Card>
                </TimelineItem>
              );
            })}
          </Timeline>
        )}
      </Inner>
    </Page>
  );
}
