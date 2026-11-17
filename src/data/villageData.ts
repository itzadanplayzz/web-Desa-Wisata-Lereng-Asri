export type DestinationCategory = 'semua' | 'alam' | 'agro' | 'budaya';

export interface Destination {
  id: string;
  name: string;
  category: Exclude<DestinationCategory, 'semua'>;
  categoryLabel: string;
  distanceFromBase: string;
  duration: string;
  difficulty: string;
  ticketPrice: number;
  shortDesc: string;
  fullDesc: string;
  bestTime: string;
  facilities: string[];
  tips: string;
  image: string;
  imageAlt: string;
}

export interface TourPackage {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  minPeople: number;
  pricePerPerson: number;
  unitLabel: string;
  featured?: boolean;
  includes: string[];
  scheduleSummary: string;
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  spot: string;
  image: string;
  imageAlt: string;
  spanDesktop?: 'wide' | 'tall' | 'standard';
}

export interface MapPin {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  elevation: string;
  walkTime: string;
  summary: string;
}

export const WHATSAPP_NUMBER = '6281234567890';
export const VILLAGE_NAME = 'Desa Wisata Lereng Asri';
export const VILLAGE_ADDRESS = 'Jl. Raya Lereng Asri No. 18, Kec. Argomulyo, Kab. Karanganyar, Jawa Tengah';
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=-7.6615,111.1328';

export const HERO_IMAGE = '/src/assets/images/hero_lereng_asri_1794887902732.jpg';

