import {useState} from 'react';
import {Car, Download, ExternalLink, Footprints, MapPin as MapPinIcon, Navigation} from 'lucide-react';
import {
  GOOGLE_MAPS_URL,
  MAP_PINS,
  MapPin,
  VILLAGE_ADDRESS,
  VILLAGE_NAME,
} from '../data/villageData';

export function InteractiveVillageMap() {
  const [selectedPin, setSelectedPin] = useState<MapPin>(MAP_PINS[0]);
  const [downloadedNotice, setDownloadedNotice] = useState(false);

  const handleDownloadMap = () => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640" width="960" height="640">
  <rect width="960" height="640" fill="#fcf9f0"/>
  <rect x="24" y="24" width="912" height="592" rx="24" fill="#f1eee5" stroke="#1b4d3e" stroke-width="2"/>
  <text x="56" y="76" font-family="sans-serif" font-size="28" font-weight="bold" fill="#1b4d3e">Peta Jelajah ${VILLAGE_NAME}</text>
  <text x="56" y="106" font-family="sans-serif" font-size="16" fill="#404945">${VILLAGE_ADDRESS}</text>
  <path d="M180 430 Q300 320 460 360 T740 160" fill="none" stroke="#954a17" stroke-width="4" stroke-dasharray="10 8"/>
  <path d="M460 360 Q560 440 660 440" fill="none" stroke="#1b4d3e" stroke-width="4" stroke-dasharray="8 6"/>
  ${MAP_PINS.map(
    (p, idx) => `
    <g transform="translate(${p.x * 8.4 + 60}, ${p.y * 4.4 + 130})">
      <circle r="16" fill="#1b4d3e" stroke="#ffffff" stroke-width="3"/>
      <text x="0" y="5" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">${idx + 1}</text>
      <text x="24" y="4" font-family="sans-serif" font-size="15" font-weight="bold" fill="#1c1c17">${p.label}</text>
      <text x="24" y="22" font-family="sans-serif" font-size="12" fill="#404945">${p.elevation} - ${p.walkTime}</text>
    </g>`,
  ).join('')}
  <text x="56" y="585" font-family="sans-serif" font-size="14" fill="#1b4d3e">Pusat Informasi &amp; Pemesanan WhatsApp: +62 812-3456-7890 · Buka setiap hari 05.00 - 17.30 WIB</text>
</svg>`;

    const blob = new Blob([svgContent], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Peta-Desa-Wisata-Lereng-Asri.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedNotice(true);
    setTimeout(() => setDownloadedNotice(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Interactive Topographic Trail Map */}
      <div className="lg:col-span-7 bg-[#e7efe9] rounded-2xl border border-[#1b4d3e]/15 overflow-hidden flex flex-col">
        <div className="px-5 py-4 bg-white/80 border-b border-[#1b4d3e]/10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#1c1c17]">Peta Jalur Wisata Desa</h3>
            <p className="text-sm text-[#404945]">
              Ketuk titik lokasi pada peta untuk melihat jarak jalan kaki dan ketinggian.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadMap}
            className="min-h-[44px] px-4 py-2 rounded-full bg-[#1b4d3e] hover:bg-[#003629] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{downloadedNotice ? 'Peta Tersimpan' : 'Unduh Peta Desa'}</span>
          </button>
        </div>

        {/* SVG Topographic Map Canvas */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden select-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="valleyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d9eadc" />
                <stop offset="55%" stopColor="#e8f0e4" />
                <stop offset="100%" stopColor="#f3efe0" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#valleyGrad)" />

            {/* Topographic contour lines */}
            <path
              d="M -5 25 Q 25 18 55 28 T 105 18"
              fill="none"
              stroke="#1b4d3e"
              strokeOpacity="0.12"
              strokeWidth="0.4"
            />
            <path
              d="M -5 45 Q 30 35 60 44 T 105 34"
              fill="none"
              stroke="#1b4d3e"
              strokeOpacity="0.14"
              strokeWidth="0.4"
            />
            <path
              d="M -5 70 Q 35 60 65 68 T 105 58"
              fill="none"
              stroke="#1b4d3e"
              strokeOpacity="0.12"
              strokeWidth="0.4"
            />

            {/* Mountain river stream */}
            <path
              d="M 10 88 Q 20 74 18 66 T 25 46 T 14 15"
              fill="none"
              stroke="#5b9aa9"
              strokeOpacity="0.45"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Main Village Access Road */}
            <path
              d="M 48 96 Q 48 76 48 56"
              fill="none"
              stroke="#954a17"
              strokeOpacity="0.55"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            {/* Walking trails connecting Pendopo to spots */}
            <path
              d="M 48 56 Q 32 62 18 66"
              fill="none"
              stroke="#1b4d3e"
              strokeOpacity="0.45"
              strokeWidth="0.8"
              strokeDasharray="1.5 1.2"
            />
            <path
              d="M 48 56 Q 40 46 34 38"
              fill="none"
              stroke="#1b4d3e"
              strokeOpacity="0.45"
              strokeWidth="0.8"
              strokeDasharray="1.5 1.2"
            />
            <path
              d="M 48 56 Q 64 38 78 22"
              fill="none"
              stroke="#1b4d3e"
              strokeOpacity="0.45"
              strokeWidth="0.8"
              strokeDasharray="1.5 1.2"
            />
            <path
              d="M 48 56 Q 58 64 68 68"
              fill="none"
              stroke="#1b4d3e"
              strokeOpacity="0.45"
              strokeWidth="0.8"
              strokeDasharray="1.5 1.2"
            />
          </svg>

          {/* Road entry label */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-white/90 text-[11px] font-semibold text-[#954a17] border border-[#954a17]/20 pointer-events-none whitespace-nowrap">
            Jalan Masuk Utama dari Kota
          </div>

          {/* Interactive Pins */}
          {MAP_PINS.map((pin, index) => {
            const isActive = selectedPin.id === pin.id;
            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => setSelectedPin(pin)}
                style={{left: `${pin.x}%`, top: `${pin.y}%`}}
                aria-label={`Pilih lokasi ${pin.label}`}
                aria-pressed={isActive}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus-visible:outline-none"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`min-w-[40px] min-h-[40px] px-2.5 rounded-full flex items-center justify-center text-sm font-extrabold shadow-md border-2 transition-transform duration-150 ${
                      isActive
                        ? 'bg-[#954a17] text-white border-white scale-110'
                        : 'bg-[#1b4d3e] text-white border-white group-hover:scale-105'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`mt-1 px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-bold shadow-xs whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-[#1c1c17] text-white'
                        : 'bg-white/95 text-[#1c1c17] border border-[#1b4d3e]/15'
                    }`}
                  >
                    {pin.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Pin Selector List for easy thumb tap on small screens */}
        <div className="p-3 bg-white/90 border-t border-[#1b4d3e]/10 flex gap-2 overflow-x-auto no-scrollbar">
          {MAP_PINS.map((pin, index) => {
            const isActive = selectedPin.id === pin.id;
            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => setSelectedPin(pin)}
                className={`min-h-[40px] px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#1b4d3e] text-white'
                    : 'bg-[#f1eee5] text-[#1c1c17] hover:bg-[#e5e2da]'
                }`}
              >
                {index + 1}. {pin.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location Details & Route Instructions */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-5">
        {/* Selected Pin Info Card */}
        <div className="bg-white rounded-2xl border border-[#1b4d3e]/12 p-5 sm:p-6">
          <p className="text-sm font-semibold text-[#954a17]">
            {selectedPin.category} · {selectedPin.elevation}
          </p>
          <h3 className="text-2xl font-extrabold text-[#1c1c17] mt-1">{selectedPin.label}</h3>
          <p className="text-base text-[#404945] leading-relaxed mt-3">{selectedPin.summary}</p>
          <div className="mt-4 pt-4 border-t border-[#1b4d3e]/10 flex items-center gap-2.5 text-sm font-semibold text-[#1b4d3e]">
            <Footprints className="w-5 h-5 shrink-0" />
            <span>{selectedPin.walkTime}</span>
          </div>
        </div>

        {/* Access & Google Maps Direction Card */}
        <div className="bg-[#f6f3ea] rounded-2xl border border-[#1b4d3e]/12 p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-3">
            <MapPinIcon className="w-5 h-5 text-[#1b4d3e] mt-1 shrink-0" />
            <div>
              <h4 className="text-base font-bold text-[#1c1c17]">Alamat Pusat Informasi</h4>
              <p className="text-sm sm:text-base text-[#404945] mt-1">{VILLAGE_ADDRESS}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 text-[#1b4d3e] mt-1 shrink-0" />
            <div>
              <h4 className="text-base font-bold text-[#1c1c17]">Akses Kendaraan</h4>
              <p className="text-sm sm:text-base text-[#404945] mt-1">
                ±45 menit dari pusat kota melalui jalan aspal mulus. Dapat dilalui motor, mobil keluarga, hingga minibus wisata.
              </p>
            </div>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[52px] px-6 py-3 rounded-full bg-[#1b4d3e] hover:bg-[#003629] text-white text-base font-bold inline-flex items-center justify-center gap-2.5 transition-colors"
          >
            <Navigation className="w-5 h-5 shrink-0" />
            <span>Buka Rute di Google Maps</span>
            <ExternalLink className="w-4 h-4 shrink-0 opacity-85" />
          </a>
        </div>
      </div>
    </div>
  );
}
