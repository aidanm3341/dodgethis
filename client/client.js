const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading'); 
const scoresElement = document.querySelector('.scores');
const game = document.querySelector("iframe");
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/tweets' : 'https://twitter-clone-two.now.sh/tweets';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const trophyImageNames = ["first.png", "second.png", "third.png"];

var username = "BlankUserName";

loadingElement.style.display = '';
game.style.display = 'none';
scoresElement.style.display = 'none';
listAllScores();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    username = formData.get('name');

    form.style.display = 'none';
    game.style.display = '';
    scoresElement.style.display = '';
}); 

game.onload = function(){
    game.contentDocument.querySelector(".score").addEventListener("died", (event) => {
        event.preventDefault();
        
        const name = username;
        const content = event.detail;

        const highscore = {
            name, 
            content
        }

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(highscore),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
          .then(createdScore => {
            form.reset();
            listAllScores();
        });
    });
};


function formatDate(date){
    var x;
    if(date.getHours() < 13)
        x = "am"
    else
        x = "pm"

    var hours = date.getHours();
    if(hours < 10)
        hours = "0" + hours;
    
    var minutes = date.getMinutes();
    if(minutes < 10)
        minutes = "0" + minutes;

    return date.getDate() + " " + months[date.getMonth()] + "  -  " + hours + ":" + minutes + x;
}

function listAllScores(){
    scoresElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(scores => {
            scores.sort((a, b) => {
                return b.content - a.content;
            });
            for (let i = 0; i < 3; i++) {
                const score = scores[i];

                const div = document.createElement('div');

                const header = document.createElement('h5');
                header.textContent = score.name + ' - ' + score.content;

                const image = document.createElement('img');
                image.src = trophyImageNames[i];

                div.appendChild(image);
                div.appendChild(header);
            

                scoresElement.appendChild(div);
            }
            for(let i=3; i < 30; i++){ //30 could be changed to however many scores you want to show
                const score = scores[i];

                const div = document.createElement('div');

                const header = document.createElement('h5');
                header.textContent = score.name + ' - ' + score.content;

                const date = document.createElement('small');
                date.textContent = formatDate(new Date(score.created));

                div.appendChild(header);

                scoresElement.appendChild(div);
            }
            // scores.forEach(score => {
            //     const div = document.createElement('div');

            //     const header = document.createElement('h5');
            //     header.textContent = score.name + ' - ' + score.content;

            //     // const contents = document.createElement('h5');
            //     // contents.textContent = score.content;

            //     const date = document.createElement('small');
            //     date.textContent = formatDate(new Date(score.created));

            //     div.appendChild(header);
            //     //div.appendChild(contents);
            //     //div.appendChild(date);

            //     scoresElement.appendChild(div);
            // });
        });

        loadingElement.style.display = 'none';
}