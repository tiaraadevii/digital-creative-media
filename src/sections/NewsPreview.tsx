import { ArrowRight, Calendar } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const articles = [
  {
    image: 'https://images.pexels.com/photos/33411321/pexels-photo-33411321.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Event Highlights',
    title: 'Behind the Scenes of Event Coverage',
    desc: 'A look at how our team captures and publishes event moments with precision.',
    date: 'Demo',
    isDemo: true,
  },
  {
    image: 'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Partnership Updates',
    title: 'Building Meaningful Brand Partnerships',
    desc: 'How we approach collaboration with brands for mutual growth and visibility.',
    date: 'Demo',
    isDemo: true,
  },
  {
    image: 'https://images.pexels.com/photos/17608520/pexels-photo-17608520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Digital & Creative Insights',
    title: 'Digital Media Trends to Watch',
    desc: 'Exploring the latest developments in digital media and content strategy.',
    date: 'Demo',
    isDemo: true,
  },
];

export default function NewsPreview() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="news" className="py-20 md:py-28 bg-white border-t border-border">
      <div className="container-max px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="section-label">Latest Updates</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-3">
              Stories, Insights & Updates.
            </h2>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-offwhite border border-gold/30 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <p className="text-slate text-xs font-medium">Demo content — placeholder articles for layout preview.</p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid md:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {articles.map((article) => (
            <article key={article.title} className="card group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden bg-offwhite">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-gold text-xs font-medium uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate/50 text-xs">
                    <Calendar className="w-3 h-3" />{article.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mb-4 line-clamp-2">{article.desc}</p>
                <span className="inline-flex items-center gap-1 text-navy text-sm font-medium group-hover:text-gold transition-colors duration-200">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="btn-secondary">
            View All News
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