export const DESTINATIONS: Destination[] = [
  {
    id: 'curug-embun',
    name: 'Curug Embun Pagi',
    category: 'alam',
    categoryLabel: 'Wisata Alam',
    distanceFromBase: '1,2 km dari Pendopo',
    duration: '1,5 – 2 jam pulang pergi',
    difficulty: 'Jalur batu landai',
    ticketPrice: 15000,
    shortDesc:
      'Air terjun alami setinggi 28 meter di balik rimbun pakis hutan dengan kolam jernih berwarna hijau toska yang menyegarkan.',
    fullDesc:
      'Curug Embun Pagi adalah permata tersembunyi di sisi barat desa. Sepanjang jalan setapak berbatu yang teduh, pengunjung disambut suara gemericik sungai jernih dan udara pegunungan yang sejuk. Cocok untuk berfoto, merendam kaki, dan bersantai bersama keluarga.',
    bestTime: '07.00 – 10.30 WIB saat sinar matahari menembus kabut pagi',
    facilities: ['Jalur setapak aman berpagar bambu', 'Gazebo istirahat', 'Kamar bilas bersih', 'Pemandu lokal siap antar'],
    tips: 'Gunakan alas kaki antiselip karena bebatuan sekitar kolam cukup lembap.',
    image: '/src/assets/images/destinasi_curug_embun_1794887903251.jpg',
    imageAlt: 'Air terjun Curug Embun Pagi yang jernih dikelilingi pakis hijau di Desa Wisata Lereng Asri',
  },
  {
    id: 'kebun-kopi-lereng',
    name: 'Kebun Kopi Organik Terasering',
    category: 'agro',
    categoryLabel: 'Edukasi Tani',
    distanceFromBase: '650 m dari Pendopo',
    duration: '1 – 1,5 jam aktivitas',
    difficulty: 'Ramah anak & lansia',
    ticketPrice: 25000,
    shortDesc:
      'Belajar memetik ceri kopi Arabika merah matang langsung bersama petani desa, dilanjutkan seduh kopi tubruk hangat di saung kebun.',
    fullDesc:
      'Berada di ketinggian 1.150 mdpl, kebun kopi milik warga Lereng Asri ditanam dengan sistem tumpang sari organik tanpa pestisida kimia. Wisatawan dapat ikut memanen buah kopi musim panen, melihat proses penjemuran alami, hingga mencicipi seduhan kopi segar.',
    bestTime: '08.00 – 11.00 WIB atau sore pukul 15.00 WIB',
    facilities: ['Keranjang panen bambu', 'Saung cicip kopi hangat', 'Penjelasan petani pendamping', 'Oleh-oleh kopi sangrai'],
    tips: 'Tersedia pula wedang jahe gula aren dan teh daun kopi bagi pengunjung yang tidak minum kopi.',
    image: '/src/assets/images/destinasi_kebun_kopi_1794887903845.jpg',
    imageAlt: 'Petani ramah memetik ceri kopi merah di kebun kopi terasering Desa Lereng Asri',
  },
  {
    id: 'bukit-sunrise-asri',
    name: 'Bukit Pandang Mentari',
    category: 'alam',
    categoryLabel: 'Panorama Puncak',
    distanceFromBase: '1,8 km dari Pendopo',
    duration: '45 menit jalan santai',
    difficulty: 'Tanjakan ringan',
    ticketPrice: 15000,
    shortDesc:
      'Anjungan kayu alami di punggungan bukit dengan hamparan samudra awan pagi dan siluet puncak gunung yang menenangkan.',
    fullDesc:
      'Dari gardu pandang kayu jati Bukit Pandang Mentari, wisatawan dapat menyaksikan matahari terbit perlahan di balik lautan kabut lembah. Tersedia bangku santai untuk menikmati sarapan ringan dan teh hangat sambil menghirup udara bersih pegunungan.',
    bestTime: '05.00 – 07.00 WIB untuk melihat lautan awan matahari terbit',
    facilities: ['Anjungan kayu kokoh', 'Warung teh & gorengan hangat', 'Toilet umum', 'Ojek desa bagi yang tidak ingin mendaki'],
    tips: 'Bawa jaket hangat karena suhu subuh berkisar 16°C hingga 18°C.',
    image: '/src/assets/images/destinasi_bukit_sunrise_1794887904118.jpg',
    imageAlt: 'Pemandangan matahari terbit dan lautan awan dari anjungan kayu Bukit Pandang Mentari',
  },
  {
    id: 'sanggar-anyaman-bambu',
    name: 'Sanggar Anyaman & Homestay Bambu',
    category: 'budaya',
    categoryLabel: 'Budaya & Kerajinan',
    distanceFromBase: '200 m dari Pendopo',
    duration: '1 – 2 jam lokakarya',
    difficulty: 'Akses datar & mudah',
    ticketPrice: 30000,
    shortDesc:
      'Belajar menganyam besek dan keranjang bambu bersama perajin desa yang ramah, sekaligus mengenal arsitektur rumah bambu tradisional.',
    fullDesc:
      'Di Sanggar Anyaman Bambu, para ibu dan sesepuh desa mewariskan teknik mengolah bilah bambu apus menjadi wadah ramah lingkungan. Hasil anyaman kecil buatan tangan sendiri boleh langsung dibawa pulang sebagai kenang-kenangan dari Lereng Asri.',
    bestTime: '09.00 – 16.00 WIB setiap hari',
    facilities: ['Bahan bambu siap anyam', 'Pendampingan perajin ramah', 'Minuman tradisional selamat datang', 'Area teduh ramah kursi roda'],
    tips: 'Sangat digemari anak sekolah, keluarga, dan rombongan wisata edukasi.',
    image: '/src/assets/images/galeri_anyaman_bambu_1794887905217.jpg',
    imageAlt: 'Perajin desa sedang menganyam keranjang bambu tradisional di pendopo terbuka',
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'paket-seharian-asri',
    name: 'Jelajah Seharian Lereng Asri',
    tagline: 'Paling diminati untuk liburan keluarga & akhir pekan',
    duration: '1 Hari (07.30 – 16.00 WIB)',
    minPeople: 2,
    pricePerPerson: 165000,
    unitLabel: 'per orang',
    featured: true,
    includes: [
      'Tiket masuk seluruh 4 destinasi desa',
      'Trekking santai Curug Embun Pagi & Kebun Kopi',
      '1x makan siang prasmanan masakan rumahan desa',
      'Seduh kopi lereng atau wedang jahe hangat + jajanan pasar',
      'Pemandu lokal ramah selama kegiatan',
    ],
    scheduleSummary: 'Sambutan di Pendopo · Panen & seduh kopi · Trekking curug · Makan siang liwetan · Menganyam bambu',
    image: '/src/assets/images/destinasi_curug_embun_1794887903251.jpg',
    imageAlt: 'Wisatawan menikmati kesegaran Curug Embun Pagi dalam paket jelajah seharian',
  },
  {
    id: 'paket-menginap-homestay',
    name: 'Menginap Nyaman di Homestay Desa',
    tagline: 'Rasakan pagi berkabut dan kehangatan warga desa',
    duration: '2 Hari 1 Malam',
    minPeople: 2,
    pricePerPerson: 385000,
    unitLabel: 'per orang',
    includes: [
      'Menginap 1 malam di homestay kayu & bambu (kamar bersih + air hangat)',
      '3x makan tradisional (siang, malam hangat, dan sarapan pagi)',
      'Trip subuh ke Bukit Pandang Mentari & teh hangat',
      'Tur Kebun Kopi Organik & lokakarya anyaman bambu',
      'Dokumentasi foto kegiatan & pemandu warga',
    ],
    scheduleSummary: 'Hari 1: Sambutan teh, kebun kopi, makan malam hangat · Hari 2: Sunrise bukit, sarapan desa, curug & pulang',
    image: '/src/assets/images/paket_homestay_desa_1794887903583.jpg',
    imageAlt: 'Homestay bambu dan kayu yang asri dengan beranda santai menghadap perbukitan hijau',
  },
  {
    id: 'paket-edukasi-rombongan',
    name: 'Paket Edukasi Tani & Budaya Rombongan',
    tagline: 'Cocok untuk sekolah, komunitas, atau kantor',
    duration: 'Setengah Hari (08.00 – 13.00 WIB)',
    minPeople: 10,
    pricePerPerson: 120000,
    unitLabel: 'per peserta (min. 10 orang)',
    includes: [
      'Pendopo pertemuan kapasitas hingga 60 orang',
      'Praktik tanam/petik kopi organik & kompos desa',
      'Lokakarya menganyam bambu (hasil dibawa pulang)',
      '1x snack tradisional + 1x makan siang nasi box daun jati',
      'Parkir bus wisata & pendampingan koordinator desa',
    ],
    scheduleSummary: 'Penyambutan rombongan · Sesi tani organik · Belajar anyam bambu · Santap siang bersama',
    image: '/src/assets/images/destinasi_kebun_kopi_1794887903845.jpg',
    imageAlt: 'Suasana kebun kopi terasering untuk wisata edukasi tani dan budaya',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Mentari Pagi di Pendopo Lereng',
    caption: 'Suasana pagi penuh kehangatan di Pendopo Utama sambil menikmati pemandangan terasering hijau.',
    spot: 'Pendopo Utama Desa',
    image: '/src/assets/images/hero_lereng_asri_1794887902732.jpg',
    imageAlt: 'Panorama matahari terbit menyinari pendopo kayu dan terasering hijau Desa Lereng Asri',
    spanDesktop: 'wide',
  },
  {
    id: 'gal-2',
    title: 'Kesegaran Curug Embun',
    caption: 'Kolam alami jernih di tengah hutan pakis yang selalu sejuk sepanjang tahun.',
    spot: 'Curug Embun Pagi',
    image: '/src/assets/images/destinasi_curug_embun_1794887903251.jpg',
    imageAlt: 'Air terjun Curug Embun dengan kolam berwarna hijau toska jernih',
    spanDesktop: 'standard',
  },
  {
    id: 'gal-3',
    title: 'Panen Ceri Kopi Merah',
    caption: 'Warga desa dengan senang hati mengajak tamu memilih buah kopi terbaik siap olah.',
    spot: 'Kebun Kopi Organik',
    image: '/src/assets/images/destinasi_kebun_kopi_1794887903845.jpg',
    imageAlt: 'Petani desa tersenyum ramah memetik biji kopi Arabika merah matang',
    spanDesktop: 'standard',
  },
  {
    id: 'gal-4',
    title: 'Samudra Awan Bukit Pandang',
    caption: 'Momen tenang menyaksikan gumpalan awan lembut sebelum memulai aktivitas hari.',
    spot: 'Bukit Pandang Mentari',
    image: '/src/assets/images/destinasi_bukit_sunrise_1794887904118.jpg',
    imageAlt: 'Hamparan lautan awan pagi dilihat dari anjungan kayu Bukit Pandang Mentari',
    spanDesktop: 'standard',
  },
  {
    id: 'gal-5',
    title: 'Beranda Homestay Bambu',
    caption: 'Menyeruput kopi hangat di teras kayu yang menghadap langsung ke lembah hijau.',
    spot: 'Area Homestay Warga',
    image: '/src/assets/images/paket_homestay_desa_1794887903583.jpg',
    imageAlt: 'Teras homestay tradisional dari kayu dan bambu dengan dua cangkir kopi hangat',
    spanDesktop: 'standard',
  },
  {
    id: 'gal-6',
    title: 'Warisan Anyaman Bambu',
    caption: 'Ketelatenan tangan perajin desa merangkai bilah bambu menjadi karya yang bernilai.',
    spot: 'Sanggar Anyaman',
    image: '/src/assets/images/galeri_anyaman_bambu_1794887905217.jpg',
    imageAlt: 'Tangan terampil perajin desa merangkai anyaman keranjang bambu',
    spanDesktop: 'wide',
  },
];

