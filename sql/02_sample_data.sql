-- =============================================
-- SAMPLE DATA INSERT
-- NasDem Admin Panel - DPD Sidoarjo
-- =============================================

-- =============================================
-- INSERT DAPILS
-- =============================================
INSERT INTO dapils (id, name, regions, description) VALUES
(1, 'Dapil 1', '["Sidoarjo", "Buduran", "Sedati", "Sukodono"]', 'Daerah Pemilihan 1 meliputi wilayah Sidoarjo bagian utara'),
(2, 'Dapil 2', '["Gedangan", "Taman", "Waru", "Wonoayu"]', 'Daerah Pemilihan 2 meliputi wilayah Sidoarjo bagian timur'),
(3, 'Dapil 3', '["Krian", "Balongbendo", "Tulangan", "Tanggulangin"]', 'Daerah Pemilihan 3 meliputi wilayah Sidoarjo bagian selatan'),
(4, 'Dapil 4', '["Porong", "Krembung", "Jabon", "Prambon"]', 'Daerah Pemilihan 4 meliputi wilayah Sidoarjo bagian barat'),
(5, 'Dapil 5', '["Candi", "Tarik", "Prambon"]', 'Daerah Pemilihan 5 meliputi wilayah Sidoarjo bagian tengah'),
(6, 'Dapil 6', '["Balong Bendo", "Krembung", "Porong"]', 'Daerah Pemilihan 6 meliputi wilayah Sidoarjo bagian barat daya');

-- =============================================
-- INSERT ALBUMS
-- =============================================
INSERT INTO albums (id, name, description, sort_order) VALUES
('album-001', 'Kegiatan Partai', 'Dokumentasi kegiatan resmi partai', 1),
('album-002', 'Rapat Koordinasi', 'Foto-foto rapat koordinasi DPD', 2),
('album-003', 'Bakti Sosial', 'Kegiatan bakti sosial dan pengabdian masyarakat', 3),
('album-004', 'Sosialisasi Program', 'Dokumentasi sosialisasi program partai', 4),
('album-005', 'Pengurus', 'Foto resmi pengurus DPD dan struktur organisasi', 5);

-- =============================================
-- INSERT PERSONS
-- =============================================
INSERT INTO persons (id, full_name, phone, email, instagram, x_twitter, linkedin) VALUES
('person-001', 'Dr. H. Ahmad Mulyadi, S.H., M.H.', '081234567001', 'ahmad.mulyadi@nasdemsidoarjo.id', '@ahmadmulyadi_official', '@ahmadmulyadi', 'ahmad-mulyadi'),
('person-002', 'Hj. Siti Fatimah, S.E., M.M.', '081234567002', 'siti.fatimah@nasdemsidoarjo.id', '@sitifatimah_dpd', '@sitifatimah', 'siti-fatimah'),
('person-003', 'Ir. Bambang Sutrisno, M.T.', '081234567003', 'bambang.sutrisno@nasdemsidoarjo.id', '@bambangsutrisno', '@bambangsutrisno', 'bambang-sutrisno'),
('person-004', 'Dr. Ratna Sari, S.Sos., M.Si.', '081234567004', 'ratna.sari@nasdemsidoarjo.id', '@ratnasari_dpd', '@ratnasari', 'ratna-sari'),
('person-005', 'H. Dodi Prasetyo, S.H.', '081234567005', 'dodi.prasetyo@nasdemsidoarjo.id', '@dodiprasetyo', '@dodiprasetyo', 'dodi-prasetyo'),
('person-006', 'Hj. Indira Sari, S.Pd., M.Pd.', '081234567006', 'indira.sari@nasdemsidoarjo.id', '@indirasari_edu', '@indirasari', 'indira-sari'),
('person-007', 'Dr. Agus Hermawan, S.E., M.M.', '081234567007', 'agus.hermawan@nasdemsidoarjo.id', '@agushermawan', '@agushermawan', 'agus-hermawan'),
('person-008', 'Hj. Maya Sari, S.Sos.', '081234567008', 'maya.sari@nasdemsidoarjo.id', '@mayasari_dpd', '@mayasari', 'maya-sari'),
('person-009', 'H. Rudi Hartono, S.T.', '081234567009', 'rudi.hartono@nasdemsidoarjo.id', '@rudihartono', '@rudihartono', 'rudi-hartono'),
('person-010', 'Dr. Eka Fitriani, S.Psi., M.Psi.', '081234567010', 'eka.fitriani@nasdemsidoarjo.id', '@ekafitriani', '@ekafitriani', 'eka-fitriani'),
('person-011', 'H. Budi Santoso, S.Ag., M.A.', '081234567011', 'budi.santoso@nasdemsidoarjo.id', '@budisantoso', '@budisantoso', 'budi-santoso'),
('person-012', 'Hj. Dewi Kusuma, S.H., M.H.', '081234567012', 'dewi.kusuma@nasdemsidoarjo.id', '@dewikusuma', '@dewikusuma', 'dewi-kusuma'),
('person-013', 'Dr. Hendro Wibowo, S.Kom., M.T.', '081234567013', 'hendro.wibowo@nasdemsidoarjo.id', '@hendrowibowo', '@hendrowibowo', 'hendro-wibowo'),
('person-014', 'Hj. Rina Kartika, S.E.', '081234567014', 'rina.kartika@nasdemsidoarjo.id', '@rinakartika', '@rinakartika', 'rina-kartika'),
('person-015', 'H. Joko Susilo, S.I.P., M.A.P.', '081234567015', 'joko.susilo@nasdemsidoarjo.id', '@jokosusilo', '@jokosusilo', 'joko-susilo');

