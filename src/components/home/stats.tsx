"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  {
    value: 95,
    suffix: "%",
    label: "Graduation rate",
    labelRu: "Уровень выпуска",
    description: "Один из самых высоких показателей выпуска. Наш онлайн-университет имеет отличную репутацию.",
    color: "text-turkestan-600",
  },
  {
    value: 70,
    suffix: "%",
    label: "Placement rate",
    labelRu: "Уровень трудоустройства",
    description: "Большинство наших выпускников находят работу в индустрии.",
    color: "text-turkestan-600",
  },
  {
    value: 95,
    suffix: "%",
    label: "Satisfaction rating",
    labelRu: "Уровень удовлетворенности",
    description: "Мы стремимся, чтобы все наши студенты углубляли знания и получали удовольствие.",
    color: "text-turkestan-600",
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(easeOutQuart * value);

              setDisplayValue(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex items-baseline gap-1">
      <span className="text-7xl md:text-8xl font-serif font-light text-turkestan-600 stat-number">
        {displayValue}
      </span>
      <span className="text-3xl md:text-4xl font-light text-turkestan-400">{suffix}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif">
            Узнайте, чего вы можете достичь
            <br />
            <span className="text-muted-foreground">с правильными инструментами и руководством</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{stat.labelRu}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
