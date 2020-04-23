const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading'); 
const tweetsElement = document.querySelector('.tweets');
const game = document.querySelector("iframe");
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/tweets' : 'https://twitter-clone-two.now.sh/tweets';

var username = "BlankUserName";

loadingElement.style.display = '';
game.style.display = 'none';
tweetsElement.style.display = 'none';
listAllTweets();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    username = formData.get('name');

    form.style.display = 'none';
    game.style.display = '';
    tweetsElement.style.display = '';
}); 

game.onload = function(){
    console.log(game.contentDocument.querySelector(".score"));

    game.contentDocument.querySelector(".score").addEventListener("died", (event) => {
        event.preventDefault();
        
        const name = username;
        const content = event.detail;

        const tweet = {
            name, 
            content
        }

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(tweet),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
          .then(createdTweet => {
            form.reset();
            listAllTweets();
        });
    });
};

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const formData = new FormData(form);
//     const name = formData.get('name');
//     const content = formData.get('content');

//     const tweet = {
//         name, 
//         content
//     }

//     form.style.display = 'none';
//     loadingElement.style.display = '';

//     fetch(API_URL, {
//         method: 'POST',
//         body: JSON.stringify(tweet),
//         headers: {
//             'content-type': 'application/json'
//         }
//     }).then(response => response.json())
//       .then(createdTweet => {
//         form.reset();
//         loadingElement.style.display = 'none';
//         form.style.display = '';
//         listAllTweets();
//       });
// }); 

function listAllTweets(){
    tweetsElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(tweets => {
            tweets.reverse();
            tweets.forEach(tweet => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = tweet.name;

                const contents = document.createElement('p');
                contents.textContent = tweet.content;

                const date = document.createElement('small');
                date.textContent = new Date(tweet.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                tweetsElement.appendChild(div);
            });
        });

        loadingElement.style.display = 'none';
}