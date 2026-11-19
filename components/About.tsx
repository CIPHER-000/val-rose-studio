import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-editorial grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:gap-10 md:px-10 md:py-28">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="display-tight mt-5 font-display text-4xl md:text-5xl">
              A considered eye for
              <br />
              fashion and beauty
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:col-start-6">
          <Reveal delay={0.06}>
            <div className="space-y-5 text-[15px] leading-[1.75] text-ink/80">
              <p>
                Valentina Rose is a fashion, beauty and lifestyle content creator working across
                editorial styling, skincare and haircare. Her work centres on visual storytelling —
                building a mood, a look and a narrative frame by frame, then shaping it into
                content that belongs on a brand's own feed.
              </p>
              <p>
                Each piece begins with art direction: a palette, a setting, a silhouette, the way
                light falls across a product. Outfits are styled to be read as looks rather than
                garments; skincare and haircare are shot as rituals rather than demonstrations.
                The result is content that feels considered, consistent and quietly luxurious.
              </p>
              <p>
                She works with brands across fashion and apparel, skincare, beauty and haircare to
                create imagery for launches, evergreen campaigns and seasonal features — from
                editorial lookbooks and outfit stories to product showcases and getting-ready
                content.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm">
              <div>
                <p className="eyebrow">Focus</p>
                <p className="mt-2 leading-relaxed text-ink/80">
                  Fashion &amp; styling
                  <br />
                  Beauty &amp; skincare
                  <br />
                  Haircare &amp; lifestyle
                </p>
              </div>
              <div>
                <p className="eyebrow">Direction</p>
                <p className="mt-2 leading-relaxed text-ink/80">
                  Creative direction
                  <br />
                  Editorial styling
                  <br />
                  Product storytelling
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
