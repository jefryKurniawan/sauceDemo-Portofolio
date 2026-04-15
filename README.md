# 🧪 Portfolio SDET - SauceDemo Automated Testing

[![CI/CD](https://github.com/jefryKurniawan/sauceDemo-Portofolio/actions/workflows/ci.yml/badge.svg)](https://github.com/jefryKurniawan/sauceDemo-Portofolio/actions)

> Proyek ini dibuat sebagai portfolio belajar **SDET (Software Development Engineer in Test)** untuk pemula.  
> Fokus pada pengujian otomatis website [SauceDemo](https://www.saucedemo.com) menggunakan **Playwright**, **K6**, dan **CI/CD**.  
> Dibuat sederhana, ringan, dan mudah dipahami oleh recruiter maupun developer lain.

---

## 🛠️ Tech Stack

| Tools              | Versi                             | Kegunaan                      |
| ------------------ | --------------------------------- | ----------------------------- |
| **Node.js**        | 22.22.1                           | Runtime JavaScript            |
| **Playwright**     | 1.59.1 (ESM)                      | UI & Security Testing         |
| **Browser**        | Firefox (Mobile Viewport 390x844) | Target testing                |
| **K6**             | Latest                            | Performance / Load Testing    |
| **GitHub Actions** | -                                 | CI/CD Pipeline otomatis       |
| **Podman**         | -                                 | Container (Docker-compatible) |

```

## 📁 Struktur Proyek
saucedemo-portfolio/
├── tests/
│ ├── smoke/ # Test dasar: Login valid & invalid
│ ├── functional/ # Test fitur: Tambah & hapus barang di cart
│ ├── regression/ # Test alur panjang: Checkout lengkap & cancel
│ └── security/ # Test keamanan: Simulasi SQL Injection
├── performance/ # Script load testing K6
├── .github/workflows/ # Pipeline CI/CD (GitHub Actions)
├── Containerfile # Konfigurasi container untuk Podman
├── playwright.config.js# Konfigurasi Playwright (Firefox, HTML Report, Mobile)
├── package.json # Dependencies & script perintah
└── README.md # Dokumentasi proyek
```

## 📋 Penjelasan Jenis Test

| Kategori                | Tujuan                                                                                                                   | Contoh di Proyek                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| 🔥 **Smoke Test**       | Memastikan fitur paling dasar aplikasi berjalan. Jika gagal, aplikasi dianggap "rusak" dan tidak perlu lanjut test lain. | Login berhasil dengan `standard_user` & Login gagal dengan `locked_out_user`                                            |
| ⚙️ **Functional Test**  | Memastikan fitur spesifik bekerja sesuai harapan user.                                                                   | Menambah barang ke cart → badge cart berubah jadi `1` <br> Menghapus barang → badge cart hilang                         |
| 🔄 **Regression Test**  | Memastikan alur panjang tetap stabil & tidak merusak fitur lain setelah perubahan kode.                                  | Checkout lengkap (isi alamat → finish) <br> Batalkan checkout → kembali ke cart                                         |
| 🛡️ **Security Test**    | Mendeteksi celah keamanan sederhana pada input user.                                                                     | Simulasi SQL Injection (`' OR '1'='1`) di form login → harus tetap ditolak & tidak bocor info database                  |
| 📈 **Performance Test** | Mengukur kecepatan & stabilitas server saat menerima banyak request bersamaan.                                           | 5-10 virtual user mengakses halaman login & produk selama 1 menit. Threshold: response time < 5 detik, error rate < 50% |

---

## 🚀 Cara Menjalankan

### ✅ Prasyarat

- Node.js v22.22.1
- npm
- K6 (opsional, hanya untuk performance test)
- Podman Desktop (opsional, untuk testing via container)

### 📦 Instalasi

```bash
npm install
npx playwright install firefox
```

### ▶️ Jalankan Test

| Perintah                 | Keterangan                                      |
| ------------------------ | ----------------------------------------------- |
| `npm run test:all`       | Jalankan semua UI test (mode headless/otomatis) |
| `npm run test:ui:headed` | Jalankan test sambil melihat browser menyala    |
| `npm run perf`           | Jalankan performance test dengan K6             |
| `npm run report`         | Buka laporan HTML hasil test                    |

### 🐳 Jalankan via Container (Podman)

| Perintah                | Keterangan                       |
| ----------------------- | -------------------------------- |
| `npm run podman:build`  | Build image container            |
| `npm run podman:test`   | Jalankan test di dalam container |
| `npm run podman:report` | Buka report dari container       |

## 📊 Reporting

Proyek ini menggunakan **HTML Reporter bawaan Playwright** (tanpa Allure atau tools tambahan).

### Fitur Report:

- ✅ Status test (Passed/Failed/Skipped)
- ⏱️ Durasi eksekusi per test
- 📸 Screenshot otomatis saat test gagal
- 🎥 Video recording (jika diaktifkan)
- 🔗 Bisa dibuka langsung di browser: `npx playwright show-report`

## 📈 Hasil Performance Test (K6)

**Skenario Test:**

| Parameter       | Nilai                                        |
| --------------- | -------------------------------------------- |
| 🎯 Target       | `https://www.saucedemo.com` (halaman publik) |
| 👥 Virtual User | 1 → 5 → 0 (ramp up/down)                     |
| ⏱️ Durasi       | 1 menit total                                |
| 🧪 Checks       | "Home page accessible" (status 200)          |

### ✅ Hasil Eksekusi

| Metric            | Nilai        | Status       |
| ----------------- | ------------ | ------------ |
| Total Requests    | 88           | ✅           |
| Error Rate        | 0.00%        | ✅ < 50%     |
| Avg Response Time | 37.38 ms     | ✅           |
| p95 Response Time | 43.47 ms     | ✅ < 5000 ms |
| Throughput        | 1.43 req/s   | ✅           |
| Checks Passed     | 100% (88/88) | ✅           |

## 📊 Interpretasi

- Server SauceDemo sangat responsif untuk beban ringan (≤5 user bersamaan)
- Tidak ada request yang gagal → aplikasi stabil
- Response time < 50ms untuk 95% user → pengalaman user sangat baik

---

## 🤖 CI/CD (GitHub Actions)

Pipeline otomatis berjalan setiap kali ada **push** atau **pull request** ke branch `main`/`master`.

### Alur Pipeline:

- 📥 Checkout kode dari repository
- 🟢 Setup Node.js 22.22.1
- 📦 Install dependencies & browser Firefox saja (`--with-deps`)
- 🧪 Jalankan Playwright test → upload HTML report sebagai artifact
- 📈 Jalankan K6 performance test (hanya di push ke `main`)

### 🔧 Challenges & Solutions (CI/CD Learnings):

| **Kendala**                                 | **Solusi**                                             | **Learning**                              |
| ------------------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| ❌ `grafana/k6-action@v0.3.1` deprecated    | ✅ Ganti manual install pakai `curl`                   | Gunakan official binary untuk reliability |
| ❌ Action cari `test.js` (bukan path benar) | ✅ Explicit specify: `k6 run performance/load-test.js` | Selalu check default values               |
| ❌ YAML indentation tidak konsisten         | ✅ Gunakan 2 spasi per level                           | YAML sensitif terhadap whitespace         |
| ❌ Docker mount issue                       | ✅ Install binary ke `/usr/local/bin`                  | Hindari complexity jika ada cara simple   |

---

## 📚 Documentation

📋 [View Detailed Test Cases & Execution Report →](./TEST_CASES.md)

---

---

## 👨‍💻 Dibuat Oleh

**Jefry Kurniawan**  
📧 [kjefry525@gmail.com](mailto:kjefry525@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/jefry-kurniawan-7443272aa/) | [GitHub](https://github.com/jefryKurniawan)

---
