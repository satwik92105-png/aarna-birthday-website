import React, { useState, useRef, useEffect } from 'react';
import { useInstituteStore } from '@/store/useInstituteStore';
import { sound } from '@/utils/soundEngine';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, Maximize2, X, Heart, Sparkles, Compass } from 'lucide-react';

interface PhotoExhibit {
  id: string;
  title: string;
  subtitle: string;
  classification: string;
  date: string;
  image: string;
  aspect: string;
  span: string; // Tailwind grid span
  caption: string;
  story: string;
  quote: string;
  featured?: boolean;
}

const EXHIBITS: PhotoExhibit[] = [
  {
    id: 'EX-01',
    title: 'The Yellow Dress Metamorphosis',
    subtitle: 'Exhibit 001 • Absolute Royalty',
    classification: 'ICONIC METAMORPHOSIS',
    date: 'Preserved Memory',
    image: '/images/memories/aarna_yellow_dress.jpg',
    aspect: 'aspect-[9/16]',
    span: 'col-span-1 md:col-span-2 row-span-2',
    caption: 'From school corridor chaos to effortless Bollywood elegance.',
    story: 'For years we only saw each other in school uniform across Desk 12. Then this photograph appeared. The entire institute committee agreed: the slaying scale broke beyond 1000/10.',
    quote: '"How can someone so chaotic in the classroom look so breathtakingly regal?"',
    featured: true
  },
  {
    id: 'EX-02',
    title: 'The Wildflower Smile',
    subtitle: 'Exhibit 002 • Serotonin Generator',
    classification: 'PEAK EMOTIONAL GRAVITY',
    date: 'Preserved Memory',
    image: '/images/memories/aarna_yellow_flower.jpg',
    aspect: 'aspect-square',
    span: 'col-span-1',
    caption: 'Yellow blossom in hair, teasing grin.',
    story: 'The exact expression that could instantly dissolve a stressful exam week. A smile that made double-period mathematics survivable.',
    quote: '"The natural antidote to any bad mood in a five-mile radius."',
    featured: true
  },
  {
    id: 'EX-03',
    title: 'Golden Hour Serenity',
    subtitle: 'Exhibit 003 • Acoustic Quietude',
    classification: 'SANCTUARY PROTOCOL',
    date: 'Golden Hour',
    image: '/images/memories/aarna_golden_peace.jpg',
    aspect: 'aspect-square',
    span: 'col-span-1',
    caption: 'Eyes gently closed against the sunset.',
    story: 'Beneath the endless jokes, dramatic reactions, and loud laughter lives one of the kindest, most peaceful souls. Rare and treasured.',
    quote: '"Peace isn\'t the absence of noise; it\'s feeling safe with someone who knows you."',
    featured: true
  },
  {
    id: 'EX-04',
    title: 'Walking Towards The Horizon',
    subtitle: 'Exhibit 004 • Unbounded Trajectory',
    classification: 'COASTAL RESONANCE',
    date: 'Ocean Shore',
    image: '/images/memories/aarna_beach_walk.jpg',
    aspect: 'aspect-[3/4]',
    span: 'col-span-1 md:col-span-2',
    caption: 'Barefoot on wet sands, gazing at infinite tides.',
    story: 'School walls were only the launching pad. Your horizons will stretch across oceans, cities, and dreams that are as big as you deserve.',
    quote: '"The ocean is vast, but her determination is wider."',
    featured: true
  },
  {
    id: 'EX-05',
    title: 'Where Tides Meet',
    subtitle: 'Exhibit 005 • Natural Element',
    classification: 'FREE RESILIENCE',
    date: 'Breaking Waves',
    image: '/images/memories/aarna_beach_waves.jpg',
    aspect: 'aspect-[3/4]',
    span: 'col-span-1',
    caption: 'Hands in hair, dancing in sea foam.',
    story: 'Completely free, completely unbothered, and thriving in the chaos of nature.',
    quote: '"Untamed like the waves, but twice as graceful."'
  },
  {
    id: 'EX-06',
    title: 'Above The Misty Peaks',
    subtitle: 'Exhibit 006 • Mountain Sanctuary',
    classification: 'HIGH ALTITUDE SPIRIT',
    date: 'Valley Vista',
    image: '/images/memories/aarna_mountain_clouds.jpg',
    aspect: 'aspect-[4/5]',
    span: 'col-span-1',
    caption: 'Looking out over pine forests and rolling fog.',
    story: 'Life will throw mountains at you, but you were created with wings. You will conquer every peak.',
    quote: '"Looking over clouds, right where she belongs."'
  },
  {
    id: 'EX-07',
    title: 'The Desi Princess',
    subtitle: 'Exhibit 007 • Traditional Splendor',
    classification: 'REGAL HERITAGE',
    date: 'Festive Day',
    image: '/images/memories/aarna_traditional_saree.jpg',
    aspect: 'aspect-[9/16]',
    span: 'col-span-1 md:col-span-2',
    caption: 'Orange saree, golden bangles, timeless grace.',
    story: 'Proof that Aarna can transition from mischievous classmate to absolute Indian princess in zero seconds flat.',
    quote: '"Heritage, beauty, and that unmistakable spark of mischief."'
  },
  {
    id: 'EX-08',
    title: 'The 1000-Watt Laugh',
    subtitle: 'Exhibit 008 • Car Chronicle',
    classification: 'UNGUARDED HAPPINESS',
    date: 'Transit Log',
    image: '/images/memories/aarna_car_selfie.jpg',
    aspect: 'aspect-[9/16]',
    span: 'col-span-1',
    caption: 'Warm car selfie, sunlit smile.',
    story: 'The most infectious laugh on the planet. Anyone who gets to hear it regularly is genuinely fortunate.',
    quote: '"Laughter that could restart a tired heart."'
  },
  {
    id: 'EX-09',
    title: 'The Introvert\'s Manifesto',
    subtitle: 'Exhibit 009 • Strategic Evasion',
    classification: 'PHILOSOPHICAL CODE',
    date: 'Evening Mirror',
    image: '/images/memories/aarna_ditch_plans.jpg',
    aspect: 'aspect-[9/16]',
    span: 'col-span-1',
    caption: 'Wearing "Ditch plans" with total conviction.',
    story: 'The sacred philosophy of declining plans to stay in cozy blankets and eat snacks. Highly approved by the Institute.',
    quote: '"Canceling plans is self-care, and she has a PhD in it."'
  },
  {
    id: 'EX-10',
    title: 'The Violet Atmosphere',
    subtitle: 'Exhibit 010 • Cinematic Glow',
    classification: 'NEON AMBIENCE',
    date: 'Nightfall',
    image: '/images/memories/aarna_neon_portrait.jpg',
    aspect: 'aspect-[3/4]',
    span: 'col-span-1',
    caption: 'Bathed in moody ultraviolet illumination.',
    story: 'Every movie needs a director; every life needs cinematic lighting. Looking like an indie film protagonist.',
    quote: '"Cool, composed, and effortlessly magnetic."'
  },
  {
    id: 'EX-11',
    title: 'The Topper Camouflage',
    subtitle: 'Exhibit 011 • Deceptive Disguise',
    classification: 'TACTICAL INTELLECT',
    date: 'Classroom Preparation',
    image: '/images/memories/aarna_glasses_mirror.jpg',
    aspect: 'aspect-[9/16]',
    span: 'col-span-1',
    caption: 'Glasses on, looking entirely studious.',
    story: 'Wearing glasses to pretend we weren\'t just gossiping two seconds before the teacher walked in.',
    quote: '"Academic camouflage: 10/10."'
  },
  {
    id: 'EX-12',
    title: 'The Tiffin Commemorative Art',
    subtitle: 'Exhibit 012 • The Sacred Watercolor',
    classification: 'FOUNDATIONAL RELIC',
    date: 'Recess 10:45 AM',
    image: '/images/memories/aarna_friends_watercolor.jpg',
    aspect: 'aspect-[4/3]',
    span: 'col-span-1 md:col-span-2',
    caption: 'Sharing snacks under classroom fans.',
    story: 'Where our entire sisterhood began. Over stolen parathas, dry biscuits, and laughing until our stomachs hurt.',
    quote: '"The Sister Tax on food was non-negotiable."'
  }
];

