document.addEventListener("DOMContentLoaded", () => {


    const $ = (id) => document.getElementById(id);
    const user = JSON.parse(localStorage.getItem("user"));

    
    const hamburger = $("hamburger");
    const navMenu = $("navMenu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }


    const authMenus = document.querySelectorAll(".auth");
    const loginMenu = $("loginMenu");
    const profileMenu = $("profileMenu");

    if (user && user.role === "admin") {
        authMenus.forEach(m => m.style.display = "block");
        if (loginMenu) loginMenu.style.display = "none";
        if (profileMenu) profileMenu.style.display = "block";
    } else {
        authMenus.forEach(m => m.style.display = "none");
        if (profileMenu) profileMenu.style.display = "none";
        if (loginMenu) loginMenu.style.display = "block";
    }


    if (profileMenu) {
        profileMenu.addEventListener("click", () => {
            profileMenu.classList.toggle("active");
        });
    }


    document.querySelectorAll("[data-logout]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Apakah Anda yakin ingin logout?")) {
                localStorage.removeItem("user");
                window.location.href = "login.html";
            }
        });
    });

    const protectedPages = ["transaksi.html", "profil.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage)) {
        if (!user || user.role !== "admin") {
            alert("Silakan login sebagai admin!");
            window.location.href = "login.html";
        }
    }

});
