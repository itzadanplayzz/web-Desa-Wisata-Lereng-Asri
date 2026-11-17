import {useEffect} from 'react';
import {Clock, Compass, MessageCircle, Sparkles, X} from 'lucide-react';
import {Destination, formatRupiah} from '../data/villageData';
import {VillageImage} from './VillageImage';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookDestination: (destinationName: string) => void;
}

export function DestinationDetailModal({
  destination,
  onClose,
  onBookDestination,
}: DestinationDetailModalProps) {
  useEffect(() => {
    if (!destination) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [destination, onClose]);

  if (!destination) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#1c1c17]/60 backdrop-blur-xs p-0 md:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dest-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-2xl bg-[#fcf9f0] rounded-t-3xl md:rounded-2xl shadow-2xl border border-[#1b4d3e]/15 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 sm:h-72 shrink-0 overflow-hidden bg-[#ebe8df]">
          <VillageImage
            src={destination.image}
            alt={destination.imageAlt}
            fallbackTitle={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail destinasi"
            className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/95 text-[#1c1c17] hover:bg-white shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <p className="text-sm font-medium text-white/90">
              {destination.categoryLabel} · {destination.distanceFromBase}
            </p>
            <h2 id="dest-modal-title" className="text-2xl sm:text-3xl font-extrabold mt-0.5">
              {destination.name}
            </h2>
          </div>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          <p className="text-base sm:text-lg leading-relaxed text-[#1c1c17]">
            {destination.fullDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#1b4d3e]/12">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#1b4d3e] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1c1c17]">Waktu Terbaik</p>
                <p className="text-sm text-[#404945] mt-0.5">{destination.bestTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#1b4d3e] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1c1c17]">Durasi &amp; Medan</p>
                <p className="text-sm text-[#404945] mt-0.5">
                  {destination.duration} · {destination.difficulty}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1c1c17] mb-2.5">Fasilitas Tersedia</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#404945]">
              {destination.facilities.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#954a17] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#f1eee5] text-sm text-[#1c1c17]">
            <span className="font-bold">Tips Berkunjung: </span>
            <span className="text-[#404945]">{destination.tips}</span>
          </div>
        </div>

        <div className="p-4 sm:px-6 sm:py-4 bg-white border-t border-[#1b4d3e]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[#404945]">Tiket Masuk Per Orang</p>
            <p className="text-xl font-extrabold text-[#954a17] tabular-nums">
              {formatRupiah(destination.ticketPrice)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookDestination(`Ingin berkunjung dan bertanya tentang ${destination.name}`);
            }}
            className="min-h-[50px] px-6 py-3 rounded-full bg-[#0f7a3e] hover:bg-[#0b6332] text-white text-base font-bold inline-flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>Tanya &amp; Pesan Pemandu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
