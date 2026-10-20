import { useState } from 'react';
import {
  Handshake,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
  X,
  Megaphone,
  Camera,
  MapPin,
  Flame,
  Music,
  Compass,
  Activity,
  Palette,
  Briefcase,
  Eye,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export interface PartnerEvent {
  id: string;
  name: string;
  officialTitle: string;
  category: 'sport' | 'trail' | 'music' | 'arts' | 'community' | 'business';
  categoryLabel: string;
  collabType: string;
  dateOrYear: string;
  location: string;
  venue: string;
  tagline: string;
  desc: string;
  highlights: string[];
  impactBadge: string;
  logoUrl?: string; // Path to official logo
  posterUrl?: string; // Path to official poster / promotional visual
  logoBg?: string; // Optional background color to match logo
  accentGradient: string;
  badgeColor: string;
}

const verifiedPartners: PartnerEvent[] = [
  // --- 1. EXISTING SPORT & RUNNING EVENTS ---
  {
    id: 'malang-run-fest',
    name: 'Malang Run Fest 2027',
    officialTitle: 'Malang Run Festival 2027',
    category: 'sport',
    categoryLabel: 'Sportainment & Fun Run',
    collabType: 'Official Media Partner & Publikasi',
    dateOrYear: '7 Februari 2027',
    location: 'Kota Malang',
    venue: 'Taman Krida Budaya Malang',
    tagline: 'Sportainment 5K Fun Run, Festival Kuliner UMKM & Panggung Musik',
    desc: 'Kolaborasi publikasi media dan aktivasi promosi event lari tematik kebanggaan kota Malang dengan lambang Singo Edan yang memadukan olahraga, bazar UMKM lokal, dan panggung musik spektakuler.',
    highlights: ['Kategori 5K Fun Run', 'Festival Kuliner & Musik', 'Karakter Singo Edan Malang'],
    impactBadge: '3.500+ Pelari & Pengunjung',
    logoUrl: '/logos/malang-run-fest-2027-logo.jpeg',
    posterUrl: '/logos/malang-run-fest-2027-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-blue-600 via-red-600 to-amber-500',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  {
    id: 'color-run-indonesia',
    name: 'Color Run Indonesia',
    officialTitle: 'The Color Run™ Indonesia',
    category: 'sport',
    categoryLabel: 'Mega Fun Run Festival',
    collabType: 'Media Partner & Digital Campaign',
    dateOrYear: 'National Event Circuit',
    location: 'Indonesia',
    venue: 'Sirkuit Lari Nasional',
    tagline: 'The Happiest 5K on the Planet',
    desc: 'Dukungan kampanye media digital dan publikasi festival lari warna legendaris internasional, menghubungkan puluhan ribu pelari dalam kegembiraan sportainment dan pesta warna.',
    highlights: ['The Happiest 5K on the Planet', 'Color Festival Celebration', 'Komunitas Pelari Nasional'],
    impactBadge: '10.000+ Peserta',
    logoUrl: '/logos/color-run-indonesia.jpg',
    logoBg: 'bg-black',
    accentGradient: 'from-stone-900 via-neutral-800 to-black',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  {
    id: 'royal-trail-run',
    name: 'Royal Trail Run 2026',
    officialTitle: 'Royal Trail Run 2026 (Kota Wisata Batu)',
    category: 'trail',
    categoryLabel: 'Mountain & Forest Trail',
    collabType: 'Official Media Partner & Race Coverage',
    dateOrYear: '20 Desember 2026',
    location: 'Kota Wisata Batu',
    venue: 'Royal Hotel & Villa Batu (Pine Park)',
    tagline: 'Menjelajahi Jalur Pine Park & Perbukitan Sejuk Kota Batu',
    desc: 'Kolaborasi media partner ajang lari lintas alam bergengsi di kawasan pegunungan sejuk Kota Wisata Batu, berkolaborasi dengan Royal Hotel & Villa Batu serta Batu Runners.',
    highlights: ['Kategori 10K Umum & Pelajar', 'Elevation Gain ±390m', 'Pine Park & Mountain View'],
    impactBadge: '10K Trail Run Podium & Finisher',
    logoUrl: '/logos/royal-trail-run-2026-logo.jpeg',
    posterUrl: '/logos/royal-trail-run-2026-poster.jpeg',
    logoBg: 'bg-[#0E0E42]',
    accentGradient: 'from-blue-900 via-indigo-900 to-slate-900',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    id: 'begawan-fun-run',
    name: 'Begawan Fun Run 2026',
    officialTitle: 'Begawan Fun Run · Summer Ground',
    category: 'sport',
    categoryLabel: 'Urban Fun Run & Community',
    collabType: 'Official Media Partner & Aktivasi Komunitas',
    dateOrYear: 'Agustus 2026',
    location: 'Kota Malang',
    venue: 'Begawan Apartment & Plaza (Tlogomas)',
    tagline: 'Lari Sehat & Festival Seru di Jantung Kota Malang',
    desc: 'Publikasi dan liputan resmi rangkaian agenda lari 5K rekreasi di kawasan Begawan Plaza Malang, dilengkapi dengan sesi Zumba, hiburan live music, games, dan bazar kuliner.',
    highlights: ['Kategori 5K Fun Run', 'Summer Ground Festival', 'Rute Strategis Tlogomas Malang'],
    impactBadge: '1.500+ Pelari Fun Run',
    logoUrl: '/logos/begawan-fun-run.jpg',
    logoBg: 'bg-white',
    accentGradient: 'from-blue-600 via-yellow-500 to-sky-700',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  {
    id: 'gunung-ronggo-trail-run',
    name: 'Gunung Ronggo Trail Run 2026',
    officialTitle: 'Gunungronggo Trail Run (GTR 2026)',
    category: 'trail',
    categoryLabel: 'Trail Running Championship',
    collabType: 'Official Media Partner & Creative Coverage',
    dateOrYear: '1 November 2026',
    location: 'Tajinan, Kab. Malang',
    venue: 'Sumber Jenon & Puncak Gunungronggo',
    tagline: 'Run Beyond The Trail',
    desc: 'Publikasi dan dokumentasi ajang lari lintas alam (trail run) spektakuler yang melintasi pesona mata air purba Sumber Jenon, persawahan desa asri, dan Puncak Gunungronggo.',
    highlights: ['Kategori 7K Explorer (EG ±224m)', 'Kategori 17K Challenger (EG ±526m)', 'Eksplorasi Wisata Sumber Jenon'],
    impactBadge: 'Official Race Partner',
    logoUrl: '/logos/gunung-ronggo-gtr.jpg',
    logoBg: 'bg-[#141414]',
    accentGradient: 'from-neutral-900 via-stone-800 to-neutral-950',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'live-arena',
    name: 'Live Arena Festival',
    officialTitle: 'Live Arena Festival 2026 Malang',
    category: 'music',
    categoryLabel: 'Music & Concert Festival',
    collabType: 'Official Media Partner & Live Coverage',
    dateOrYear: '16 Oktober 2026',
    location: 'Malang',
    venue: 'UMM Dome Malang',
    tagline: 'International Sound Experience Supported by JBL Indonesia',
    desc: 'Publikasi media dan peliputan langsung festival musik akbar dengan tata suara kelas dunia dari JBL, menghadirkan musisi papan atas nasional seperti Tulus, Idgitaf, Coldiac, dan Lomba Sihir.',
    highlights: ['Supported by JBL Indonesia', 'Lineup: Tulus, Idgitaf, Coldiac, Lomba Sihir', 'UMM Dome Arena'],
    impactBadge: '5.000+ Penonton Konser',
    accentGradient: 'from-cyan-600 to-blue-900',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },

  // --- 2. NEW PARTNERSHIPS: MUSIC & FESTIVALS ---
  {
    id: 'kickfest-malang',
    name: 'Kickfest XIV Malang',
    officialTitle: 'KICKFEST XIV 2022 (The Biggest Youth & Clothing Expo)',
    category: 'music',
    categoryLabel: 'Music & Clothing Expo',
    collabType: 'Official Media Partner & Expo Coverage',
    dateOrYear: '2 - 4 September 2022',
    location: 'Kota Malang',
    venue: 'Lapangan Rampal Malang',
    tagline: 'The Biggest Youth & Clothing Expo — Comeback Louder!',
    desc: 'Publikasi dan liputan media partner pameran clothing distro dan festival musik akbar legendaris terbesar di Malang Raya, menampilkan Feel Koplo, Pee Wee Gaskins, Iksan Skuter, puluhan brand clothing ternama, dan community booth.',
    highlights: ['Lap. Rampal Malang', 'Feel Koplo, Pee Wee Gaskins, Iksan Skuter', '100+ Clothing Brands & Food Festival'],
    impactBadge: '30.000+ Pengunjung Expo',
    logoUrl: '/logos/kickfest-logo.jpeg',
    posterUrl: '/logos/kickfest-xiv-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-amber-600 via-orange-600 to-red-700',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    id: 'tjorak-sorai',
    name: 'Tjorak Sorai Festival',
    officialTitle: 'Tjorak Sorai Music & Youth Celebration',
    category: 'music',
    categoryLabel: 'Music & Youth Festival',
    collabType: 'Official Media Partner & Promotion',
    dateOrYear: 'Annual Music Fest',
    location: 'Kota Malang',
    venue: 'Malang Outdoor Stage',
    tagline: 'Merayakan Warna, Kreativitas, dan Sorai Musik Generasi Muda',
    desc: 'Kolaborasi publikasi media dan peliputan panggung festival musik perayaan kaum muda dengan panggung megah, bazar interaktif, dan penampilan musisi favorit Jawa Timur.',
    highlights: ['Panggung Musik Spektakuler', 'Creative Market & F&B Bazaar', 'Presale Ticket Broadcast'],
    impactBadge: '5.000+ Penikmat Konser',
    logoUrl: '/logos/tjorak-sorai-logo.jpeg',
    posterUrl: '/logos/tjorak-sorai-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-purple-600 via-pink-600 to-rose-600',
    badgeColor: 'bg-pink-50 text-pink-800 border-pink-200',
  },
  {
    id: 'fisteria',
    name: 'Fisteria Graha Cakrawala',
    officialTitle: 'FISTERIA - Graha Cakrawala Malang',
    category: 'music',
    categoryLabel: 'Concert & Music Festival',
    collabType: 'Media Partner & Publikasi Konser',
    dateOrYear: '17 November 2023',
    location: 'Kota Malang',
    venue: 'Graha Cakrawala Universitas Negeri Malang',
    tagline: 'Panggung Konser Megah Terbuka untuk Umum di Graha Cakrawala',
    desc: 'Kerja sama promosi media dan aktivasi tiket konser akbar di Graha Cakrawala UM, menghadirkan kemegahan panggung indoor berstandar konser nasional dengan ribuan penonton.',
    highlights: ['Graha Cakrawala UM', 'Konser Terbuka untuk Umum', 'Ticketing & Campaign Blast'],
    impactBadge: '4.500+ Penonton Konser',
    logoUrl: '/logos/fisteria-logo.jpeg',
    posterUrl: '/logos/fisteria-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-blue-700 via-indigo-600 to-cyan-500',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    id: 'armour-fest',
    name: 'Armour Fest 2023',
    officialTitle: 'Armour Music Festival (Armournesia)',
    category: 'music',
    categoryLabel: 'Music Festival',
    collabType: 'Official Media Partner & Digital Broadcast',
    dateOrYear: '2023',
    location: 'Kota Malang',
    venue: 'Malang Music Arena',
    tagline: 'Harmoni Musik Rock & Pop Pilihan Bersama Komunitas Musik',
    desc: 'Aktivasi media partner untuk festival musik energik menghadirkan band legendaris Endank Soekamti dan musisi nasional lainnya, didukung sistem tiket digital YesPlis.',
    highlights: ['Guest Star: Endank Soekamti', 'YesPlis Official Ticketing', 'Armournesia Community Gathering'],
    impactBadge: '6.000+ Penonton',
    logoUrl: '/logos/armour-fest-logo.jpeg',
    posterUrl: '/logos/armour-fest-poster.jpeg',
    logoBg: 'bg-black',
    accentGradient: 'from-stone-900 to-red-950',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
  },
  {
    id: 'signaturee-festival',
    name: 'Signaturee Festival',
    officialTitle: 'Signaturee Festival (A Much Needed Break)',
    category: 'music',
    categoryLabel: 'Music & Lifestyle Festival',
    collabType: 'Media Partner & Event Coverage',
    dateOrYear: '2022 - 2026',
    location: 'Kota Malang',
    venue: 'Malang Festival Grounds',
    tagline: 'A Much Needed Break — Ruang Bernapas dan Menikmati Nada',
    desc: 'Publikasi festival musik tematik yang menggabungkan penampilan deretan musisi indie dan pop papan atas dengan instalasi seni, pop-up market kreatif, dan area bersantai.',
    highlights: ['Multi-Genre Music Stage', 'Art Installation & Creative Market', 'A Much Needed Break Experience'],
    impactBadge: '7.500+ Pengunjung',
    logoUrl: '/logos/signaturee-logo.png',
    posterUrl: '/logos/signaturee-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-emerald-700 via-teal-700 to-navy',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  {
    id: 'dempo-fair-2025',
    name: 'Dempo Fair 2025',
    officialTitle: 'Dempo Fair XLVII 2025 - SMAK St. Albertus Malang',
    category: 'music',
    categoryLabel: 'Music & Youth Festival',
    collabType: 'Official Media Partner & Ticket Promotion',
    dateOrYear: '1 November 2025',
    location: 'Kota Malang',
    venue: 'SMAK St. Albertus (Dempo) Malang',
    tagline: 'Panggung Pensi Legendaris Terbesar dengan Penampilan Musisi Terbaik',
    desc: 'Publikasi media partner festival seni dan konser musik tahunan paling prestisius di Malang (Dempo Fair), menghadirkan musisi papan atas Bernadya, Coldiac, serta ragam atraksi seni siswa.',
    highlights: ['Guest Star: Bernadya & Coldiac', 'SMAK St. Albertus Malang', 'YesPlis Official Ticketing'],
    impactBadge: '5.000+ Penonton Pensi',
    posterUrl: '/logos/dempo-fair-2025-poster.jpeg',
    accentGradient: 'from-amber-600 via-red-600 to-indigo-900',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
  },
  {
    id: 'ekspectanica-fest',
    name: 'Ekspectanica Music Festival',
    officialTitle: 'Ekspectanica Mega Music Stage',
    category: 'music',
    categoryLabel: 'Mega Concert & Music Fest',
    collabType: 'Official Media Partner & Ticket Blast',
    dateOrYear: 'Touring Music Festival',
    location: 'Jawa Timur (Malang & Surabaya)',
    venue: 'Stadion & Arena Konser Terbuka',
    tagline: 'Festival Musik Terbesar Menampilkan Jajaran Musisi Idola Tanah Air',
    desc: 'Publikasi media dan promosi konser skala puluhan ribu penonton, menampilkan nama besar seperti Mahalini, Fiersa Besari, HIVI!, dan musisi top tanah air dengan euforia luar biasa.',
    highlights: ['Lineup: Mahalini, Fiersa Besari, HIVI!', 'Panggung Megah Tata Suara & Cahaya Nasional', 'Puluhan Ribu Tiket Terjual'],
    impactBadge: '20.000+ Penonton Konser',
    posterUrl: '/logos/ekspectanica-fest-poster.jpeg',
    accentGradient: 'from-purple-700 via-violet-600 to-fuchsia-600',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  {
    id: 'spontanz-festival',
    name: 'Spontanz Festival',
    officialTitle: 'Spontanz Nostalgia & Pop Festival',
    category: 'music',
    categoryLabel: 'Concert & Music Festival',
    collabType: 'Media Partner & Audience Promotion',
    dateOrYear: 'Malang Stage',
    location: 'Kota Malang',
    venue: 'Graha Cakrawala / UMM Dome',
    tagline: 'Nostalgia dan Romansa Bersama Musisi Legendaris Indonesia',
    desc: 'Aktivasi media partner untuk konser megah menghadirkan Kahitna, Bunga Citra Lestari (BCL), dan Kunto Aji dengan pengalaman musikal yang intim, megah, dan berkelas.',
    highlights: ['Lineup: Kahitna, BCL, Kunto Aji', 'Pockets App Ticketing', 'Indoor Concert Experience'],
    impactBadge: '6.500+ Penonton',
    posterUrl: '/logos/spontanz-festival-poster.jpeg',
    accentGradient: 'from-rose-600 via-pink-600 to-amber-600',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  {
    id: 'paradic-fest',
    name: 'Paradic Fest UIN Malang',
    officialTitle: 'Paradic Fest - IKAMIA UIN Maulana Malik Ibrahim',
    category: 'music',
    categoryLabel: 'Campus Music Festival',
    collabType: 'Official Media Partner & Campus Blast',
    dateOrYear: 'Campus Festival',
    location: 'Kota Malang',
    venue: 'Lapangan Utama UIN Maliki Malang',
    tagline: 'Parade Nada dan Kolaborasi Seni Lintas Genre Mahasiswa',
    desc: 'Publikasi acara konser tahunan bergengsi mahasiswa UIN Malang, menghadirkan musisi kenamaan Coldiac dan kolaborasi syahdu Payung Teduh x Pusakata.',
    highlights: ['Coldiac, Payung Teduh x Pusakata', 'Pentas Seni Mahasiswa IKAMIA', 'Ribuan Mahasiswa se-Malang Raya'],
    impactBadge: '4.500+ Mahasiswa & Penonton',
    posterUrl: '/logos/paradic-fest-poster.jpeg',
    accentGradient: 'from-teal-600 via-emerald-600 to-sky-700',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  {
    id: 'est-brawijaya',
    name: 'EST Brawijaya 2022',
    officialTitle: 'Economic Synergy & Talent - BEM FEB Universitas Brawijaya',
    category: 'music',
    categoryLabel: 'Campus Concert & Festival',
    collabType: 'Official Media Partner & Promotion',
    dateOrYear: '2022',
    location: 'Kota Malang',
    venue: 'Universitas Brawijaya Malang',
    tagline: 'Economic Synergy & Talent — Menggugah Potensi Musik dan Bakat Muda',
    desc: 'Dukungan publikasi acara puncak perayaan kreasi mahasiswa FEB UB yang memadukan konser musik, kampanye gerakan ramah lingkungan (green movement), dan bazar kreatif mahasiswa.',
    highlights: ['BEM FEB Universitas Brawijaya', 'Green Movement Campaign', 'YesPlis Official Ticketing'],
    impactBadge: '3.500+ Mahasiswa UB & Publik',
    posterUrl: '/logos/est-brawijaya-2022-poster.jpeg',
    accentGradient: 'from-emerald-700 via-green-600 to-teal-700',
    badgeColor: 'bg-green-50 text-green-800 border-green-200',
  },
  {
    id: 'parapom-party',
    name: 'Parapom Party 2022 (UNMER)',
    officialTitle: 'Citraloka Sahwahita - BEM Universitas Merdeka Malang',
    category: 'music',
    categoryLabel: 'Campus Music Party',
    collabType: 'Media Partner & Event Coverage',
    dateOrYear: '2022',
    location: 'Kota Malang',
    venue: 'Universitas Merdeka (UNMER) Malang',
    tagline: 'Malam Selebrasi Karya Musik dan Kreativitas Citraloka Sahwahita',
    desc: 'Publikasi media partner festival musik kampus UNMER Malang dengan penampilan live band Coldiac serta ragam atraksi seni dari berbagai fakultas.',
    highlights: ['Live Performance: Coldiac', 'BEM Universitas Merdeka Malang', 'Citraloka Sahwahita Celebration'],
    impactBadge: '3.000+ Penonton Mahasiswa',
    posterUrl: '/logos/parapom-party-2022-poster.jpeg',
    accentGradient: 'from-cyan-600 via-blue-700 to-indigo-800',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  {
    id: 'kolakomu-fest',
    name: 'Kolakomu Fest (2022 & 2023)',
    officialTitle: 'KolaborAksi Komunitas Muda (Kolakomu Fest)',
    category: 'music',
    categoryLabel: 'Creative Community & Music',
    collabType: 'Official Media Partner & Community Hub',
    dateOrYear: '2022 & 2023',
    location: 'Kota Malang',
    venue: 'Creative Space Malang',
    tagline: 'KolaborAksi Kreatif Komunitas Muda dan Musik Independen Malang',
    desc: 'Kemitraan media berkelanjutan untuk festival musik indie dan pameran komunitas yang konsisten digelar untuk memajukan talenta muda Malang.',
    highlights: ['Multi-Edition Partnership (2022 & 2023)', 'Panggung Band Indie Lokal', 'Bazaar Kreatif & Art Exhibition'],
    impactBadge: '4.000+ Komunitas Kreatif',
    logoUrl: '/logos/kolakomu-fest-2023-logo.jpeg',
    posterUrl: '/logos/kolakomu-fest-2022-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-amber-600 via-orange-600 to-red-600',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  {
    id: 'outfest-malang',
    name: 'Outfest 2022 (Malang City Point)',
    officialTitle: 'Outfest - Unimaginable Journey at Malang City Point',
    category: 'music',
    categoryLabel: 'Music & Mall Festival',
    collabType: 'Official Media Partner & Outdoor Broadcast',
    dateOrYear: '2022',
    location: 'Kota Malang',
    venue: 'Malang City Point (Apartment & Citywalk)',
    tagline: 'Unimaginable Journey Music, Lifestyle & Food Fest',
    desc: 'Liputan media acara festival musik outdoor di kawasan Malang City Point yang memadukan konser panggung terbuka dengan festival kuliner dan area belanja modern.',
    highlights: ['Malang City Point Citywalk', 'Unimaginable Journey Concept', 'Festival Kuliner & Musik Outdoor'],
    impactBadge: '5.000+ Pengunjung Mall & Musik',
    posterUrl: '/logos/outfest-2022-poster.jpeg',
    accentGradient: 'from-blue-700 via-indigo-600 to-purple-700',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    id: 'sampoerna-fest',
    name: 'Sampoerna Fest',
    officialTitle: 'Sampoerna Music & Brand Festival',
    category: 'music',
    categoryLabel: 'Brand Activation & Concert',
    collabType: 'Media Partner & Brand Activation Coverage',
    dateOrYear: 'Malang Series',
    location: 'Kota Malang',
    venue: 'Outdoor Stage Malang',
    tagline: 'Pentas Musik Spektakuler dan Aktivasi Brand Skala Besar',
    desc: 'Dukungan publikasi media dan peliputan aktivasi panggung festival musik tematik dengan tata suara megah dan penampilan musisi pilihan.',
    highlights: ['National Brand Music Stage', 'High-Energy Music Concert', 'Interactive Brand Booths'],
    impactBadge: '8.000+ Penonton',
    logoUrl: '/logos/sampoerna-fest-logo.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-red-600 via-rose-700 to-neutral-900',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
  },
  {
    id: 'gm-music-fest',
    name: 'GM Music Fest',
    officialTitle: 'GM Music Festival Malang',
    category: 'music',
    categoryLabel: 'Music Festival',
    collabType: 'Media Partner & Promotion',
    dateOrYear: 'Malang Arena',
    location: 'Kota Malang',
    venue: 'Concert Field Malang',
    tagline: 'Suara dan Energi Generasi Muda dalam Satu Panggung Megah',
    desc: 'Publikasi digital dan liputan panggung musik pemuda Malang yang menghadirkan musisi lokal berpotensi besar bersama deretan bintang tamu papan atas.',
    highlights: ['Live Concert Stage', 'Pentas Kolaborasi Musisi', 'Broad Audience Engagement'],
    impactBadge: '3.500+ Penikmat Musik',
    logoUrl: '/logos/gm-music-fest-logo.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-purple-600 via-indigo-700 to-slate-900',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  {
    id: 'local-stage-fest',
    name: 'Local Stage Fest',
    officialTitle: 'Local Stage Festival Malang',
    category: 'music',
    categoryLabel: 'Indie & Local Music Festival',
    collabType: 'Media Partner & Indie Artist Showcase',
    dateOrYear: 'Malang Local Circuit',
    location: 'Kota Malang',
    venue: 'Amphitheatre & Local Stage',
    tagline: 'Panggung Apresiasi dan Wadah Berkarya Musisi Independen Malang',
    desc: 'Kolaborasi media partner untuk memfasilitasi musisi dan band independen lokal Kota Malang tampil di panggung profesional dengan peliputan media berkualitas.',
    highlights: ['Wadah Musisi Indie Malang', 'Intimate Music Gathering', 'Live Video Recording Coverage'],
    impactBadge: '2.000+ Penikmat Musik Indie',
    logoUrl: '/logos/local-stage-fest-logo.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-zinc-800 to-stone-900',
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-300',
  },
  {
    id: 'selagu-lagi-fest',
    name: 'Selagu Lagi Fest',
    officialTitle: 'Selagu Lagi Sing-Along Music Festival',
    category: 'music',
    categoryLabel: 'Sing-Along & Music Fest',
    collabType: 'Media Partner & Community Sing-Along',
    dateOrYear: 'Malang Event',
    location: 'Kota Malang',
    venue: 'Open Space Malang',
    tagline: 'Bernyanyi Bersama Satu Rasa, Satu Jiwa di Setiap Nada',
    desc: 'Publikasi event festival bernyanyi massal (sing-along) yang sangat digemari generasi muda, menghidupkan lagu-lagu nostalgia dan hits terkini dalam atmosfer akrab.',
    highlights: ['Sing-Along Massal', 'Nostalgia & Hits Terkini', 'Komunitas Musik Millennial & Gen Z'],
    impactBadge: '3.000+ Audiens Sing-Along',
    logoUrl: '/logos/selagu-lagi-fest-logo.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-sky-600 via-blue-600 to-navy',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },

  // --- 3. NEW PARTNERSHIPS: SPORT & TRAIL ---
  {
    id: 'bum-rt14-fest',
    name: 'BUM RT14 Fest Fun Run 5K',
    officialTitle: 'BUM RT14 Fest 2026 - Discover Banjararum',
    category: 'sport',
    categoryLabel: '5K Fun Run & Community',
    collabType: 'Official Media Partner & Race Broadcast',
    dateOrYear: '2026',
    location: 'Banjararum, Singosari / Malang',
    venue: 'Kawasan Banjararum Singosari',
    tagline: 'Run Together, Discover Banjararum',
    desc: 'Publikasi dan peliputan event lari rekreasi 5K yang menggabungkan olahraga, eksplorasi potensi lokal Banjararum, racepack collection, dan bazar warga.',
    highlights: ['Kategori 5K Fun Run', 'Run Together, Discover Banjararum', 'Pemberdayaan UMKM Warga'],
    impactBadge: '1.200+ Pelari & Warga',
    logoUrl: '/logos/bum-rt14-fest-logo.jpeg',
    posterUrl: '/logos/bum-rt14-fest-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-blue-600 via-indigo-700 to-sky-600',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    id: 'malang-color-run',
    name: 'Malang Color Run Official',
    officialTitle: 'Malang Color Run Official Festival',
    category: 'sport',
    categoryLabel: '5K Fun Run & Color Party',
    collabType: 'Media Partner & Social Media Amplification',
    dateOrYear: 'Agenda Tahunan Malang',
    location: 'Kota Malang',
    venue: 'Sirkuit Jalan Protokol Malang',
    tagline: 'Pesta Lari Bertabur Warna Paling Meriah di Malang Raya',
    desc: 'Kampanye promosi media dan siaran live dokumentasi ajang lari penuh warna yang diikuti ribuan pelari muda, lengkap dengan color throw party dan music performance.',
    highlights: ['Kategori 5K Color Splash', 'DJ Live Performance', 'Komunitas Pelari Muda'],
    impactBadge: '5.000+ Pelari Aktif',
    posterUrl: '/logos/malang-color-run-poster.jpeg',
    accentGradient: 'from-pink-500 via-amber-400 to-cyan-500',
    badgeColor: 'bg-pink-50 text-pink-800 border-pink-200',
  },
  {
    id: 'color-fun-jatimpark',
    name: 'Color Fun Trail Run Jatim Park',
    officialTitle: 'Jawa Timur Park Group - Secret Trail Run',
    category: 'trail',
    categoryLabel: 'Theme Park & Trail Run',
    collabType: 'Official Media Partner & Race Coverage',
    dateOrYear: 'Annual Event',
    location: 'Kota Wisata Batu',
    venue: 'Jawa Timur Park Group (Batu Secret Zoo & Area Trail)',
    tagline: 'Sensasi Unik Trail Run di Kawasan Theme Park Legendaris',
    desc: 'Liputan media dan promosi sport tourism ajang lari lintas rute bertema alam di area Jawa Timur Park Group dengan latar pemandangan pegunungan dan satwa.',
    highlights: ['Jawa Timur Park Group', 'Rute Trail & Theme Park', 'Sport Tourism Keluarga'],
    impactBadge: '2.500+ Pelari & Wisatawan',
    posterUrl: '/logos/color-fun-jatimpark-poster.jpeg',
    accentGradient: 'from-emerald-600 via-lime-600 to-yellow-500',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },

  // --- 4. NEW PARTNERSHIPS: ARTS, COMEDY & PERFORMANCE ---
  {
    id: 'malang-lucu-sayang-fest',
    name: 'Malang Lucu Sayang Fest',
    officialTitle: 'Standupindo Malang - Malang Lucu Sayang Fest 2026',
    category: 'arts',
    categoryLabel: 'Comedy & Special Shows',
    collabType: 'Official Media Partner & Show Promotion',
    dateOrYear: '2026',
    location: 'Kota Malang',
    venue: 'Auditorium / Theatre Hall Malang',
    tagline: 'Salam Satu Tawa Bersama Komika Kebanggaan Malang',
    desc: 'Publikasi media dan distribusi informasi tiket pertunjukan stand-up comedy akbar garapan Standupindo Malang, menyajikan deretan komika lokal dan nasional dalam satu panggung penuh tawa.',
    highlights: ['Standup Indo Malang', 'Special Show Komika Nasional', 'Ticketing Campaign Blast'],
    impactBadge: '1.500+ Penonton Terhibur',
    logoUrl: '/logos/standup-indo-malang-logo.jpeg',
    posterUrl: '/logos/malang-lucu-sayang-fest-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-amber-600 via-orange-500 to-yellow-600',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  {
    id: 'alcander-dance-competition',
    name: 'Alcander Dance Competition',
    officialTitle: 'Alcander Modern & K-Pop Dance Competition',
    category: 'arts',
    categoryLabel: 'Dance & Performing Arts',
    collabType: 'Media Partner & Event Broadcast',
    dateOrYear: 'Annual Championship',
    location: 'Kota Malang',
    venue: 'Malang Town Square (MATOS)',
    tagline: 'Kompetisi Dance Bergengsi & Panggung Unjuk Bakat Generasi Muda',
    desc: 'Liputan media partner kompetisi tari modern dan K-Pop cover dance tingkat regional Jawa Timur yang diselenggarakan gratis untuk umum di atrium Malang Town Square.',
    highlights: ['Venue Malang Town Square (MATOS)', 'Free HTM untuk Umum', 'Kategori Modern & K-Pop Dance Battle'],
    impactBadge: '3.000+ Penonton & Dancer',
    posterUrl: '/logos/alcander-dance-competition-poster.jpeg',
    accentGradient: 'from-pink-600 via-rose-600 to-purple-600',
    badgeColor: 'bg-pink-50 text-pink-800 border-pink-200',
  },
  {
    id: 'seni-menggambar-lampion',
    name: 'Seni Menggambar Lampion & Kaligrafi',
    officialTitle: 'Workshop Seni Menggambar Lampion & Kaligrafi',
    category: 'arts',
    categoryLabel: 'Workshop Seni & Budaya',
    collabType: 'Media Partner & Edukasi Budaya',
    dateOrYear: 'Special Workshop',
    location: 'Kota Malang',
    venue: 'Galeri Seni & Budaya Malang',
    tagline: 'Menuangkan Goresan Keindahan Tradisi dan Seni Lukis Lampion',
    desc: 'Dukungan publikasi workshop edukatif melukis lampion dan seni kaligrafi tradisional, menghadirkan instruktur seniman profesional bagi peserta umum dan pelajar.',
    highlights: ['Workshop Seni Kaligrafi & Lukis', 'Edukasi Budaya & Kreativitas', 'Pameran Karya Lampion'],
    impactBadge: '500+ Peserta Workshop',
    posterUrl: '/logos/seni-menggambar-lampion-poster.jpeg',
    accentGradient: 'from-red-600 via-amber-600 to-orange-700',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
  },
  {
    id: 'kosayu-art-fest-2025',
    name: 'Kosayu Art Fest 2025',
    officialTitle: 'Kosayu Art Fest 2025 - SMAK Kolese Santo Yusup Malang',
    category: 'arts',
    categoryLabel: 'Art & Youth Festival',
    collabType: 'Official Media Partner & Event Coverage',
    dateOrYear: '2025 Event',
    location: 'Kota Malang',
    venue: 'SMAK Kolese Santo Yusup (Kosayu) Malang',
    tagline: 'Pentas Seni dan Kreativitas Akbar Kolese Santo Yusup',
    desc: 'Liputan media partner perayaan seni, tari, panggung musik, dan pameran visual bergengsi garapan SMAK Kolese Santo Yusup Malang dengan antusiasme ribuan pelajar dan masyarakat umum.',
    highlights: ['SMAK Kolese Santo Yusup (Kosayu)', 'Guest Star & Art Performances', 'Ticketing & Campaign Blast'],
    impactBadge: '4.000+ Pengunjung & Pelajar',
    logoUrl: '/logos/kosayu-art-fest-2025-logo.jpeg',
    posterUrl: '/logos/kosayu-art-fest-2025-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-blue-600 via-indigo-600 to-violet-700',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },

  // --- 5. NEW PARTNERSHIPS: COMMUNITY & BUSINESS EXPO ---
  {
    id: 'malang-creative-connect',
    name: 'Festival Mbois XI (Malang Menyala)',
    officialTitle: 'Festival Mbois XI - Malang Menyala (MCC)',
    category: 'business',
    categoryLabel: 'Business & Conference',
    collabType: 'Official Media Partner & Creative Hub Coverage',
    dateOrYear: 'Malang Creative Agenda',
    location: 'Kota Malang',
    venue: 'Malang Creative Center (MCC)',
    tagline: 'Malang Menyala — Kolaborasi Lintas Ekosistem Ekonomi Kreatif',
    desc: 'Dukungan publikasi perhelatan akbar ekonomi kreatif Festival Mbois XI bertema Malang Menyala di gedung MCC, berkolaborasi dengan Bank Indonesia, BRI, Telkomsel 5G, dan UNESCO Creative City.',
    highlights: ['Malang Creative Center (MCC)', 'Supported by Bank Indonesia, BRI & Telkomsel 5G', 'UNESCO Creative City Initiative'],
    impactBadge: '10.000+ Pelaku Ekraf',
    logoUrl: '/logos/festival-mbois-malang-menyala-logo.jpeg',
    posterUrl: '/logos/festival-mbois-malang-menyala-poster.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-indigo-600 via-blue-600 to-cyan-600',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  {
    id: 'malang-strudel-anniversary',
    name: 'Malang Strudel Anniversary Festival',
    officialTitle: 'Malang Strudel Community & Festival Celebration',
    category: 'community',
    categoryLabel: 'Festival & Community',
    collabType: 'Media Partner & Brand Activation Coverage',
    dateOrYear: 'Annual Celebration',
    location: 'Malang Raya',
    venue: 'Area Publik & Sentra Oleh-oleh Malang',
    tagline: 'Perayaan Komunitas dan Wisata Kuliner Legendaris Malang',
    desc: 'Liputan media acara perayaan ulang tahun brand kuliner ikonik Malang Strudel, melibatkan festival musik, jalan sehat warga, bazar UMKM, dan lomba kreatif.',
    highlights: ['Brand Ikon Kuliner Malang', 'Jalan Sehat & Festival Rakyat', 'Bazar UMKM & Komunitas'],
    impactBadge: '8.000+ Warga & Wisatawan',
    logoUrl: '/logos/malang-strudel-anniversary-logo.jpeg',
    logoBg: 'bg-white',
    accentGradient: 'from-amber-500 via-yellow-500 to-orange-600',
    badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
];

const testimonials = [
  {
    quote:
      'Kerja sama publikasi media bersama CV Digital Creative Media sangat membantu meningkatkan visibilitas event lari kami di Malang Raya. Materi promosi rapi, estetik, dan respon tim sangat cepat.',
    name: 'Race Committee',
    role: 'Penyelenggara Event Lari',
    event: 'Malang Run Fest 2027',
  },
  {
    quote:
      'Jangkauan promosi untuk rute Sumber Jenon dan Puncak Gunungronggo sangat efektif menjangkau komunitas pelari trail Jawa Timur. Koordinasi publikasi sangat memuaskan.',
    name: 'Tim Pelaksana GTR 2026',
    role: 'Organizer',
    event: 'Gunung Ronggo Trail Run 2026',
  },
  {
    quote:
      'Exposure panggung konser musik kami tersampaikan dengan sangat dinamis ke audiens pemuda Malang Raya. Kolaborasi peliputan media yang solid dan berdampak nyata.',
    name: 'Festival Organizing Team',
    role: 'Event Director',
    event: 'Kickfest & Music Festival Series',
  },
  {
    quote:
      'Publikasi event musik di UMM Dome berjalan lancar dan menjangkau target audiens mahasiswa serta penikmat musik lokal secara tepat sasaran. Partner media yang sangat profesional.',
    name: 'Media Relations Team',
    role: 'Event & Festival Partner',
    event: 'Live Arena Malang',
  },
];

export default function Partners() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'music' | 'sport' | 'trail' | 'arts' | 'community' | 'business'
  >('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosterEvent, setSelectedPosterEvent] = useState<PartnerEvent | null>(null);

  const filteredEvents =
    activeCategory === 'all'
      ? verifiedPartners
      : verifiedPartners.filter((e) => {
          if (activeCategory === 'community') {
            return e.category === 'community' || e.category === 'business';
          }
          return e.category === activeCategory;
        });

  return (
    <section id="partnership" className="py-20 md:py-28 bg-white border-t border-border relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max px-6 md:px-10 lg:px-16 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/10 border border-gold/30 rounded-full mb-4">
            <Handshake className="w-4 h-4 text-gold-600" />
            <span className="text-navy font-semibold text-xs tracking-wider uppercase">
              Official Event Partnerships
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-4">
            Dipercaya Oleh 20+ Event Olahraga, Konser Musik & Festival Terkemuka.
          </h2>
          <p className="text-slate text-base md:text-lg leading-relaxed">
            CV Digital Creative Media bangga telah menjadi mitra media dan publikasi resmi bagi festival musik akbar,
            agenda lari bergengsi (fun run & trail run), standup comedy show, expo ekonomi kreatif, hingga kompetisi seni di Malang Raya dan Jawa Timur.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-14">
          {[
            { number: '24+', label: 'Event Resmi Terdaftar', desc: 'Konser musik, fun run, trail, expo & seni' },
            { number: '85K+', label: 'Total Peserta & Penonton', desc: 'Akumulasi jangkauan event aktif' },
            { number: '100%', label: 'Dedicated Media Coverage', desc: 'Publikasi feed, story, & on-ground report' },
            { number: 'Malang & Jawa Timur', label: 'Fokus Wilayah Strategis', desc: 'Koneksi komunitas pemuda, pelari & kreatif' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-5 md:p-6 bg-offwhite border border-border rounded-xl transition-all duration-300 hover:border-gold/50 hover:shadow-xs"
            >
              <span className="text-2xl md:text-3xl font-bold text-navy block mb-1 tracking-tight">{stat.number}</span>
              <h3 className="text-navy font-semibold text-sm mb-1">{stat.label}</h3>
              <p className="text-slate text-xs leading-normal">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Verified Event Marquee Logo Ticker */}
        <div className="mb-14 bg-offwhite/70 border-y border-border py-4 overflow-hidden -mx-6 md:-mx-10 lg:-mx-16 px-4">
          <div className="flex items-center gap-3 mb-2 px-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-semibold tracking-wider text-slate">
              Official Partner Logos & Visual Collaborations ({verifiedPartners.length} Events)
            </span>
          </div>
          <div className="flex overflow-hidden select-none">
            <div className="animate-marquee flex items-center gap-6 py-2">
              {[...verifiedPartners, ...verifiedPartners].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => setSelectedPosterEvent(item)}
                  className="flex items-center gap-3.5 px-4 py-2 bg-white rounded-xl border border-border shadow-2xs whitespace-nowrap hover:border-gold transition-colors cursor-pointer group"
                >
                  {item.logoUrl ? (
                    <div
                      className={`w-10 h-10 rounded-lg ${
                        item.logoBg || 'bg-offwhite'
                      } border border-border/80 flex items-center justify-center p-1 overflow-hidden flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <img
                        src={item.logoUrl}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : item.posterUrl ? (
                    <div className="w-10 h-10 rounded-lg bg-offwhite border border-border/80 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <img
                        src={item.posterUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.accentGradient} text-white flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0`}
                    >
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-navy block leading-none group-hover:text-gold transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate block mt-1">{item.collabType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
          {[
            { key: 'all', label: `Semua Event (${verifiedPartners.length})`, icon: Flame },
            { key: 'music', label: 'Festival Musik', icon: Music },
            { key: 'sport', label: 'Sport & Fun Run', icon: Activity },
            { key: 'trail', label: 'Trail Running', icon: Compass },
            { key: 'arts', label: 'Seni & Pertunjukan', icon: Palette },
            { key: 'community', label: 'Bisnis & Komunitas', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-offwhite text-slate hover:text-navy hover:bg-slate/10 border border-border'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Partner Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="card p-6 flex flex-col justify-between group hover:border-gold/60 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div>
                {/* Header: Logo / Visual & Category Badge */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  {event.logoUrl ? (
                    <div
                      className={`h-20 w-20 ${
                        event.logoBg || 'bg-white'
                      } border border-border rounded-xl p-2 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <img
                        src={event.logoUrl}
                        alt={`${event.name} Official Logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : event.posterUrl ? (
                    <div
                      onClick={() => setSelectedPosterEvent(event)}
                      className="h-20 w-20 border border-border rounded-xl overflow-hidden flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform cursor-pointer relative"
                    >
                      <img
                        src={event.posterUrl}
                        alt={`${event.name} Visual`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-navy/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`h-20 w-20 rounded-xl bg-gradient-to-br ${event.accentGradient} text-white flex flex-col items-center justify-center p-2 text-center shadow-xs flex-shrink-0`}
                    >
                      <span className="text-[9px] tracking-widest uppercase font-semibold text-white/80">LIVE</span>
                      <Music className="w-5 h-5 text-gold my-1" />
                      <span className="text-[11px] font-bold leading-tight">ARENA</span>
                    </div>
                  )}

                  <div className="text-right">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border inline-block ${event.badgeColor}`}>
                      {event.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate font-medium block mt-1.5 flex items-center justify-end gap-1">
                      <Calendar className="w-3 h-3 text-slate/70" />
                      {event.dateOrYear}
                    </span>
                  </div>
                </div>

                {/* Event Title */}
                <h4 className="font-bold text-navy text-lg leading-snug group-hover:text-gold transition-colors mb-1">
                  {event.name}
                </h4>
                <p className="text-gold-700 text-xs font-semibold mb-3">
                  {event.collabType}
                </p>

                {/* Tagline / Subtitle */}
                <p className="text-navy/90 text-xs font-medium italic mb-3">
                  "{event.tagline}"
                </p>

                {/* Description */}
                <p className="text-slate text-sm leading-relaxed mb-4">{event.desc}</p>

                {/* Location & Venue */}
                <div className="flex items-start gap-2 text-xs text-slate mb-4 p-2.5 bg-offwhite rounded-lg border border-border/60">
                  <MapPin className="w-3.5 h-3.5 text-navy flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy">{event.venue}</span>
                    <span className="block text-slate text-[11px]">{event.location}</span>
                  </div>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {event.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-navy/5 text-navy/80 border border-navy/10"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Poster Preview Button if Poster Exists */}
                {event.posterUrl && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPosterEvent(event)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-offwhite hover:bg-gold/15 text-navy text-xs font-semibold rounded-lg border border-border/80 hover:border-gold/50 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-gold-600" />
                      Lihat Poster & Visual Resmi Event
                    </button>
                  </div>
                )}
              </div>

              {/* Card Footer: Verified Badge */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{event.impactBadge}</span>
                </div>
                <span className="text-[11px] text-slate/70 font-medium">Verified Partner</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Quote Box */}
        <div className="bg-offwhite rounded-2xl border border-border p-6 md:p-10 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Quote className="w-6 h-6 text-gold" />
              <span className="section-label">Apresiasi Mitra Penyelenggara</span>
            </div>

            <div className="relative min-h-[140px] flex flex-col justify-between">
              <div>
                <p className="text-navy text-lg md:text-xl font-medium leading-relaxed italic mb-6">
                  "{testimonials[activeTestimonial].quote}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-sm">
                    {testimonials[activeTestimonial].event.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-navy text-sm">
                      {testimonials[activeTestimonial].name}
                    </h5>
                    <p className="text-slate text-xs">
                      {testimonials[activeTestimonial].role} —{' '}
                      <span className="font-medium text-navy/80">
                        {testimonials[activeTestimonial].event}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Switcher Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                        activeTestimonial === i ? 'w-8 bg-gold' : 'w-2.5 bg-border hover:bg-slate'
                      }`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Action Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-navy via-navy-800 to-navy-900 text-white p-8 md:p-12 border border-navy-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-2 inline-block">
                Kolaborasi Event & Media
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3">
                Ingin Event Lari, Konser, atau Brand Anda Dipublikasikan Bersama Kami?
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                Dapatkan paket publikasi media partner resmi, liputan on-ground & aftermovie, paid promote tertarget ke komunitas pemuda & pelari, hingga live streaming liputan.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="#contact"
                className="btn-gold text-center text-sm py-3 px-6 shadow-md"
              >
                Ajukan Media Partner
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                Format & Skema Kerjasama
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Skema Kerjasama */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-border shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate hover:text-navy hover:bg-offwhite transition-colors cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full mb-3">
              <Handshake className="w-3.5 h-3.5 text-gold-600" />
              <span className="text-navy font-semibold text-xs uppercase tracking-wider">
                Panduan Media Partner & Kolaborasi
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-navy mb-2">Benefit & Format Media Partner</h3>
            <p className="text-slate text-sm mb-6">
              Jalur dukungan kolaborasi yang kami sediakan untuk event olahraga, festival, dan brand activation:
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Megaphone,
                  title: '1. Official Media Partner (Event Publikasi)',
                  desc: 'Penyebaran flyer/poster resmi ke jaringan media sosial, broadcast Instagram Story & Reels, penempatan logo media partner di seluruh materi promosi event.',
                  badge: 'Barter Value / Paket Kerjasama',
                },
                {
                  icon: Camera,
                  title: '2. On-Ground Coverage & Dokumentasi Kreatif',
                  desc: 'Tim peliputan langsung hari-H acara, pembuatan video highlight/aftermovie beresolusi tinggi, live story suasana race village & konser.',
                  badge: 'Dokumentasi & Live',
                },
                {
                  icon: Activity,
                  title: '3. Paid Promote & Race Registration Blast',
                  desc: 'Amplifikasi pengumuman pendaftaran peserta (Early Bird, Normal, Last Call) untuk memaksimalkan okupansi slot tiket lari atau konser.',
                  badge: 'Aktivasi Penjualan Tiket',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 bg-offwhite border border-border rounded-xl">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-navy text-white flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-gold-700 bg-gold/15 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-slate text-xs leading-relaxed pl-9">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn-secondary text-sm py-2.5 px-5 cursor-pointer"
              >
                Tutup
              </button>
              <a
                href="#contact"
                onClick={() => setIsModalOpen(false)}
                className="btn-primary text-sm py-2.5 px-5 text-center"
              >
                Lanjut ke Formulir Kontak
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal Poster & Event Detail Preview */}
      {selectedPosterEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPosterEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-border shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPosterEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-navy shadow-md transition-colors cursor-pointer"
              aria-label="Tutup preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster / Visual Column */}
            <div className="md:w-1/2 bg-neutral-900 flex items-center justify-center p-4 min-h-[320px] md:min-h-[480px]">
              <img
                src={selectedPosterEvent.posterUrl || selectedPosterEvent.logoUrl}
                alt={selectedPosterEvent.officialTitle}
                className="max-h-[60vh] md:max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Event Information Column */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {selectedPosterEvent.logoUrl && (
                    <div className="w-10 h-10 rounded-lg border border-border p-1 bg-white overflow-hidden flex-shrink-0">
                      <img
                        src={selectedPosterEvent.logoUrl}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border inline-block ${selectedPosterEvent.badgeColor}`}>
                      {selectedPosterEvent.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate font-medium block">
                      {selectedPosterEvent.dateOrYear}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-navy mb-1 leading-snug">
                  {selectedPosterEvent.name}
                </h3>
                <p className="text-gold-700 text-xs font-semibold mb-3">
                  {selectedPosterEvent.collabType}
                </p>

                <p className="text-navy text-xs font-medium italic mb-3">
                  "{selectedPosterEvent.tagline}"
                </p>

                <p className="text-slate text-xs md:text-sm leading-relaxed mb-4">
                  {selectedPosterEvent.desc}
                </p>

                <div className="p-3 bg-offwhite rounded-xl border border-border/70 mb-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-navy font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>{selectedPosterEvent.venue}</span>
                  </div>
                  <div className="text-slate pl-5.5 text-[11px]">
                    Wilayah: {selectedPosterEvent.location}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate block mb-2">
                    Highlight & Cakupan:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPosterEvent.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-navy/5 text-navy/80 border border-navy/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedPosterEvent.impactBadge}</span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedPosterEvent(null)}
                  className="btn-primary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                >
                  Ajukan Partner Serupa
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
