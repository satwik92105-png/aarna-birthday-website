import React, { useState } from 'react';
import { sound } from '@/utils/soundEngine';
import { getMemoryImage } from '@/utils/assets';
import { Heart, Sparkles, X, Maximize2 } from 'lucide-react';

interface ScrapbookPhoto {
  id: string;
  filename: string;
  title: string;
  caption: string;
  story: string;
  tag: string;
  rotation: string;
  tapeColor: string;
}

const PHOTOS: ScrapbookPhoto[] = [
  {
    id: 'photo-1',
    filename: 'aarna_yellow_dress.jpg',
    title: 'The Yellow Dress Diva 💛',
    caption: 'Casually slaying while holding a can ✨',
    story: 'From wearing our messy school uniform every day to this stunning look. I remember seeing this and thinking: wow, my desk partner really is a movie star in disguise!',
    tag: 'Bollywood Main Character',
    rotation: '-rotate-2',
    tapeColor: 'bg-pink-300'
  },
  {
    id: 'photo-2',
    filename: 'aarna_yellow_flower.jpg',
    title: 'The Sunflower Smile 🌼',
    caption: 'Flower in hair, pure mischief in eyes',
    story: 'That exact cheeky smile that made surviving boring double-period classes possible. Whenever you smiled like this, you were definitely planning some mischief.',
    tag: '100% Serotonin Generator',
    rotation: 'rotate-3',
    tapeColor: 'bg-amber-300'
  },
  {
    id: 'photo-3',
    filename: 'aarna_golden_peace.jpg',
    title: 'Golden Hour Serenity 🌅',
    caption: 'Eyes closed against the warm sunlight',
    story: 'Beneath all the loud laughs, dramatic reactions, and funny roasts lives one of the sweetest, kindest souls I have ever known. Truly irreplaceable.',
    tag: 'Heart of Pure Gold',
    rotation: '-rotate-3',
    tapeColor: 'bg-rose-300'
  },
  {
    id: 'photo-4',
    filename: 'aarna_beach_walk.jpg',
    title: 'Walking Towards The Horizon 🌊',
    caption: 'Barefoot on sands, chasing tides',
    story: 'School walls were only the beginning for you. Your world, your dreams, and your future are as vast as the open ocean. Keep shining, choti!',
    tag: 'Unstoppable Trajectory',
    rotation: 'rotate-2',
    tapeColor: 'bg-sky-300'
  },
  {
    id: 'photo-5',
    filename: 'aarna_traditional_saree.jpg',
    title: 'The Royal Desi Princess 👑',
    caption: 'Grace, orange elegance & glowing bangles',
    story: 'Who gave you permission to look this breathtaking?! One second you are teasing me in school, next second you look like royalty from a historical drama.',
    tag: 'Absolute Stunner',
    rotation: '-rotate-1',
    tapeColor: 'bg-orange-300'
  },
  {
    id: 'photo-6',
    filename: 'aarna_car_selfie.jpg',
    title: 'The 1000-Watt Laugh 🚗',
    caption: 'Warm car selfie with contagious joy',
    story: 'The most infectious laughter ever recorded. Seriously, anyone having a bad day just needs to hear you laugh for five seconds and their mood is completely fixed.',
    tag: 'Instant Bad Mood Cure',
    rotation: 'rotate-4',
    tapeColor: 'bg-pink-400'
  },
  {
    id: 'photo-7',
    filename: 'aarna_ditch_plans.jpg',
    title: 'The "Ditch Plans" Queen 😴',
    caption: 'Our official life anthem on a shirt',
    story: 'Mirror selfie proudly declaring "Ditch plans". Nothing describes our shared desire to cancel social obligations, stay under blankets, and eat snacks better than this.',
    tag: 'Relatable Legend',
    rotation: '-rotate-3',
    tapeColor: 'bg-purple-300'
  },
  {
    id: 'photo-8',
    filename: 'aarna_mountain_clouds.jpg',
    title: 'Above The Misty Peaks ☁️',
    caption: 'Looking out over clouds and green valleys',
    story: 'No matter what mountains life puts in front of you, remember you were born to rise above them. And remember your brother is always cheering right behind you.',
    tag: 'Reaching New Heights',
    rotation: 'rotate-1',
    tapeColor: 'bg-emerald-300'
  },
  {
    id: 'photo-9',
    filename: 'aarna_beach_waves.jpg',
    title: 'Where The Tides Meet 🏖️',
    caption: 'Hands in hair, ocean foam on feet',
    story: 'Wild, free, and happy in your element. Never lose that untamed spark that makes you so uniquely Aarna.',
    tag: 'Free Spirit',
    rotation: '-rotate-2',
    tapeColor: 'bg-teal-300'
  },
  {
    id: 'photo-10',
    filename: 'aarna_glasses_mirror.jpg',
    title: 'Pretending To Be Studious 🤓',
    caption: 'Glasses on, serious face activated',
    story: 'Wearing glasses to pretend we weren\'t just gossiping two seconds before the teacher turned around to face the class. Tactical deception at its finest.',
    tag: 'Desk 12 Disguise',
    rotation: 'rotate-2',
    tapeColor: 'bg-pink-300'
  },
  {
    id: 'photo-11',
    filename: 'aarna_neon_portrait.jpg',
    title: 'The Violet Aesthetic 💜',
    caption: 'Moody purple neon lighting',
    story: 'Looking like a cool protagonist from an indie film. Effortlessly cool and magnetic.',
    tag: 'Aesthetic Queen',
    rotation: '-rotate-3',
    tapeColor: 'bg-indigo-300'
  },
  {
    id: 'photo-12',
    filename: 'aarna_friends_watercolor.jpg',
    title: 'Where It All Began 🎨',
    caption: 'The sacred lunchtime tiffin break',
    story: 'Over stolen snacks, classroom desk benches, and sharing our honest thoughts. That 8 AM to 2 PM window created a bond stronger than most friendships of 10 years.',
    tag: 'Foundational Sisterhood',
    rotation: 'rotate-1',
    tapeColor: 'bg-rose-400'
  }
];

