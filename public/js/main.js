
const myAlert = (msg) => {
    window.alert(msg)
}

document.addEventListener("DOMContentLoaded", function (event) {
    // Main menu toggle
    var toggleOpen = document.getElementById('toggleOpen');
    var collapseMenu = document.getElementById('collapseMenu');

    toggleOpen.addEventListener("click", () => {
        toggleElement(collapseMenu);
    })

    function toggleElement(element) {
        if (element.classList.contains("showit")) {
            element.classList.remove("showit")
            element.classList.add("hideit");
        } else {
            element.classList.remove("hideit")
            element.classList.add("showit");
        }
    }
    
})