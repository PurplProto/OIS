function addLogo() {
    const logoElements = document.getElementsByClassName("ois_logo_img");

    for (let i = 0; i < logoElements.length; i++) {
        logoElements[i].setAttribute("src", "../icons/ois_logo.png");
    }
}

window.onload = addLogo;
