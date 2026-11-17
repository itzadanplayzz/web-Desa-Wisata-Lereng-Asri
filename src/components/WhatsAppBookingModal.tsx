import {useEffect, useMemo, useState} from 'react';
import {Check, Copy, MessageCircle, Minus, Plus, X} from 'lucide-react';
import {
  TOUR_PACKAGES,
  TourPackage,
  buildWhatsAppUrl,
  formatRupiah,
} from '../data/villageData';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: TourPackage | null;
  initialTopic?: string;
}

export function WhatsAppBookingModal({
  isOpen,
  onClose,
  initialPackage,
  initialTopic,
}: WhatsAppBookingModalProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackage?.id ?? TOUR_PACKAGES[0].id,
  );
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [guestCount, setGuestCount] = useState<number>(initialPackage?.minPeople ?? 2);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialPackage) {
        setSelectedPackageId(initialPackage.id);
        setGuestCount(initialPackage.minPeople);
      } else if (initialTopic) {
        setSelectedPackageId('konsultasi');
        setNotes(initialTopic);
      } else {
        setSelectedPackageId(TOUR_PACKAGES[0].id);
        setGuestCount(TOUR_PACKAGES[0].minPeople);
      }
      setNameError('');
      setCopied(false);
    }
  }, [isOpen, initialPackage, initialTopic]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const activePkg = useMemo(
    () => TOUR_PACKAGES.find((p) => p.id === selectedPackageId) ?? null,
    [selectedPackageId],
  );

  const estimatedTotal = activePkg ? activePkg.pricePerPerson * guestCount : 0;

  const formattedMessage = useMemo(() => {
    const nama = visitorName.trim() || 'Calon Wisatawan';
    const tanggal = visitDate
      ? new Date(visitDate + 'T00:00:00').toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'Belum ditentukan (mohon saran jadwal terbaik)';

    if (!activePkg) {
      return `Halo Pengelola Desa Wisata Lereng Asri,\n\nSaya *${nama}* ingin bertanya mengenai kunjungan wisata.\nRencana tanggal: ${tanggal}\nJumlah rombongan: ${guestCount} orang\n${notes ? `Catatan: ${notes}\n` : ''}\nTerima kasih.`;
    }

    return `Halo Pengelola Desa Wisata Lereng Asri,\n\nSaya *${nama}* ingin memesan paket wisata:\n• Paket: ${activePkg.name}\n• Rencana tanggal: ${tanggal}\n• Jumlah peserta: ${guestCount} orang\n• Estimasi biaya: ${formatRupiah(estimatedTotal)}\n${notes.trim() ? `• Catatan tambahan: ${notes.trim()}\n` : ''}\nMohon informasi ketersediaannya ya. Terima kasih!`;
  }, [visitorName, visitDate, guestCount, activePkg, estimatedTotal, notes]);

  const waUrl = buildWhatsAppUrl(formattedMessage);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleOpenWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!visitorName.trim()) {
      e.preventDefault();
      setNameError('Mohon isi nama Anda terlebih dahulu agar pengelola mudah menyapa.');
      return;
    }
    setNameError('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#1c1c17]/60 backdrop-blur-xs p-0 md:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-xl bg-[#fcf9f0] rounded-t-3xl md:rounded-2xl shadow-2xl border border-[#1b4d3e]/15 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab handle */}
        <div className="md:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-[#1b4d3e]/20" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 md:px-6 md:py-5 border-b border-[#1b4d3e]/10 bg-white">
          <div>
            <h2 id="wa-modal-title" className="text-xl font-bold text-[#1c1c17]">
              Pesan Wisata via WhatsApp
            </h2>
            <p className="text-sm text-[#404945] mt-1">
              Isi detail singkat kunjungan Anda, lalu kirim langsung ke admin desa yang ramah.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela pemesanan"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-[#404945] hover:bg-[#f1eee5] hover:text-[#1c1c17] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-5">
          {/* Package Selection */}
          <div>
            <label htmlFor="pkg-select" className="block text-sm font-semibold text-[#1c1c17] mb-2">
              Pilih Paket atau Tanya Langsung
            </label>
            <select
              id="pkg-select"
              value={selectedPackageId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedPackageId(val);
                const found = TOUR_PACKAGES.find((p) => p.id === val);
                if (found && guestCount < found.minPeople) {
                  setGuestCount(found.minPeople);
                }
              }}
              className="w-full min-h-[48px] px-4 rounded-xl bg-white border border-[#c0c9c3] text-base text-[#1c1c17] font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-[#1b4d3e]"
            >
              {TOUR_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} — {formatRupiah(pkg.pricePerPerson)} / orang
                </option>
              ))}
              <option value="konsultasi">Tanya Ketersediaan / Kunjungan Custom</option>
            </select>
          </div>

          {/* Visitor Name */}
          <div>
            <label htmlFor="visitor-name" className="block text-sm font-semibold text-[#1c1c17] mb-2">
              Nama Anda <span className="text-[#954a17]">*</span>
            </label>
            <input
              id="visitor-name"
              type="text"
              value={visitorName}
              onChange={(e) => {
                setVisitorName(e.target.value);
                if (nameError) setNameError('');
              }}
              placeholder="Contoh: Ibu Sari / Bapak Budi"
              className="w-full min-h-[48px] px-4 rounded-xl bg-white border border-[#c0c9c3] text-base text-[#1c1c17] placeholder:text-[#707974] focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-[#1b4d3e]"
            />
            {nameError && (
              <p className="mt-1.5 text-sm font-medium text-[#ba1a1a]" role="alert">
                {nameError}
              </p>
            )}
          </div>

          {/* Date and Guest Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="visit-date" className="block text-sm font-semibold text-[#1c1c17] mb-2">
                Rencana Tanggal Kunjungan
              </label>
              <input
                id="visit-date"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full min-h-[48px] px-4 rounded-xl bg-white border border-[#c0c9c3] text-base text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-[#1b4d3e]"
              />
            </div>

            <div>
              <span className="block text-sm font-semibold text-[#1c1c17] mb-2">
                Jumlah Peserta
              </span>
              <div className="flex items-center justify-between min-h-[48px] px-2 rounded-xl bg-white border border-[#c0c9c3]">
                <button
                  type="button"
                  onClick={() =>
                    setGuestCount((c) => Math.max(activePkg ? activePkg.minPeople : 1, c - 1))
                  }
                  aria-label="Kurangi jumlah peserta"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#1b4d3e] hover:bg-[#f1eee5] transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-base font-bold tabular-nums text-[#1c1c17]">
                  {guestCount} orang
                </span>
                <button
                  type="button"
                  onClick={() => setGuestCount((c) => Math.min(100, c + 1))}
                  aria-label="Tambah jumlah peserta"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#1b4d3e] hover:bg-[#f1eee5] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {activePkg && (
                <p className="text-xs text-[#404945] mt-1">
                  Minimal {activePkg.minPeople} peserta untuk paket ini
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="visit-notes" className="block text-sm font-semibold text-[#1c1c17] mb-2">
              Catatan atau Kebutuhan Khusus (opsional)
            </label>
            <textarea
              id="visit-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Bawa anak kecil/lansia, butuh ojek ke bukit, atau tanya menu vegetarian"
              className="w-full p-3.5 rounded-xl bg-white border border-[#c0c9c3] text-base text-[#1c1c17] placeholder:text-[#707974] focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-[#1b4d3e]"
            />
          </div>

          {/* Price Summary */}
          {activePkg && (
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#f1eee5] border border-[#1b4d3e]/12">
              <div>
                <p className="text-sm text-[#404945]">Perkiraan Total Biaya</p>
                <p className="text-xs text-[#404945]">
                  Pembayaran dapat dilakukan di Pendopo atau transfer DP
                </p>
              </div>
              <p className="text-xl font-extrabold text-[#954a17] tabular-nums shrink-0">
                {formatRupiah(estimatedTotal)}
              </p>
            </div>
          )}

          {/* Message Preview */}
          <div className="rounded-xl bg-white border border-[#c0c9c3]/80 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-[#404945]">
                Pratinjau Pesan WhatsApp
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1b4d3e] bg-[#f1eee5] hover:bg-[#e5e2da] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Salin Teks
                  </>
                )}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#404945]">
              {formattedMessage}
            </pre>
          </div>
        </div>

        {/* Sticky Modal Footer CTA */}
        <div className="p-4 md:px-6 md:py-4 bg-white border-t border-[#1b4d3e]/10 flex flex-col sm:flex-row gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenWhatsApp}
            className="flex-1 min-h-[52px] px-6 py-3 rounded-full bg-[#0f7a3e] hover:bg-[#0b6332] text-white text-base font-bold inline-flex items-center justify-center gap-2.5 transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f7a3e]"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>Kirim Pesan via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
