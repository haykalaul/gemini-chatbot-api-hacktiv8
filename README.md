# Gemini Chatbot API (Frontend + Backend)

Deskripsi singkat  
Gemini Chatbot API adalah contoh proyek sederhana yang menyatukan backend Node.js (menggunakan library Google Generative AI) dan frontend web statis untuk membuat antarmuka chat. Backend mengekspose endpoint `/api/chat` yang memanggil model Gemini dan frontend di `public/` menyediakan UI chat.

Daftar file penting
- [index.js](index.js)
- [package.json](package.json)
- [.env](.env)
- [.gitignore](.gitignore)
- [public/index.html](public/index.html)
- [public/script.js](public/script.js)
- [public/style.css](public/style.css)

Ringkasan teknis
- Backend menggunakan [`GoogleGenerativeAI`](index.js) untuk membuat instance (`[`genAI`](index.js)`) dan mengambil model (`[`model`](index.js)`).
- Endpoint chat terdaftar di [`app.post('/api/chat', ...)`](index.js) yang menerima pesan user dan memanggil [`model.generateContent`](index.js).
- Frontend memiliki dua fungsi utama: [`appendMessage`](public/script.js) untuk menambahkan pesan ke chat dan [`typeMessage`](public/script.js) untuk efek pengetikan.

Cara menyiapkan proyek (singkat)
1. Clone atau tempatkan proyek di mesin Anda (workspace saat ini).
2. Install dependensi:
    ```sh
    npm install
    ```
3. Buat file `.env` di root proyek dan tambahkan API key Gemini Anda:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```
   (Kode env dibaca lewat [process.env.GEMINI_API_KEY](http://_vscodecontentref_/0) di index.js)
4. Jalankan server:
    ```sh
    node index.js
    ```
   Server akan berjalan di http://localhost:3000 sesuai pengaturan [PORT](http://_vscodecontentref_/1) di [index.js](http://_vscodecontentref_/2).

Cara menggunakan
- Buka browser ke http://localhost:3000 — halaman UI ada di [index.html](http://_vscodecontentref_/3).
- Ketik pesan dan kirim; frontend akan memanggil endpoint `/api/chat` (lihat public/script.js).

Catatan penting
- Pastikan API key valid dan memiliki akses ke model yang dipakai (`models/gemini-2.0-flash`) sebagaimana dipanggil oleh [genAI.getGenerativeModel(...)](http://_vscodecontentref_/4).
- Error handling dasar ada di [index.js](http://_vscodecontentref_/5) dan [script.js](http://_vscodecontentref_/6); periksa log server jika request gagal.
- Paket utama yang dipakai tercantum di [package.json](http://_vscodecontentref_/7): `@google/generative-ai`, [express](http://_vscodecontentref_/8), [dotenv](http://_vscodecontentref_/9), [cors](http://_vscodecontentref_/10).

Referensi cepat ke kode
- Inisialisasi AI: [GoogleGenerativeAI](http://_vscodecontentref_/11) / [genAI](http://_vscodecontentref_/12)
- Pemanggilan model: [model.generateContent](http://_vscodecontentref_/13)
- Endpoint chat: [app.post('/api/chat', ...)](http://_vscodecontentref_/14)
- Frontend: fungsi [appendMessage](http://_vscodecontentref_/15) dan [typeMessage](http://_vscodecontentref_/16)
- Halaman UI: [index.html](http://_vscodecontentref_/17) dan gaya di [style.css](http://_vscodecontentref_/18)

Lisensi & pengembangan
Proyek ini adalah contoh sederhana. Modifikasi