-- Update dapils with PIC assignments
UPDATE dapils SET pic_person_id = 'person-001' WHERE id = 1;
UPDATE dapils SET pic_person_id = 'person-002' WHERE id = 2;
UPDATE dapils SET pic_person_id = 'person-003' WHERE id = 3;
UPDATE dapils SET pic_person_id = 'person-004' WHERE id = 4;
UPDATE dapils SET pic_person_id = 'person-005' WHERE id = 5;
UPDATE dapils SET pic_person_id = 'person-006' WHERE id = 6;

-- =============================================
-- INSERT ROLE ENTRIES (Struktur Organisasi)
-- =============================================

-- DPD Structure
INSERT INTO role_entries (id, unit, position_title, person_id, sort_order, group_name) VALUES
('role-001', 'DPD', 'Ketua DPD', 'person-001', 1, 'Pimpinan'),
('role-002', 'DPD', 'Wakil Ketua DPD', 'person-002', 2, 'Pimpinan'),
('role-003', 'DPD', 'Sekretaris DPD', 'person-003', 3, 'Pimpinan'),
('role-004', 'DPD', 'Wakil Sekretaris DPD', 'person-004', 4, 'Pimpinan'),
('role-005', 'DPD', 'Bendahara DPD', 'person-005', 5, 'Pimpinan'),
('role-006', 'DPD', 'Wakil Bendahara DPD', 'person-006', 6, 'Pimpinan'),
('role-007', 'DPD', 'Ketua Bidang Organisasi', 'person-007', 7, 'Bidang'),
('role-008', 'DPD', 'Ketua Bidang Politik dan Hukum', 'person-008', 8, 'Bidang'),
('role-009', 'DPD', 'Ketua Bidang Sosial Ekonomi', 'person-009', 9, 'Bidang'),
('role-010', 'DPD', 'Ketua Bidang Pemberdayaan Masyarakat', 'person-010', 10, 'Bidang');

-- SAYAP Structure (Organisasi Sayap)
INSERT INTO role_entries (id, unit, position_title, person_id, sort_order, group_name) VALUES
('role-011', 'SAYAP', 'Ketua Nasdem Muda', 'person-011', 1, 'Nasdem Muda'),
('role-012', 'SAYAP', 'Ketua Nasdem Perempuan', 'person-012', 2, 'Nasdem Perempuan'),
('role-013', 'SAYAP', 'Ketua Nasdem Wirausaha', 'person-013', 3, 'Nasdem Wirausaha'),
('role-014', 'SAYAP', 'Ketua Nasdem Cendekia', 'person-014', 4, 'Nasdem Cendekia'),
('role-015', 'SAYAP', 'Ketua Nasdem Keluarga', 'person-015', 5, 'Nasdem Keluarga');

-- DPC Structure (sample for some kecamatan)
INSERT INTO role_entries (id, unit, area, position_title, person_id, sort_order, group_name) VALUES
('role-016', 'DPC', 'Sidoarjo', 'Ketua DPC Sidoarjo', 'person-001', 1, 'Kecamatan'),
('role-017', 'DPC', 'Buduran', 'Ketua DPC Buduran', 'person-002', 2, 'Kecamatan'),
('role-018', 'DPC', 'Gedangan', 'Ketua DPC Gedangan', 'person-003', 3, 'Kecamatan'),
('role-019', 'DPC', 'Taman', 'Ketua DPC Taman', 'person-004', 4, 'Kecamatan'),
('role-020', 'DPC', 'Waru', 'Ketua DPC Waru', 'person-005', 5, 'Kecamatan');

