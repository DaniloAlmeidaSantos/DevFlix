var gridheader = document.getElementsByClassName("grid_header");
var gridfooter = document.getElementsByClassName("grid_footer");
var gridmain = document.getElementsByClassName("grid_main");

export default window.tabpagePerson = function buttonPerson(){
    personIcon.classList.remove = ("personIcon");
    void personIcon.offsetWidth;
    personIcon.classList.add = ("personIcon");

    gridmain[0].style.gridRow = "1/6";

    gridheader[0].style.display = "none";
    gridheader[0].style.gridRow = "1";
    gridheader[0].style.gridColumn = "1";

    gridfooter[0].style.display = "none";
    gridfooter[0].style.gridRow = "1";
    gridfooter[0].style.gridColumn = "1";

    document.getElementById("containerMainSettings").style.display = "none";
    document.getElementById("containerMainHeadPhone").style.display = "none";
    document.getElementById("containerMainPerson").style.display = "block";
    document.getElementById("containerMainUser").style.display = "none";
    document.getElementById("containerMainPlaylist").style.display = "none";
}

window.tabpageHome = function buttonPerson(){
    personIcon.classList.remove = ("homeIcon");
    void personIcon.offsetWidth;
    personIcon.classList.add = ("homeIcon");

    gridmain[0].style.gridRow = "2/5";

    gridheader[0].style.display = "block";
    gridheader[0].style.gridRow = "1/2";
    gridheader[0].style.gridColumn = "3/6";

    gridfooter[0].style.display = "block";
    gridfooter[0].style.gridRow = "5/6";
    gridfooter[0].style.gridColumn = "3/6";

    document.getElementsByClassName("grid_footer")[0].style.display = "block";
    document.getElementById("containerMainSettings").style.display = "none";
    document.getElementById("containerMainHeadPhone").style.display = "none";
    document.getElementById("containerMainUser").style.display = "block";
    document.getElementById("containerMainPerson").style.display = "none";
    document.getElementById("containerMainPlaylist").style.display = "none";
}

window.tabpageHeadPhone = function buttonPerson(){
    headsetIcon.classList.remove = ("headsetIcon");
    void headsetIcon.offsetWidth;
    headsetIcon.classList.add = ("headsetIcon");

    gridmain[0].style.gridRow = "2/5";

    gridheader[0].style.display = "block";
    gridheader[0].style.gridRow = "1/2";
    gridheader[0].style.gridColumn = "3/6";

    gridfooter[0].style.display = "block";
    gridfooter[0].style.gridRow = "5/6";
    gridfooter[0].style.gridColumn = "3/6";

    document.getElementById("containerMainSettings").style.display = "none";
    document.getElementById("containerMainHeadPhone").style.display = "block";
    document.getElementById("containerMainUser").style.display = "none";
    document.getElementById("containerMainPerson").style.display = "none";
    document.getElementById("containerMainPlaylist").style.display = "none";
}

window.tabpagePlaylist = function buttonPerson(){
    queue_musicIcon.classList.remove = ("queue_musicIcon");
    void queue_musicIcon.offsetWidth;
    queue_musicIcon.classList.add = ("queue_musicIcon");

    gridmain[0].style.gridRow = "2/5";

    gridheader[0].style.display = "block";
    gridheader[0].style.gridRow = "1/2";
    gridheader[0].style.gridColumn = "3/6";

    gridfooter[0].style.display = "block";
    gridfooter[0].style.gridRow = "5/6";
    gridfooter[0].style.gridColumn = "3/6";

    document.getElementById("containerMainSettings").style.display = "none";
    document.getElementById("containerMainHeadPhone").style.display = "none";
    document.getElementById("containerMainUser").style.display = "none";
    document.getElementById("containerMainPerson").style.display = "none";
    document.getElementById("containerMainPlaylist").style.display = "block";
}

window.tabpageSettings = function buttonPerson(){
    settingsIcon.classList.remove = ("settingsIcon");
    void settingsIcon.offsetWidth;
    settingsIcon.classList.add = ("settingsIcon");

    gridmain[0].style.gridRow = "2/5";
    
    gridheader[0].style.display = "block";
    gridheader[0].style.gridRow = "1/2";
    gridheader[0].style.gridColumn = "3/6";

    gridfooter[0].style.display = "block";
    gridfooter[0].style.gridRow = "5/6";
    gridfooter[0].style.gridColumn = "3/6";

    document.getElementById("containerMainSettings").style.display = "block";
    document.getElementById("containerMainHeadPhone").style.display = "none";
    document.getElementById("containerMainUser").style.display = "none";
    document.getElementById("containerMainPerson").style.display = "none";
    document.getElementById("containerMainPlaylist").style.display = "none";
}

window.showPlaylistModal = function buttonshowModalPL(){
    document.getElementsByClassName("modalMainPerson")[0].style.display = "initial";
}

window.closePlaylistModal = function buttoncloseModalPL(){
    document.getElementsByClassName("modalMainPerson")[0].style.display = "none";
}

window.btnshowModalPodcast = function buttoncloseModalPoC(){
    document.getElementsByClassName("modalMainPersonConfirm")[0].style.display = "initial";
}

window.closePodCastModal = function buttoncloseModalPL(){
    document.getElementsByClassName("modalMainPersonConfirm")[0].style.display = "none";
}






