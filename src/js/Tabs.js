export default window.tabpagePerson = function buttonPerson(){
    personIcon.classList.remove = ("personIcon");
    void personIcon.offsetWidth;
    personIcon.classList.add = ("personIcon");
   
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

    document.getElementById("containerMainSettings").style.display = "block";
    document.getElementById("containerMainHeadPhone").style.display = "none";
    document.getElementById("containerMainUser").style.display = "none";
    document.getElementById("containerMainPerson").style.display = "none";
    document.getElementById("containerMainPlaylist").style.display = "none";
}







