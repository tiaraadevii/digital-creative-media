import { PartnerEvent, PartnerCategory } from '@/types/partner';
import { supabase } from '@/lib/supabase';

const PARTNERS_STORAGE_KEY = 'dcm_partners_items';

export const INITIAL_PARTNERS: PartnerEvent[] = [
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

  // --- DALBOFEST SERIES & NEW PARTNERSHIPS ---
  {
    id: 'dalbofest-end-year-2024',
    name: 'Dalbofest End Year 2024',
    officialTitle: 'Dalbofest End Year 2024 · Begawan Plaza',
    category: 'music',
    categoryLabel: 'Music Festival',
    collabType: 'Official Media Partner & Dokumentasi Event',
    dateOrYear: 'Desember 2024',
    location: 'Malang',
    venue: 'Begawan Apartment & Plaza (Tlogomas)',
    tagline: 'Rayakan Akhir Tahun dengan Musik & Komunitas di Begawan Plaza',
    desc: 'Liputan dan publikasi resmi festival penutup tahun 2024 di Begawan Plaza Malang. Menampilkan penampilan artis lokal pilihan serta perayaan komunitas dalam suasana festif.',
    highlights: ['Lineup: Gembira, Lokaria, Acro', 'Year-End Festival', 'Begawan Plaza Malang'],
    impactBadge: '1.000+ Pengunjung',
    posterUrl: '/logos/dalbofest-end-year-2024-poster.jpeg',
    logoBg: 'bg-[#1a1a2e]',
    accentGradient: 'from-purple-700 via-indigo-700 to-blue-800',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  {
    id: 'dalbofest-ramadhan-market-2025',
    name: 'Dalbofest Ramadhan Market 2025',
    officialTitle: 'Dalbofest Ramadhan Market · Begawan Plaza',
    category: 'community',
    categoryLabel: 'Ramadhan Market & Festival',
    collabType: 'Official Media Partner & Promosi Digital',
    dateOrYear: '20 – 26 Maret 2025',
    location: 'Malang',
    venue: 'Plaza Begawan UG Floor',
    tagline: 'Bazaar Ramadhan Gratis dengan Live Music & DJ di Jantung Kota',
    desc: 'Publikasi digital dan liputan media event bazar Ramadhan tahunan di Begawan Plaza. Menampilkan area belanja tematik, live music, penampilan DJ, dan aktivasi komunitas selama 7 hari tanpa tiket masuk.',
    highlights: ['Free Entry', 'DJ Nada & Guest Performers', 'Ramadhan Bazaar 7 Hari'],
    impactBadge: '3.000+ Pengunjung',
    posterUrl: '/logos/dalbofest-ramadhan-market-2025-poster.jpeg',
    logoBg: 'bg-[#1a1a1a]',
    accentGradient: 'from-green-700 via-teal-700 to-emerald-800',
    badgeColor: 'bg-green-50 text-green-800 border-green-200',
  },
  {
    id: 'dalbofest-street-culture-2025',
    name: 'Dalbofest Street Culture 2025',
    officialTitle: 'Dalbofest Street Culture 2025 · Begawan Plaza',
    category: 'music',
    categoryLabel: 'Street Culture Festival',
    collabType: 'Official Media Partner & Brand Activation',
    dateOrYear: '1 – 7 Desember 2025',
    location: 'Malang',
    venue: 'Begawan Plaza, Ground Floor',
    tagline: 'Ekspresikan Identitasmu di Festival Street Culture Terbesar Malang',
    desc: 'Liputan media dan promosi event street culture festival di Begawan Plaza Malang, menampilkan musisi ternama Dhyo Haw, brand streetwear lokal, dan aktivasi komunitas urban selama sepekan penuh.',
    highlights: ['Headliner: Dhyo Haw', 'Street Fashion & Streetwear', '1-7 Desember 2025'],
    impactBadge: '4.000+ Pengunjung',
    posterUrl: '/logos/dalbofest-street-culture-2025-poster.jpeg',
    logoBg: 'bg-[#0d0d0d]',
    accentGradient: 'from-gray-700 via-zinc-700 to-stone-800',
    badgeColor: 'bg-gray-50 text-gray-800 border-gray-200',
  },
  {
    id: 'jakcloth-2026',
    name: 'Jakcloth 2026 Malang',
    officialTitle: 'Jakcloth 2026 – The Biggest Youth & Clothing Expo',
    category: 'music',
    categoryLabel: 'Clothing Expo & Festival',
    collabType: 'Media Partner & Expo Coverage',
    dateOrYear: '2026',
    location: 'Malang',
    venue: 'Malang Kota',
    tagline: 'Expo Fashion & Musik Kaum Muda Terbesar di Malang',
    desc: 'Liputan dan publikasi media untuk perhelatan Jakcloth 2026 di Malang, pameran clothing indie, streetwear, dan lifestyle terbesar untuk anak muda. Menampilkan brand lokal pilihan dan hiburan musik.',
    highlights: ['Clothing & Lifestyle Expo', 'Youth Festival Malang', 'Brand Lokal & Streetwear'],
    impactBadge: '5.000+ Pengunjung',
    posterUrl: '/logos/jakcloth-2026-poster.jpeg',
    logoBg: 'bg-[#0f172a]',
    accentGradient: 'from-blue-800 via-slate-800 to-gray-900',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    id: 'senada-seirama-2025',
    name: 'Senada Seirama 2025',
    officialTitle: 'Senada Seirama 2025 – Music Festival',
    category: 'music',
    categoryLabel: 'Music Festival',
    collabType: 'Official Media Partner & Dokumentasi Event',
    dateOrYear: '2025',
    location: 'Malang Raya',
    venue: 'Malang',
    tagline: 'Satu Irama, Satu Panggung – Festival Musik yang Menyatukan',
    desc: 'Liputan dan promosi media festival musik Senada Seirama 2025, menampilkan lineup artis indie dan pop nasional pilihan termasuk Silamuukhtabar, Klanin, Colino, Jemsit, dan Tenxi.',
    highlights: ['Lineup: Silamuukhtabar, Klanin, Colino', 'Jemsit & Tenxi', 'Indie & Pop Festival'],
    impactBadge: '2.000+ Penonton',
    posterUrl: '/logos/senada-seirama-2025-poster.jpeg',
    logoBg: 'bg-[#1e1b4b]',
    accentGradient: 'from-violet-700 via-purple-700 to-fuchsia-800',
    badgeColor: 'bg-violet-50 text-violet-800 border-violet-200',
  },
  {
    id: 'raya-berkarya-gresik-2025',
    name: 'Raya Berkarya Gresik 2025',
    officialTitle: 'Raya Berkarya 2025 – Creative Festival Gresik',
    category: 'arts',
    categoryLabel: 'Creative Festival',
    collabType: 'Media Partner & Dokumentasi Kreatif',
    dateOrYear: '2025',
    location: 'Gresik',
    venue: 'Gresik',
    tagline: 'Berkarya, Berekspresi, Berbagi Inspirasi di Kota Santri',
    desc: 'Liputan media dan publikasi digital event kreatif Raya Berkarya 2025 di Gresik, merayakan kreativitas generasi muda melalui seni, musik, dan pameran karya lokal.',
    highlights: ['Festival Kreatif Gresik', 'Pameran Karya Lokal', 'Seni & Musik'],
    impactBadge: '1.500+ Kreator & Pengunjung',
    posterUrl: '/logos/raya-berkarya-gresik-2025-poster.jpeg',
    logoBg: 'bg-[#1a1a1a]',
    accentGradient: 'from-orange-600 via-red-600 to-rose-700',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
];

function rowToPartner(row: any): PartnerEvent {
  return {
    id: row.id,
    name: row.name || '',
    officialTitle: row.official_title || '',
    category: (row.category as PartnerCategory) || 'sport',
    categoryLabel: row.category_label || '',
    collabType: row.collab_type || '',
    dateOrYear: row.date_or_year || '',
    location: row.location || '',
    venue: row.venue || '',
    tagline: row.tagline || '',
    desc: row.desc_text || '',
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    impactBadge: row.impact_badge || '',
    logoUrl: row.logo_url || undefined,
    posterUrl: row.poster_url || undefined,
    logoBg: row.logo_bg || undefined,
    accentGradient: row.accent_gradient || undefined,
    badgeColor: row.badge_color || undefined,
    createdAt: row.created_at,
  };
}

function partnerToRow(p: PartnerEvent) {
  return {
    id: p.id,
    name: p.name,
    official_title: p.officialTitle,
    category: p.category,
    category_label: p.categoryLabel,
    collab_type: p.collabType,
    date_or_year: p.dateOrYear,
    location: p.location,
    venue: p.venue,
    tagline: p.tagline,
    desc_text: p.desc,
    highlights: p.highlights || [],
    impact_badge: p.impactBadge,
    logo_url: p.logoUrl || null,
    poster_url: p.posterUrl || null,
    logo_bg: p.logoBg || null,
    accent_gradient: p.accentGradient || null,
    badge_color: p.badgeColor || null,
  };
}

let isSyncing = false;
export async function syncPartnersFromCloud(): Promise<PartnerEvent[]> {
  if (isSyncing) return getPartners();
  isSyncing = true;
  try {
    const { data, error } = await supabase
      .from('partner_events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch partners from Supabase:', error);
      return getPartners();
    }

    if (Array.isArray(data) && data.length > 0) {
      const items = data.map(rowToPartner);
      const currentRaw = localStorage.getItem(PARTNERS_STORAGE_KEY);
      const newRaw = JSON.stringify(items);
      if (currentRaw !== newRaw) {
        localStorage.setItem(PARTNERS_STORAGE_KEY, newRaw);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('dcm_partners_updated'));
        }
      }
      return items;
    }
  } catch (err) {
    console.error('Error syncing partners from cloud:', err);
  } finally {
    isSyncing = false;
  }
  return getPartners();
}

