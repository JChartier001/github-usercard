/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/JChartier001')      
    .then(response => {
        console.log(response);
        createCard(response.data);
        })
    .catch(error => {
        console.log(error)
    });

const followersArray = [];

axios.get('https://api.github.com/users/JChartier001/followers')
    .then(response => {
        //going through response "array"
        response.data.forEach(async (githubUser) => {
            //setting userResponse to get usernames.  "await" sets interval.
            const userResponse = await axios.get(githubUser.url);
            console.log(userResponse)
           createCard(userResponse.data);
        })
        
    })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const entryPoint = document.querySelector('.cards');
function createCard(data) {

    //create elements
    const container = document.createElement('div');
    const img = document.createElement('img');
    const cardInfo = document.createElement('div');
    const name = document.createElement('h3');
    const userName = document.createElement("p");
    const location = document.createElement('p');
    const profile = document.createElement('p');
    const profileLink = document.createElement('a');
    const followers = document.createElement('p');
    const following = document.createElement('p');
    const bio = document.createElement('p');

    //adding class
    container.classList.add("card");
    cardInfo.classList.add("card-info");
    name.classList.add('name');
    userName.classList.add('username');

    //adding text
    img.src = data.avatar_url;
    name.textContent = data.name;
    userName.textContent = data.login;
    location.textContent = "Location:  " + data.location;
    profile.textContent = "Profile: ";
    profileLink.textContent = data.html_url;
    followers.textContent = "Followers " + data.followers;
    following.textContent = "Following " + data.following;
    bio.textContent = "Bio " + data.bio;

    //appending
    container.appendChild(img);
    container.appendChild(cardInfo);
    cardInfo.appendChild(name);
    cardInfo.appendChild(location);
    
    cardInfo.appendChild(profile);
    profile.appendChild(profileLink);
    cardInfo.appendChild(followers);
    cardInfo.appendChild(following);
    cardInfo.appendChild(bio);
    

    entryPoint.appendChild(container);
}
