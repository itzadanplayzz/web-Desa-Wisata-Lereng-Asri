import {useMemo, useState} from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  Package,
  Phone,
} from 'lucide-react';
import {DestinationDetailModal} from './components/DestinationDetailModal';
import {GallerySection} from './components/GallerySection';
import {InteractiveVillageMap} from './components/InteractiveVillageMap';
import {VillageImage} from './components/VillageImage';
import {WhatsAppBookingModal} from './components/WhatsAppBookingModal';
import {
  DESTINATIONS,
  Destination,
  DestinationCategory,
  HERO_IMAGE,
  TOUR_PACKAGES,
  TourPackage,
  VILLAGE_ADDRESS,
  VILLAGE_NAME,
  formatRupiah,
} from './data/villageData';

const CATEGORY_FILTERS: {id: DestinationCategory; label: string}[] = [
  {id: 'semua', label: 'Semua Destinasi'},
  {id: 'alam', label: 'Wisata Alam'},
  {id: 'agro', label: 'Edukasi Tani'},
  {id: 'budaya', label: 'Budaya & Desa'},
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('semua');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [bookingTopic, setBookingTopic] = useState<string>('');

  const filteredDestinations = useMemo(() => {
    if (selectedCategory === 'semua') return DESTINATIONS;
    return DESTINATIONS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const openPackageBooking = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setBookingTopic('');
    setBookingModalOpen(true);
  };

  const openGeneralBooking = (topic = '') => {
    setSelectedPackage(null);
    setBookingTopic(topic);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f0] text-[#1c1c17] pb-20 md:pb-0">
      {/* Top Bar Contract: Single row, 3 zones separated by gap-8 */}
      <header className="border-b border-[#1b4d3e]/12 bg-[#fcf9f0]/95 md:sticky md:top-0 z-30 md:backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#beranda"
            className="text-xl font-extrabold tracking-tight text-[#1b4d3e] whitespace-nowrap shrink-0"
          >
            Lereng Asri
          </a>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-semibold text-[#404945]"
          >
            <a
              href="#beranda"
              className="hover:text-[#1b4d3e] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Beranda
            </a>
            <a
              href="#destinasi"
              className="hover:text-[#1b4d3e] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Destinasi
            </a>
            <a
              href="#paket"
              className="hover:text-[#1b4d3e] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Paket Wisata
            </a>
            <a
              href="#galeri"
              className="hover:text-[#1b4d3e] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Galeri
            </a>
            <a
              href="#lokasi"
              className="hover:text-[#1b4d3e] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Peta Lokasi
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openGeneralBooking()}
              className="min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full bg-[#0f7a3e] hover:bg-[#0b6332] text-white text-sm font-bold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Pesan WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section (Beranda dengan Foto Utama) */}
        <section id="beranda" className="pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="relative rounded-3xl overflow-hidden bg-[#1b4d3e] min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-end">
              <VillageImage
                src={HERO_IMAGE}
                alt="Panorama pagi Desa Wisata Lereng Asri dengan terasering hijau, kabut lembut, dan pendopo kayu"
                fallbackTitle="Desa Wisata Lereng Asri"
                priority
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002117]/90 via-[#002117]/45 to-[#002117]/15" />

              <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 max-w-3xl text-white">
                <p className="text-sm sm:text-base font-semibold text-[#baeed9] mb-2">
                  Ketinggian 1.080 mdpl · Argomulyo, Karanganyar
                </p>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-balance">
                  Sejuknya Alam Pegunungan dan Ramahnya Warga Desa
                </h1>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/95 max-w-2xl">
                  Nikmati udara pagi yang bersih, jelajahi air terjun jernih, petik kopi organik
                  bersama petani, dan menginap nyaman di homestay bambu Desa Wisata Lereng Asri.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href="#paket"
                    className="min-h-[54px] px-7 py-3.5 rounded-full bg-[#ffffff] hover:bg-[#f6f3ea] text-[#1b4d3e] text-base font-extrabold inline-flex items-center justify-center gap-2.5 transition-colors shadow-sm whitespace-nowrap"
                  >
                    <span>Lihat Paket &amp; Harga</span>
                    <ArrowRight className="w-5 h-5 shrink-0" />
                  </a>
                  <button
                    type="button"
                    onClick={() => openGeneralBooking()}
                    className="min-h-[54px] px-7 py-3.5 rounded-full bg-[#0f7a3e] hover:bg-[#0b6332] text-white text-base font-bold inline-flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span>Tanya via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quick Village Guide Strip */}
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1b4d3e]/12 rounded-2xl overflow-hidden border border-[#1b4d3e]/12">
              <div className="bg-white p-4 sm:p-5">
                <p className="text-xs sm:text-sm font-medium text-[#404945]">Jam Kunjungan</p>
                <p className="text-base sm:text-lg font-bold text-[#1c1c17] mt-1 tabular-nums">
                  05.00 – 17.30 WIB
                </p>
              </div>
              <div className="bg-white p-4 sm:p-5">
                <p className="text-xs sm:text-sm font-medium text-[#404945]">Suhu Rata-Rata</p>
                <p className="text-base sm:text-lg font-bold text-[#1c1c17] mt-1 tabular-nums">
                  17°C – 24°C Sejuk
                </p>
              </div>
              <div className="bg-white p-4 sm:p-5">
                <p className="text-xs sm:text-sm font-medium text-[#404945]">Tiket Destinasi</p>
                <p className="text-base sm:text-lg font-bold text-[#954a17] mt-1 tabular-nums">
                  Mulai Rp 15.000
                </p>
              </div>
              <div className="bg-white p-4 sm:p-5">
                <p className="text-xs sm:text-sm font-medium text-[#404945]">Jarak dari Kota</p>
                <p className="text-base sm:text-lg font-bold text-[#1c1c17] mt-1 tabular-nums">
                  ±45 Menit Berkendara
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Daftar Destinasi Section */}
        <section id="destinasi" className="py-12 sm:py-16 border-t border-[#1b4d3e]/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <p className="text-sm font-bold text-[#954a17]">Jelajah Tempat Menarik</p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1c17] tracking-tight mt-1 text-balance">
                  Daftar Destinasi di Lereng Asri
                </h2>
                <p className="text-base sm:text-lg text-[#404945] mt-2 leading-relaxed">
                  Semua lokasi terhubung dengan jalur jalan kaki yang teduh, aman untuk anak-anak
                  hingga orang tua.
                </p>
              </div>

              {/* Interactive Filter Segmented Buttons */}
              <div
                role="tablist"
                aria-label="Filter kategori destinasi"
                className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0"
              >
                {CATEGORY_FILTERS.map((tab) => {
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#1b4d3e] text-white'
                          : 'bg-[#f1eee5] text-[#404945] hover:bg-[#e5e2da] hover:text-[#1c1c17]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Destination Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDestinations.map((dest) => (
                <article
                  key={dest.id}
                  className="bg-white rounded-2xl border border-[#1b4d3e]/12 overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-[0_12px_30px_-10px_rgba(27,77,62,0.12)]"
                >
                  <div>
                    <div className="aspect-[16/10] bg-[#ebe8df] overflow-hidden">
                      <VillageImage
                        src={dest.image}
                        alt={dest.imageAlt}
                        fallbackTitle={dest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      {/* Zero-Pill Metadata Discipline: Clean unboxed inline text */}
                      <p className="text-sm font-semibold text-[#404945]">
                        <span className="text-[#1b4d3e]">{dest.categoryLabel}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{dest.distanceFromBase}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="text-[#954a17] tabular-nums">
                          Tiket {formatRupiah(dest.ticketPrice)}
                        </span>
                      </p>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#1c1c17] mt-2">
                        {dest.name}
                      </h3>
                      <p className="text-base text-[#404945] leading-relaxed mt-2">
                        {dest.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-sm text-[#404945]">
                      {dest.duration} · {dest.difficulty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveDestination(dest)}
                      className="min-h-[48px] px-5 py-2.5 rounded-full border border-[#1b4d3e]/25 bg-[#fcf9f0] hover:bg-[#1b4d3e] hover:text-white text-[#1b4d3e] text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Lihat Detail &amp; Tips</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Paket Wisata dan Harga Section */}
        <section id="paket" className="py-12 sm:py-16 bg-[#f6f3ea] border-y border-[#1b4d3e]/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="text-sm font-bold text-[#954a17]">Harga Jelas &amp; Terjangkau</p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1c17] tracking-tight mt-1 text-balance">
                Pilihan Paket Wisata Lereng Asri
              </h2>
              <p className="text-base sm:text-lg text-[#404945] mt-2 leading-relaxed">
                Sudah termasuk tiket masuk, pemandu warga lokal, dan sajian khas desa tanpa biaya
                tersembunyi.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {TOUR_PACKAGES.map((pkg) => (
                <article
                  key={pkg.id}
                  className={`rounded-2xl overflow-hidden flex flex-col justify-between bg-white ${
                    pkg.featured
                      ? 'border-2 border-[#1b4d3e] shadow-[0_14px_34px_-12px_rgba(27,77,62,0.18)]'
                      : 'border border-[#1b4d3e]/12'
                  }`}
                >
                  <div>
                    <div className="aspect-[16/10] bg-[#ebe8df] overflow-hidden">
                      <VillageImage
                        src={pkg.image}
                        alt={pkg.imageAlt}
                        fallbackTitle={pkg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <p className="text-sm font-semibold text-[#1b4d3e]">
                        {pkg.duration}
                        {pkg.featured ? ' · Pilihan Terfavorit' : ''}
                      </p>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1c1c17] mt-1.5">
                        {pkg.name}
                      </h3>
                      <p className="text-sm sm:text-base text-[#404945] mt-1.5">{pkg.tagline}</p>

                      <div className="mt-5 pb-5 border-b border-[#1b4d3e]/10 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-[#954a17] tabular-nums">
                          {formatRupiah(pkg.pricePerPerson)}
                        </span>
                        <span className="text-sm font-medium text-[#404945]">/ {pkg.unitLabel}</span>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm font-bold text-[#1c1c17] mb-3">
                          Fasilitas yang Termasuk:
                        </p>
                        <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#404945]">
                          {pkg.includes.map((inc) => (
                            <li key={inc} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-5 h-5 text-[#1b4d3e] mt-0.5 shrink-0" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-2">
                    <button
                      type="button"
                      onClick={() => openPackageBooking(pkg)}
                      className="w-full min-h-[54px] px-6 py-3.5 rounded-full bg-[#0f7a3e] hover:bg-[#0b6332] text-white text-base font-bold inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 shrink-0" />
                      <span>Pesan Paket via WhatsApp</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Galeri Desa Section */}
        <section id="galeri" className="py-12 sm:py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div className="max-w-2xl">
                <p className="text-sm font-bold text-[#954a17]">Potret Suasana Desa</p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1c17] tracking-tight mt-1 text-balance">
                  Galeri Alam &amp; Aktivitas Warga
                </h2>
                <p className="text-base sm:text-lg text-[#404945] mt-2 leading-relaxed">
                  Geser atau ketuk foto untuk melihat suasana asli Desa Wisata Lereng Asri lebih
                  dekat.
                </p>
              </div>
            </div>

            <GallerySection />
          </div>
        </section>

        {/* Peta Lokasi Section */}
        <section id="lokasi" className="py-12 sm:py-16 bg-[#f6f3ea] border-t border-[#1b4d3e]/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-2xl mb-8">
              <p className="text-sm font-bold text-[#954a17]">Panduan Arah &amp; Jalur</p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1c17] tracking-tight mt-1 text-balance">
                Peta Lokasi Desa Wisata Lereng Asri
              </h2>
              <p className="text-base sm:text-lg text-[#404945] mt-2 leading-relaxed">
                Temukan rute perjalanan dari kota serta titik-titik wisata utama di sekitar Pendopo
                Desa.
              </p>
            </div>

            <InteractiveVillageMap />
          </div>
        </section>

        {/* Warm Community Invitation CTA */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="rounded-3xl bg-[#1b4d3e] text-white p-7 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
                  Siap Berlibur Tenang Bersama Keluarga atau Rombongan?
                </h2>
                <p className="text-base sm:text-lg text-white/90 mt-3 leading-relaxed">
                  Tim pengelola warga kami siap membantu mengatur jadwal kunjungan, kebutuhan
                  makan, hingga kamar homestay sesuai keinginan Anda.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openGeneralBooking()}
                  className="min-h-[56px] px-8 py-4 rounded-full bg-[#25d366] hover:bg-[#1fb858] text-[#052e16] text-base sm:text-lg font-extrabold inline-flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-6 h-6 shrink-0" />
                  <span>Chat WhatsApp Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#f1eee5] border-t border-[#1b4d3e]/12 py-10 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xl font-extrabold text-[#1b4d3e]">{VILLAGE_NAME}</p>
            <p className="text-sm sm:text-base text-[#404945] mt-2 leading-relaxed">
              Wisata alam lestari, edukasi kopi organik, dan keramahan homestay warga di lereng
              pegunungan.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-[#1c1c17]">Alamat &amp; Kontak</p>
            <p className="text-sm text-[#404945] mt-2 leading-relaxed">{VILLAGE_ADDRESS}</p>
            <p className="text-sm font-semibold text-[#1b4d3e] mt-2 inline-flex items-center gap-1.5 tabular-nums">
              <Phone className="w-4 h-4 shrink-0" />
              <span>+62 812-3456-7890 (Admin Desa)</span>
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-[#1c1c17]">Menu Cepat</p>
            <ul className="mt-2 space-y-2 text-sm font-medium text-[#404945]">
              <li>
                <a href="#destinasi" className="hover:text-[#1b4d3e] hover:underline">
                  Daftar Destinasi
                </a>
              </li>
              <li>
                <a href="#paket" className="hover:text-[#1b4d3e] hover:underline">
                  Paket Wisata &amp; Harga
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-[#1b4d3e] hover:underline">
                  Galeri Foto Desa
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-[#1b4d3e] hover:underline">
                  Peta &amp; Rute Lokasi
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 mt-8 pt-6 border-t border-[#1b4d3e]/10 text-xs sm:text-sm text-[#404945]">
          © 2026 Pokdarwis Desa Wisata Lereng Asri. Dikelola bersama masyarakat setempat.
        </div>
      </footer>

      {/* Mobile-First Thumb-Zone Bottom Bar (<= 64px height, stays strictly under 15% sticky cap) */}
      <nav
        aria-label="Navigasi cepat mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-t border-[#1b4d3e]/15 px-2 flex items-center justify-between gap-1 shadow-[0_-4px_20px_rgba(27,77,62,0.08)]"
      >
        <a
          href="#destinasi"
          className="flex-1 min-h-[48px] flex flex-col items-center justify-center text-[#404945] hover:text-[#1b4d3e] rounded-xl"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[11px] font-semibold mt-0.5">Destinasi</span>
        </a>
        <a
          href="#paket"
          className="flex-1 min-h-[48px] flex flex-col items-center justify-center text-[#404945] hover:text-[#1b4d3e] rounded-xl"
        >
          <Package className="w-5 h-5" />
          <span className="text-[11px] font-semibold mt-0.5">Paket</span>
        </a>
        <a
          href="#galeri"
          className="flex-1 min-h-[48px] flex flex-col items-center justify-center text-[#404945] hover:text-[#1b4d3e] rounded-xl"
        >
          <ImageIcon className="w-5 h-5" />
          <span className="text-[11px] font-semibold mt-0.5">Galeri</span>
        </a>
        <a
          href="#lokasi"
          className="flex-1 min-h-[48px] flex flex-col items-center justify-center text-[#404945] hover:text-[#1b4d3e] rounded-xl"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[11px] font-semibold mt-0.5">Peta</span>
        </a>
        <button
          type="button"
          onClick={() => openGeneralBooking()}
          className="min-h-[44px] px-3.5 py-2 rounded-full bg-[#0f7a3e] hover:bg-[#0b6332] text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>WhatsApp</span>
        </button>
      </nav>

      {/* Modals */}
      <DestinationDetailModal
        destination={activeDestination}
        onClose={() => setActiveDestination(null)}
        onBookDestination={(topic) => openGeneralBooking(topic)}
      />

      <WhatsAppBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={selectedPackage}
        initialTopic={bookingTopic}
      />
    </div>
  );
}