export const MAP_PINS: MapPin[] = [
  {
    id: 'pin-pendopo',
    label: 'Pendopo & Parkir Utama',
    category: 'Titik Kumpul',
    x: 48,
    y: 56,
    elevation: '1.080 mdpl',
    walkTime: 'Titik awal wisata',
    summary: 'Pusat informasi wisatawan, area parkir mobil/bus luas, toilet bersih, dan tempat pendaftaran paket.',
  },
  {
    id: 'pin-bukit',
    label: 'Bukit Pandang Mentari',
    category: 'Panorama Puncak',
    x: 78,
    y: 22,
    elevation: '1.310 mdpl',
    walkTime: '45 menit jalan / 10 menit ojek',
    summary: 'Spot terbaik menyaksikan matahari terbit di atas samudra awan serta pegunungan sekitar.',
  },
  {
    id: 'pin-kopi',
    label: 'Kebun Kopi Terasering',
    category: 'Agro Wisata',
    x: 34,
    y: 38,
    elevation: '1.150 mdpl',
    walkTime: '12 menit jalan kaki',
    summary: 'Lahan kopi Arabika organik tempat wisatawan belajar petik ceri merah dan seduh kopi.',
  },
  {
    id: 'pin-curug',
    label: 'Curug Embun Pagi',
    category: 'Wisata Alam',
    x: 18,
    y: 66,
    elevation: '990 mdpl',
    walkTime: '25 menit jalan santai',
    summary: 'Air terjun asri di lembah barat dengan jalur batu teduh dan kolam alami yang sejuk.',
  },
  {
    id: 'pin-sanggar',
    label: 'Sanggar Bambu & Homestay',
    category: 'Penginapan & Budaya',
    x: 68,
    y: 68,
    elevation: '1.095 mdpl',
    walkTime: '5 menit jalan kaki',
    summary: 'Deretan rumah homestay warga berarsitektur bambu dan pendopo kelas menganyam tradisional.',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