-- DPRT Structure (sample for some desa)
INSERT INTO role_entries (id, unit, area, position_title, person_id, sort_order, group_name) VALUES
('role-021', 'DPRT', 'Sidoarjo Kota', 'Ketua DPRT Sidoarjo Kota', 'person-006', 1, 'Kelurahan'),
('role-022', 'DPRT', 'Cemengkalang', 'Ketua DPRT Cemengkalang', 'person-007', 2, 'Kelurahan'),
('role-023', 'DPRT', 'Pucang', 'Ketua DPRT Pucang', 'person-008', 3, 'Kelurahan'),
('role-024', 'DPRT', 'Bulusidokare', 'Ketua DPRT Bulusidokare', 'person-009', 4, 'Kelurahan'),
('role-025', 'DPRT', 'Lemahputro', 'Ketua DPRT Lemahputro', 'person-010', 5, 'Kelurahan');

-- =============================================
-- INSERT SAMPLE NEWS
-- =============================================
INSERT INTO news (id, title, slug, summary, content, status, author, pinned, published_at) VALUES
('news-001', 'Program Pembangunan Infrastruktur Sidoarjo 2024', 'program-pembangunan-infrastruktur-sidoarjo-2024', 'Rencana pembangunan infrastruktur untuk mendukung kemajuan Kabupaten Sidoarjo', 
'<p>DPD Partai NasDem Kabupaten Sidoarjo menyambut baik rencana pembangunan infrastruktur yang dicanangkan pemerintah daerah untuk tahun 2024. Program ini mencakup pembangunan jalan, jembatan, dan fasilitas publik yang akan meningkatkan kualitas hidup masyarakat Sidoarjo.</p>

<p>Ketua DPD NasDem Sidoarjo menekankan pentingnya sinergi antara pemerintah dan partai politik dalam mewujudkan pembangunan yang berkelanjutan. "Kami siap mendukung setiap program yang berpihak pada kepentingan rakyat," ujar beliau.</p>

<p>Program prioritas meliputi:</p>
<ul>
<li>Pembangunan jalan penghubung antar kecamatan</li>
<li>Renovasi fasilitas pendidikan dan kesehatan</li>
<li>Peningkatan sistem drainase</li>
<li>Pembangunan ruang terbuka hijau</li>
</ul>', 
'PUBLISHED', 'Editor User', TRUE, '2024-01-15 10:00:00'),

('news-002', 'Rapat Koordinasi DPD Partai NasDem Januari 2024', 'rapat-koordinasi-dpd-januari-2024', 'Koordinasi program kerja dan evaluasi tahun sebelumnya',
'<p>DPD Partai NasDem Kabupaten Sidoarjo menggelar rapat koordinasi bulanan pada Januari 2024 untuk membahas program kerja dan evaluasi kinerja tahun sebelumnya. Rapat dipimpin oleh Ketua DPD dan dihadiri seluruh pengurus serta perwakilan DPC se-Kabupaten Sidoarjo.</p>

<p>Dalam rapat tersebut, dibahas berbagai agenda penting termasuk:</p>
<ul>
<li>Evaluasi program kerja 2023</li>
<li>Penyusunan program kerja 2024</li>
<li>Koordinasi dengan DPC dan DPRT</li>
<li>Strategi komunikasi politik</li>
</ul>

<p>Ketua DPD menekankan pentingnya konsolidasi internal untuk memperkuat organisasi partai di tingkat grassroot.</p>', 
'PUBLISHED', 'Writer User', FALSE, '2024-01-10 14:00:00'),

('news-003', 'Sosialisasi Program Pendidikan Gratis', 'sosialisasi-program-pendidikan-gratis', 'Program bantuan pendidikan untuk masyarakat kurang mampu',
'<p>DPD Partai NasDem Sidoarjo menyelenggarakan sosialisasi program pendidikan gratis sebagai bentuk kepedulian terhadap pendidikan anak-anak dari keluarga kurang mampu. Program ini merupakan bagian dari komitmen partai untuk mencerdaskan kehidupan bangsa.</p>

<p>Program ini meliputi:</p>
<ul>
<li>Beasiswa pendidikan untuk siswa berprestasi</li>
<li>Bantuan perlengkapan sekolah</li>
<li>Program bimbingan belajar gratis</li>
<li>Pelatihan keterampilan untuk orang tua</li>
</ul>

<p>Sosialisasi dilakukan di berbagai kecamatan dengan melibatkan tokoh masyarakat dan pengurus DPC setempat.</p>', 
'DRAFT', 'Media Officer', FALSE, NULL),

('news-004', 'Kegiatan Bakti Sosial Ramadan 2024', 'bakti-sosial-ramadan-2024', 'Kegiatan berbagi untuk masyarakat kurang mampu',
'<p>Menyambut bulan suci Ramadan 2024, DPD Partai NasDem Kabupaten Sidoarjo mengadakan serangkaian kegiatan bakti sosial untuk masyarakat kurang mampu. Kegiatan ini merupakan wujud kepedulian sosial partai terhadap sesama.</p>

<p>Kegiatan meliputi:</p>
<ul>
<li>Pembagian paket sembako</li>
<li>Santunan anak yatim</li>
<li>Buka puasa bersama</li>
<li>Renovasi fasilitas ibadah</li>
</ul>

<p>Seluruh pengurus DPD, DPC, dan DPRT terlibat aktif dalam kegiatan ini untuk memastikan bantuan tepat sasaran.</p>', 
'SCHEDULED', 'Admin User', FALSE, '2024-03-15 07:00:00');

