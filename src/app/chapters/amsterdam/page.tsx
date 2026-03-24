import ChapterPlaceholder from "@/components/ChapterPlaceholder";

export const metadata = { title: "SAIN Amsterdam" };

export default function AmsterdamPage() {
  return (
    <ChapterPlaceholder
      city="Amsterdam"
      description="We are working to establish a SAIN chapter in Amsterdam — the Netherlands' largest city, home to a thriving AI research community and major tech companies."
      universityContext="With institutions like the University of Amsterdam (UvA) and Vrije Universiteit Amsterdam (VU), Amsterdam is a natural hub for AI Safety research and education."
    />
  );
}