export function getPartners(): PartnerEvent[] {
  try {
    const raw = localStorage.getItem(PARTNERS_STORAGE_KEY);
    if (!raw) {
      return INITIAL_PARTNERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return INITIAL_PARTNERS;
    }
    return parsed
      .filter((p): p is PartnerEvent => Boolean(p && typeof p === 'object' && p.id))
      .map((p) => ({
        id: String(p.id),
        name: String(p.name || 'Event Partner'),
        officialTitle: String(p.officialTitle || p.name || ''),
        category: (p.category as PartnerCategory) || 'sport',
        categoryLabel: String(p.categoryLabel || 'Event Partnership'),
        collabType: String(p.collabType || 'Official Media Partner'),
        dateOrYear: String(p.dateOrYear || ''),
        location: String(p.location || 'Kota Malang'),
        venue: String(p.venue || ''),
        tagline: String(p.tagline || ''),
        desc: String(p.desc || ''),
        highlights: Array.isArray(p.highlights) ? p.highlights : [],
        impactBadge: String(p.impactBadge || 'Official Partner'),
        logoUrl: p.logoUrl || undefined,
        posterUrl: p.posterUrl || undefined,
        logoBg: p.logoBg || undefined,
        accentGradient: p.accentGradient || undefined,
        badgeColor: p.badgeColor || undefined,
        createdAt: p.createdAt || new Date().toISOString(),
      }));
  } catch {
    return INITIAL_PARTNERS;
  }
}