export const MemoryArchiveScene: React.FC = () => {
  const { setScene, discoverExhibit, discoveredSecrets, discoverSecret } = useInstituteStore();
  const [activePhoto, setActivePhoto] = useState<PhotoExhibit | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header typography reveal
      gsap.from('.archive-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Photo grid staggered clip reveal
      gsap.from('.editorial-photo-card', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpenPhoto = (item: PhotoExhibit) => {
    sound.playDiscoveryChime();
    setActivePhoto(item);
    discoverExhibit(item.id);

    if (item.id === 'EX-01') {
      discoverSecret('secret-archive-slay');
    }
  };

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playDiscoveryChime();
    setLikedPhotos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div ref={containerRef} className="scene min-h-screen bg-[#101114] text-[#F2EBDD] pt-20 pb-28 px-6 md:px-16 lg:px-24">
      {/* Editorial Title & Archival Stamping */}
      <div className="archive-header max-w-7xl mx-auto mb-16 border-b border-[#2a2930] pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="label-eyebrow mb-3">DEPARTMENT 04 — THE PHOTOMETRIC REPOSITORY</div>
            <h1 className="heading-hero text-[#F2EBDD]">
              Archive of Ordinary Miracles.
            </h1>
            <p className="text-editorial text-[#A9A49A] mt-4 max-w-2xl">
              A curated photographic exhibition honoring Aarna's journey. Click any photograph to declassify high-resolution archival notes.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#806B4A]">
            <span className="px-3 py-1.5 rounded border border-[#2a2930] bg-[#16171d]">
              {EXHIBITS.length} PRESERVED ARTIFACTS
            </span>
            <span className="px-3 py-1.5 rounded border border-[#2a2930] bg-[#16171d]">
              SUBJECT ID: A-5546
            </span>
          </div>
        </div>
      </div>

      {/* ASYMMETRIC EDITORIAL PHOTO GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
        {EXHIBITS.map((item) => {
          const isLiked = likedPhotos.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleOpenPhoto(item)}
              className={`editorial-photo-card group relative overflow-hidden rounded-xl bg-[#15161b] border border-[#2a2930] cursor-pointer hover:border-[#B99A65]/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(185,154,101,0.12)] transition-all duration-700 ${item.span}`}
            >
              {/* Photo Image with smooth scale */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top metadata badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#F2EBDD]/80">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  {item.id}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 uppercase">
                  {item.classification}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <span className="font-editorial text-xs italic text-[#B99A65] mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-editorial text-2xl font-medium text-[#F2EBDD] leading-tight group-hover:text-[#B99A65] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A9A49A] mt-2 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>

                {/* Hover Reveal Actions */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[10px] text-[#B99A65] flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" /> INSPECT ARTIFACT
                  </span>
                  <button
                    onClick={(e) => handleToggleLike(item.id, e)}
                    className={`p-1.5 rounded-full transition-colors ${
                      isLiked ? 'text-[#f43f5e]' : 'text-[#A9A49A] hover:text-[#B99A65]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* HORIZONTAL FILM-STRIP SECTION */}
      <div className="max-w-7xl mx-auto mt-24">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a2930]">
          <div>
            <div className="label-eyebrow">SEQUENCE REEL // 35MM CONTACT SHEET</div>
            <h2 className="heading-sub text-[#F2EBDD] mt-1">
              Moments Between The Bells
            </h2>
          </div>
          <span className="font-mono text-xs text-[#6b6760] hidden sm:block">
            SCROLL HORIZONTALLY →
          </span>
        </div>

        <div className="film-strip gap-6 pb-6">
          {EXHIBITS.slice(0, 7).map((item) => (
            <div
              key={`reel-${item.id}`}
              onClick={() => handleOpenPhoto(item)}
              className="w-72 shrink-0 rounded-xl bg-[#16171d] border border-[#2a2930] p-3 cursor-pointer group hover:border-[#B99A65] transition-all"
            >
              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-black mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="font-mono text-[10px] text-[#B99A65] block">{item.id} • {item.date}</span>
              <h4 className="font-editorial text-lg text-[#F2EBDD] group-hover:text-[#B99A65] transition-colors truncate">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="max-w-7xl mx-auto mt-20 flex items-center justify-between">
        <button
          onClick={() => setScene('envelopes')}
          className="btn-ghost cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Archival Envelopes</span>
        </button>

        <button
          onClick={() => setScene('letter')}
          className="btn-primary cursor-pointer"
        >
          <span>The Creator's Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* FULL-SCREEN LIGHTBOX OVERLAY */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-5xl bg-[#14151b] border border-[#B99A65]/40 rounded-2xl shadow-2xl p-6 sm:p-10 overflow-y-auto max-h-[92vh]">
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1e2029] border border-[#35343d] flex items-center justify-center text-[#A9A49A] hover:text-white hover:border-[#B99A65] transition-all cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Photo Display */}
              <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#2a2930] bg-black shadow-2xl">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                />
              </div>

              {/* Story & Declassified Metadata */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="label-eyebrow block mb-1">
                    {activePhoto.id} // {activePhoto.classification}
                  </span>
                  <h2 className="heading-sub text-[#F2EBDD]">
                    {activePhoto.title}
                  </h2>
                  <span className="font-editorial text-sm italic text-[#B99A65]">
                    {activePhoto.subtitle}
                  </span>
                </div>

                {/* Pull Quote */}
                <blockquote className="p-4 rounded-lg bg-[#1a1b22] border-l-2 border-[#B99A65] font-editorial text-lg italic text-[#F2EBDD] leading-relaxed">
                  {activePhoto.quote}
                </blockquote>

                {/* Personal Story */}
                <div className="space-y-2">
                  <span className="label-muted block">ARCHIVIST DECLASSIFIED STORY</span>
                  <p className="text-body leading-relaxed text-[#cbd5e1]">
                    {activePhoto.story}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="pt-6 border-t border-[#2a2930] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#6b6760]">
                    STATUS: ETERNAL ARTIFACT
                  </span>
                  <button
                    onClick={(e) => handleToggleLike(activePhoto.id, e)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#B99A65] text-xs font-mono text-[#B99A65] hover:bg-[#B99A65] hover:text-[#101114] transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {likedPhotos.includes(activePhoto.id) ? 'FAVORITED ❤️' : 'ADD TO KEEPSAKE'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