-- =============================================
-- INSERT NEWS TAGS
-- =============================================
INSERT INTO news_tags (news_id, tag_name) VALUES
('news-001', 'infrastruktur'),
('news-001', 'pembangunan'),
('news-001', 'sidoarjo'),
('news-002', 'rapat'),
('news-002', 'koordinasi'),
('news-002', 'dpd'),
('news-003', 'pendidikan'),
('news-003', 'sosialisasi'),
('news-003', 'bantuan'),
('news-004', 'bakti sosial'),
('news-004', 'ramadan'),
('news-004', 'masyarakat');

-- =============================================
-- INSERT SAMPLE MEDIA
-- =============================================
INSERT INTO media (id, title, alt_text, filename, original_filename, url, ratio, size_kb, mime_type, width, height, album_id, uploaded_by) VALUES
('media-001', 'Rapat Koordinasi DPD Januari', 'Foto rapat koordinasi DPD NasDem Sidoarjo', 'rapat-koordinasi-jan-2024.jpg', 'rapat_koordinasi_januari_2024.jpg', '/uploads/media/rapat-koordinasi-jan-2024.jpg', '16:9', 1256, 'image/jpeg', 1920, 1080, 'album-002', 'Media Officer'),
('media-002', 'Kegiatan Bakti Sosial', 'Pembagian sembako kepada masyarakat', 'bakti-sosial-2024.jpg', 'bakti_sosial_2024.jpg', '/uploads/media/bakti-sosial-2024.jpg', '16:9', 987, 'image/jpeg', 1920, 1080, 'album-003', 'Media Officer'),
('media-003', 'Sosialisasi Program Pendidikan', 'Sosialisasi program pendidikan gratis', 'sosialisasi-pendidikan.jpg', 'sosialisasi_pendidikan.jpg', '/uploads/media/sosialisasi-pendidikan.jpg', '16:9', 1123, 'image/jpeg', 1920, 1080, 'album-004', 'Media Officer'),
('media-004', 'Foto Pengurus DPD', 'Foto resmi pengurus DPD NasDem Sidoarjo', 'pengurus-dpd-2024.jpg', 'pengurus_dpd_2024.jpg', '/uploads/media/pengurus-dpd-2024.jpg', '16:9', 1456, 'image/jpeg', 1920, 1080, 'album-005', 'Media Officer'),
('media-005', 'Logo NasDem Sidoarjo', 'Logo resmi DPD NasDem Kabupaten Sidoarjo', 'logo-nasdem-sidoarjo.png', 'logo_nasdem_sidoarjo.png', '/uploads/media/logo-nasdem-sidoarjo.png', '1:1', 245, 'image/png', 512, 512, 'album-005', 'Media Officer');

-- Update album covers
UPDATE albums SET cover_media_id = 'media-002' WHERE id = 'album-002';
UPDATE albums SET cover_media_id = 'media-002' WHERE id = 'album-003';
UPDATE albums SET cover_media_id = 'media-003' WHERE id = 'album-004';
UPDATE albums SET cover_media_id = 'media-004' WHERE id = 'album-005';

-- =============================================
-- INSERT SAMPLE AUDIT LOGS
-- =============================================
INSERT INTO audit_logs (user_name, action, table_name, record_id, new_values, ip_address) VALUES
('Editor User', 'created', 'news', 'news-001', '{"title": "Program Pembangunan Infrastruktur Sidoarjo 2024", "status": "DRAFT"}', '192.168.1.100'),
('Editor User', 'published', 'news', 'news-001', '{"status": "PUBLISHED", "published_at": "2024-01-15T10:00:00Z"}', '192.168.1.100'),
('Editor User', 'pinned', 'news', 'news-001', '{"pinned": true}', '192.168.1.100'),
('Writer User', 'created', 'news', 'news-002', '{"title": "Rapat Koordinasi DPD Partai NasDem Januari 2024", "status": "DRAFT"}', '192.168.1.101'),
('Writer User', 'published', 'news', 'news-002', '{"status": "PUBLISHED", "published_at": "2024-01-10T14:00:00Z"}', '192.168.1.101'),
('Media Officer', 'uploaded', 'media', 'media-001', '{"filename": "rapat-koordinasi-jan-2024.jpg", "album_id": "album-002"}', '192.168.1.102');
