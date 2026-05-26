module.exports = function(eleventyConfig) {
  // 1. PASSTHROUGH COPY: 
  // Memerintahkan Eleventy untuk menyalin file CSS dan JS 
  // langsung ke folder '_site' tanpa mengubah isinya.
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  
  // (Opsional) Jika nanti kamu punya folder gambar lokal bernama 'assets' di dalam 'src'
  // eleventyConfig.addPassthroughCopy("src/assets");

  return {
    // 2. KONFIGURASI DIREKTORI (FOLDER)
    dir: {
      input: "src",         // Menetapkan 'src' sebagai dapur/sumber utama file HTML
      output: "_site",      // Menetapkan '_site' sebagai folder hasil akhir (build)
      includes: "_includes" // Menetapkan folder tempat partials (header.html) berada
    },
    
    // 3. MESIN TEMPLATE
    // Memastikan file HTML standar diproses menggunakan bahasa Nunjucks / Liquid 
    // agar tag seperti {% include %} bisa berfungsi.
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};