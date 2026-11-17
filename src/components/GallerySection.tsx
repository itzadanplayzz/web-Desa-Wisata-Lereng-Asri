import {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, Expand, X} from 'lucide-react';
import {GALLERY_ITEMS, GalleryItem} from '../data/villageData';
import {VillageImage} from './VillageImage';

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_ITEMS.length));
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  const activeItem: GalleryItem | null =
    activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <>
      {/* Mobile Horizontal Snap Carousel + Desktop Bento Grid */}
      <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
        {GALLERY_ITEMS.map((item, idx) => {
          const desktopSpan =
            item.spanDesktop === 'wide' ? 'md:col-span-2' : 'md:col-span-1';
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`group relative snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-auto ${desktopSpan} h-72 md:h-80 rounded-2xl overflow-hidden text-left bg-[#ebe8df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e]`}
            >
              <VillageImage
                src={item.image}
                alt={item.imageAlt}
                fallbackTitle={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c17]/85 via-[#1c1c17]/25 to-transparent" />
              <span
                aria-hidden="true"
                className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/90 text-[#1c1c17] flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              >
                <Expand className="w-4 h-4" />
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <p className="text-xs font-medium text-white/85">{item.spot}</p>
                <h3 className="text-lg font-bold leading-snug mt-0.5">{item.title}</h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox Preview */}
      {activeItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#1c1c17]/90 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="w-full max-w-4xl bg-[#fcf9f0] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#1c1c17]">
              <VillageImage
                src={activeItem.image}
                alt={activeItem.imageAlt}
                fallbackTitle={activeItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Tutup galeri foto"
                className="absolute top-3 right-3 min-h-[44px] min-w-[44px] rounded-full bg-white text-[#1c1c17] flex items-center justify-center shadow-md hover:bg-[#f1eee5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#954a17]">
                  {activeItem.spot} · Foto {activeIndex + 1} dari {GALLERY_ITEMS.length}
                </p>
                <h3 className="text-xl font-bold text-[#1c1c17] mt-1">{activeItem.title}</h3>
                <p className="text-base text-[#404945] mt-1">{activeItem.caption}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
                  }
                  aria-label="Foto sebelumnya"
                  className="min-h-[48px] min-w-[48px] rounded-full border border-[#1b4d3e]/20 bg-white hover:bg-[#f1eee5] text-[#1c1c17] flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % GALLERY_ITEMS.length)}
                  aria-label="Foto berikutnya"
                  className="min-h-[48px] min-w-[48px] rounded-full border border-[#1b4d3e]/20 bg-white hover:bg-[#f1eee5] text-[#1c1c17] flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
