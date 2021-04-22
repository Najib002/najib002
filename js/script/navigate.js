document.addEventListener("DOMContentLoaded", function() {
    //Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    
    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                if(this.status != 200) return;

                //Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                //Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        //Tutup sidenav
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        //Muat konten halaman yang dipanggil 
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "navigate.html", true);
        xhttp.send();
    }


    // Load page content
    let page = window.location.hash.substr(1);
    if(page === "") page = "home";
    loadPage(page);

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                const content = document.querySelector(".body-content");
                if(this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    if(page==="" || page==="home") {
                        getCompetition();
                    } else if(page==="favorite"){
                        getSavedCompetitions();
                    } else if(page==="scores") {
                        getMatches();
                    } else if(page==="teams") {
                        getTeams();
                    }
                } else if(this.status === 404) {
                    content.innerHTML = "<h4 class='center'>Whoopsie... Halaman tidak ditemukan.</h4>";
                } else {
                    content.innerHTML = "<h4>Whoopsie, Halaman tidak dapat diakses.</h4>";
                }
            }
        };
        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    }
});
