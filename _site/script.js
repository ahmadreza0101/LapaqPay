// --- 1. SCRIPT ANTI-CLS (Dieksekusi Instan) ---
// Script ini diletakkan di luar DOMContentLoaded agar langsung berjalan 
// saat file JS ini dipanggil, meminimalisir kedipan (FOUC).
(function() {
    const sessionData = localStorage.getItem("user_session");
    const user = sessionData ? JSON.parse(sessionData) : null;
    
    if (user && user.role === "admin") {
        document.documentElement.classList.add("is-logged-in");
        document.documentElement.classList.remove("is-logged-out");
    } else {
        document.documentElement.classList.add("is-logged-out");
        document.documentElement.classList.remove("is-logged-in");
    }
})();

// --- 2. LOGIKA UTAMA (Dieksekusi setelah HTML selesai dirender) ---
document.addEventListener("DOMContentLoaded", () => {
    const $ = (id) => document.getElementById(id);
    
    const sessionData = localStorage.getItem("user_session");
    const user = sessionData ? JSON.parse(sessionData) : null;

    // --- A. Navigasi & Hamburger ---
    const hamburger = $("hamburger");
    const navMenu = $("navMenu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // --- B. Kontrol Menu Berdasarkan Login (Failsafe/Cadangan) ---
    // Logika ini dikembalikan untuk mencegah menu hilang jika CSS gagal memuat
    const authMenus = document.querySelectorAll(".auth");
    const loginMenu = $("loginMenu");
    const profileMenu = $("profileMenu");

    if (user && user.role === "admin") {
        // Tampilkan menu khusus admin
        authMenus.forEach(m => m.style.display = "block");
        if (loginMenu) loginMenu.style.display = "none";
        
        if (profileMenu) {
            profileMenu.style.display = "flex"; // Gunakan flex agar sejajar
            
            // Otomatis ubah foto default header menjadi foto Google
            const profileImg = $("profileImg");
            if (profileImg && user.picture) {
                profileImg.src = user.picture;
            }
        }
    } else {
        // Sembunyikan jika tidak login
        authMenus.forEach(m => m.style.display = "none");
        if (profileMenu) profileMenu.style.display = "none";
        if (loginMenu) loginMenu.style.display = "block";
    }

    // --- C. Fitur Logout ---
    const logoutBtn = document.getElementById("logoutBtn") || document.querySelector("[data-logout]");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Apakah Anda yakin ingin logout?")) {
                localStorage.removeItem("user_session");
                window.location.href = "/login/"; 
            }
        });
    }

    // --- D. Proteksi Halaman (Security Middleware) ---
    const path = window.location.pathname;

    if (path.includes("/transaksi") || path.includes("/profil")) {
        if (!user || user.role !== "admin") {
            alert("Akses ditolak! Silakan login sebagai admin.");
            window.location.href = "/login/";
        }
    }
});