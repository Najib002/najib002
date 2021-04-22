document.addEventListener("DOMContentLoaded", function () {
    const item = getStandingsById();
    let save = document.getElementById("save");
    
    item.then(function(comp) {
        data = comp.competition;
        checkFavoriteCompetitions(data.id).then(function(favorite) {
            if (favorite) {
                isFavorited = true;
                save.innerHTML = `<i class="large material-icons">favorite</i>`;
            } else {
                isFavorited = false;
                save.innerHTML = `<i class="large material-icons">favorite_border</i>`;
                }
            });
    });
     
    save.onclick = function() {
        item.then(function (comp) {
            if (isFavorited === true) {
                deleteCompetitions(comp.competition.id);
                save.innerHTML = `<i class="large material-icons">favorite_border</i>`;
                console.log("Favorite dihapus");
                M.toast({ html: "Favorite telah dihapus" });
                isFavorited = false;
            } else {
                insertCompetitions(comp);
                save.innerHTML = `<i class="large material-icons">favorite</i>`;
                console.log("Favorite ditambah");
                M.toast({ html: "Favorite telah disimpan" });
                isFavorited = true;
            }
        });
    };
});