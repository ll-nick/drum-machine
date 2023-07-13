function capitalizeFirstLetterOfEachWord(string) {
    let words = string.split(' ')
    let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    return capitalizedWords.join(' ')
}

function displayName(el) {
    let text = el.attr('id')
        .replace(/-/g, ' ') // Replace hyphens with space 
        .replace(/(\d+)/g, ' $1 '); // Add space before numbers
    text = capitalizeFirstLetterOfEachWord(text);
    $('#display')[0].textContent = text;
}

async function activateThenDeactivate(el) {
    displayName(el)

    el.css("background-color", "#fb8500")
    await new Promise(r => setTimeout(r, 400));

    el.css("background-color", "#219ebc")
    await new Promise(r => setTimeout(r, 1000));
    $('#display')[0].textContent = ''
}


$(document).ready(function () {
    $('.drum-pad').click(function () {
        let audioElement = $(this).children('audio');
        audioElement[0].play();
        activateThenDeactivate(audioElement.parent());
    });

    document.addEventListener('keydown', function (event) {
        let audioIds = $('audio').map(function () {
            return this.id;
        }).get();
        for (let i in audioIds) {
            let id = audioIds[i]

            if (event.key === id.toUpperCase() || event.key === id.toLocaleLowerCase()) {
                let drumPad = $('#' + id).parent();
                drumPad.click();
            }
        }
        // Check for the specific key code or key value (e.g., 'q' key)

    });
});