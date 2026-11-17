import Image from "next/image";
import { useTranslations } from "next-intl";

/** Learning and practical work help people shape AI's trajectory. */
export default function HeroChart() {
  const t = useTranslations("home.hero");
  return (
    <Image
      src="/illustrations/sain-learning-to-steering.svg"
      alt={t("chartAlt")}
      width={720}
      height={500}
      className="h-auto w-full max-w-[560px]"
      priority
    />
  );
}