export function savePartners(items: PartnerEvent[]): void {
  try {
    localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(items));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('dcm_partners_updated'));
    }
  } catch (e) {
    console.error('Failed to save partners:', e);
  }
}

export function addPartner(
  partner: Omit<PartnerEvent, 'id' | 'createdAt'>
): PartnerEvent[] {
  const current = getPartners();
  const slug = partner.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const newPartner: PartnerEvent = {
    ...partner,
    id: `partner-${slug || Date.now()}-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString(),
  };

  const updated = [newPartner, ...current];
  savePartners(updated);

  // Push to Supabase cloud
  supabase
    .from('partner_events')
    .insert([partnerToRow(newPartner)])
    .then(({ error }) => {
      if (error) console.error('Supabase add partner error:', error);
    });

  return updated;
}

export function updatePartner(
  id: string,
  updatedData: Partial<PartnerEvent>
): PartnerEvent[] {
  const current = getPartners();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updatedData } : item));
  savePartners(updated);

  // Push to Supabase cloud
  const target = updated.find((i) => i.id === id);
  if (target) {
    supabase
      .from('partner_events')
      .update(partnerToRow(target))
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.error('Supabase update partner error:', error);
      });
  }

  return updated;
}

export function deletePartner(id: string): PartnerEvent[] {
  const current = getPartners();
  const updated = current.filter((item) => item.id !== id);
  savePartners(updated);

  // Delete from Supabase cloud
  supabase
    .from('partner_events')
    .delete()
    .eq('id', id)
    .then(({ error }) => {
      if (error) console.error('Supabase delete partner error:', error);
    });

  return updated;
}