export const ScrapbookWall: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<ScrapbookPhoto | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleOpen = (photo: ScrapbookPhoto) => {
    sound.playDiscoveryChime();
    setSelectedPhoto(photo);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playDiscoveryChime();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="scrapbook" className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <span>AARNA'S PHOTO SCRAPBOOK</span>
          <span>•</span>
          <span>TAP TO REVEAL STORIES</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
          A Scrapbook of My <br />
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Favourite Memories With You 📸
          </span>
        </h2>
        <p className="text-slate-600 mt-4 text-base sm:text-lg">
          Click any Polaroid to view the full picture, read the secret backstory, and send some love!
        </p>
      </div>

      {/* Polaroid Grid with realistic tilts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
        {PHOTOS.map((item) => {
          const currentLikes = likes[item.id] || 0;
          const imageUrl = getMemoryImage(item.filename);
          return (
            <div
              key={item.id}
              onClick={() => handleOpen(item)}
              className={`polaroid-card group ${item.rotation}`}
            >
              {/* Colored Washi Tape */}
              <div className={`polaroid-tape ${item.tapeColor}`} />

              {/* Photo Image Frame */}
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-pink-50 relative">
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-pink-600 shadow-sm">
                  {item.tag}
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className="mt-3 px-1 text-center">
                <p className="font-handwriting text-xl text-slate-800 font-bold group-hover:text-pink-600 transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.caption}
                </p>

                <div className="mt-3 pt-2.5 border-t border-pink-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] font-semibold text-pink-500 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" /> Tap to open
                  </span>
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className="flex items-center gap-1 text-pink-500 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${currentLikes > 0 ? 'fill-pink-500' : ''}`} />
                    <span className="font-bold">{currentLikes > 0 ? currentLikes : 'Love'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* POPUP LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-slate-600 hover:text-pink-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Photo Display */}
              <div className="rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 max-h-[55vh] flex items-center justify-center">
                <img
                  src={getMemoryImage(selectedPhoto.filename)}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[55vh] object-contain"
                />
              </div>

              {/* Title & Tag */}
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-2">
                  {selectedPhoto.tag}
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  {selectedPhoto.title}
                </h3>
                <p className="font-handwriting text-xl text-pink-600 mt-1">
                  "{selectedPhoto.caption}"
                </p>
              </div>

              {/* Story */}
              <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-100 text-slate-700 text-sm sm:text-base leading-relaxed">
                <span className="font-bold text-pink-700 block mb-1 uppercase text-xs tracking-wider">
                  MEMORIES FROM DESK 12:
                </span>
                {selectedPhoto.story}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={(e) => handleLike(selectedPhoto.id, e)}
                  className="btn-vibrant-pink py-2.5 px-6 text-xs cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Send Love {(likes[selectedPhoto.id] || 0) > 0 ? `(${likes[selectedPhoto.id]})` : ''}</span>
                </button>

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-pink-50 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
