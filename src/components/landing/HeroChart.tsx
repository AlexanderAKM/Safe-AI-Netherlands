import Image from "next/image";
import { getDictionary, type Locale } from "@/i18n";

/** Learning and practical work help people shape AI's trajectory. */
export default function HeroChart({ locale }: { locale: Locale }) {
  return (
    <Image
      src="/illustrations/sain-learning-to-steering.svg"
      alt={getDictionary(locale).landing.heroChartAlt}
      width={720}
      height={500}
      className="h-auto w-full max-w-[560px]"
      priority
    />
  );
}
