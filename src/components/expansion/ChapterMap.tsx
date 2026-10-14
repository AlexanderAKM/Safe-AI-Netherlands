/* The Netherlands with SAIN's six cities, as the /new-chapters hero drawing.

   The geometry is the claim: three chapters already run (navy), three are
   being started (orange, the part of the picture that is still rising). The
   outline is a simplified projection of the real coastline and borders, so
   every city sits where it actually is; the IJsselmeer and the Wadden islands
   are drawn because without them the shape stops reading as the Netherlands.

   Coordinates come from an equirectangular projection at 52.2°N, 150 units
   per degree of latitude. Re-run the projection rather than nudging a point
   by hand if a city ever moves. */

const LAND =
  "M5.5 337.5 L21.1 349.5 L46.0 361.5 L69.0 357.0 L86.4 340.5 L103.9 339.0 L114.9 328.5 L135.1 321.0 L160.9 322.5 L178.4 346.5 L202.3 349.5 L218.8 364.5 L233.5 378.0 L228.9 400.5 L219.7 423.0 L239.0 430.5 L250.1 430.5 L255.6 408.0 L241.8 388.5 L263.9 366.0 L255.6 352.5 L268.5 333.0 L257.4 303.0 L245.5 282.0 L257.4 264.0 L285.0 268.5 L317.2 255.0 L324.5 232.5 L345.7 207.0 L342.9 186.0 L335.6 177.0 L312.6 169.5 L317.2 147.0 L346.6 145.5 L344.8 115.5 L359.5 66.0 L358.6 57.0 L340.2 48.0 L333.7 43.5 L324.5 25.5 L294.2 28.5 L266.6 31.5 L243.6 33.0 L216.0 46.5 L194.0 67.5 L192.1 81.0 L159.0 103.5 L151.7 102.0 L134.2 99.0 L128.7 111.0 L122.3 138.0 L117.7 171.0 L112.2 189.0 L101.1 210.0 L88.3 228.0 L75.4 244.5 L62.5 247.5 L67.1 261.0 L50.6 268.5 L35.9 285.0 L46.0 294.0 L34.9 303.0 L13.8 312.0 L24.8 327.0 L23.0 333.0 Z";

const LAKE =
  "M159.0 103.5 L192.1 81.0 L193.1 102.0 L188.5 111.0 L220.6 117.0 L211.5 126.0 L210.5 144.0 L199.5 156.0 L195.8 165.0 L176.5 187.5 L160.9 183.0 L165.5 172.5 L162.7 165.0 L161.8 147.0 L170.1 138.0 L183.0 138.0 L174.7 123.0 L165.5 127.5 L160.9 115.5 Z";

const ISLANDS = [
  "M130.5 93.0 L137.9 66.0 L147.1 78.0 L137.9 93.0 Z",
  "M148.9 60.0 L165.5 45.0 L169.2 48.0 L154.5 61.5 Z",
  "M172.8 40.5 L206.9 25.5 L209.6 30.0 L176.5 42.0 Z",
  "M213.3 27.0 L240.9 22.5 L241.8 27.0 L216.0 30.0 Z",
  "M257.4 21.0 L275.8 16.5 L277.6 21.0 L259.3 24.0 Z",
];

type City = {
  name: string;
  x: number;
  y: number;
  /** Label position and anchor, placed by hand so Delft and The Hague,
      eight kilometres apart, never collide. */
  lx: number;
  ly: number;
  anchor: "start" | "end";
  founding: boolean;
};

const CITIES: City[] = [
  { name: "Groningen", x: 300.6, y: 60.0, lx: 300.6, ly: 84, anchor: "end", founding: false },
  { name: "Amsterdam", x: 147.1, y: 187.5, lx: 139, ly: 176, anchor: "end", founding: false },
  { name: "Utrecht", x: 167.3, y: 229.5, lx: 177, ly: 233.5, anchor: "start", founding: false },
  { name: "The Hague", x: 91.9, y: 231.0, lx: 77, ly: 222, anchor: "end", founding: true },
  { name: "Delft", x: 97.5, y: 241.5, lx: 83, ly: 262, anchor: "end", founding: true },
  { name: "Eindhoven", x: 199.5, y: 327.0, lx: 216, ly: 331, anchor: "start", founding: true },
];

export default function ChapterMap({ className }: { className?: string }) {
  let ring = 0;
  return (
    <figure className={className}>
      <svg
        viewBox="-12 4 390 440"
        role="img"
        aria-labelledby="chapter-map-title chapter-map-desc"
        className="h-auto w-full overflow-visible"
      >
        <title id="chapter-map-title">SAIN&rsquo;s chapters in the Netherlands</title>
        <desc id="chapter-map-desc">
          Chapters run in Groningen, Amsterdam and Utrecht. Starting teams are
          wanted in Eindhoven, Delft and The Hague.
        </desc>

        <g strokeLinejoin="round">
          <path d={LAND} className="fill-navy/[0.035] stroke-navy/30" strokeWidth={1} />
          {ISLANDS.map((d) => (
            <path key={d} d={d} className="fill-navy/[0.035] stroke-navy/30" strokeWidth={1} />
          ))}
          <path d={LAKE} className="fill-white stroke-navy/20" strokeWidth={1} />
        </g>

        {CITIES.map((city) => (
          <g key={city.name}>
            {city.founding ? (
              <>
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={12}
                  fill="none"
                  strokeWidth={1.25}
                  strokeDasharray="3 3"
                  className="founding-ring stroke-orange"
                  style={{ animationDelay: `${0.35 + 0.12 * ring++}s` }}
                />
                <circle cx={city.x} cy={city.y} r={5} className="fill-orange" />
              </>
            ) : (
              <circle cx={city.x} cy={city.y} r={4} className="fill-navy" />
            )}
            <text
              x={city.lx}
              y={city.ly}
              textAnchor={city.anchor}
              className={
                city.founding
                  ? "fill-navy font-serif text-[15px]"
                  : "fill-navy/60 font-sans text-[12px]"
              }
            >
              {city.name}
            </text>
          </g>
        ))}
      </svg>

      <figcaption className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-caption text-navy/65">
        <span className="inline-flex items-center gap-2">
          <span className="size-[8px] rounded-full bg-navy" aria-hidden="true" />
          Chapter running
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="size-[14px] rounded-full border border-dashed border-orange p-[2px]"
            aria-hidden="true"
          >
            <span className="block size-full rounded-full bg-orange" />
          </span>
          Starting team wanted
        </span>
      </figcaption>
    </figure>
  );
}
