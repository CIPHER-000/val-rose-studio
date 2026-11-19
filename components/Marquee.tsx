const ITEMS = [
  "Fashion & Styling",
  "Beauty & Skincare",
  "Haircare & Lifestyle",
  "Editorial Direction",
  "Product Storytelling",
  "Seasonal Campaigns",
];

/**
 * Slow editorial ticker between the hero and the introduction. Pauses on hover,
 * and becomes a static wrapped list for reduced-motion users (handled in CSS).
 */
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-shell grain overflow-hidden border-y border-ink/15 bg-ink py-4 text-paper">
      <div className="marquee-track items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="text-[13px] uppercase tracking-[0.28em] text-paper/85">{item}</span>
            <span className="text-rose/70">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
