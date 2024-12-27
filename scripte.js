// let data=[];
// async function getData(){
//     try {
//         const response=await fetch('http://localhost:3000/restaurants');
//     const data= await response.json();
//     console.log("fetched data",data);
//     update(data);

//     } catch (error) {
//         console.log('error fetching',error)
//     }
// }
// function update(restaurants) {
//     let boxs = document.querySelector(".boxs");
//     boxs.innerHTML = ""; 
//     for (let i = 0; i <restaurants.length; i++) {
//       const  box=document.createElement("div")
//       console.log(restaurants[i].nom)
//         box.innerHTML = `
//             <img class="imageRestaurant" src="${restaurants[i].cover}" alt="">
//             <h2 class="nomRestaurant" >${restaurants[i].nom}</h2>
//             <p class="specialiteRestaurant" >${restaurants[i].spécialité}</p>
          
//     <div class="rating">
//             ${createStarRating(restaurants[i].notation)}
//             <span class="rating-star">${restaurants[i].notation}</span>
//     </div>
//             <a class="lienRestaurant"  href="${restaurants[i].lien}">lien</a>
//             <button onclick="getDetail(${restaurants[i].id})">détails</button>
//         `;
//     boxs.appendChild(box);
//     }
// }
// getData();
// // Fonction pour gérer l'affichage des détails
// function getDetail(restaurantId) {
//     window.location.href = `detaile.html?id=${restaurantId}`;
// }
// // Fonction pour créer les étoiles
// function createStarRating(note) {
//     const filledWidth = (note / 5)*100; // Pourcentage d'étoiles pleines
//     return `
//         <div class="stars">
//             <div class="filled" style="width: ${filledWidth}%; overflow: hidden;">★★★★★</div>
//         </div>
//     `;
// }
// function recherche(){
//     let inputRecherche=document.getElementById('inputRecherche').value.tolowerCase();
//     let boxs=document.querySelector('.cherche');
//     boxs.innerHTML='';
//     for(let i=0 ; i<data.length; i++){
//      if(data[i].nom.tolowerCase().includes(inputRecherche)){
//         update(data[i].i);
//      }
// }
// }
let data = []; // Variable globale pour stocker les données

// Fonction pour récupérer les données
async function getData() {
    try {
        const response = await fetch('http://localhost:3000/restaurants');
        data = await response.json(); // Stockage des données dans la variable globale
        console.log("fetched data", data);
        update(data); // Mise à jour de l'interface avec les données
    } catch (error) {
        console.log('error fetching', error);
    }
}

// Fonction pour mettre à jour l'affichage
function update(restaurants) {
    let boxs = document.querySelector(".boxs");
    boxs.innerHTML = ""; 
    for (let i = 0; i < restaurants.length; i++) {
        const box = document.createElement("div");
        console.log(restaurants[i].nom);
        box.innerHTML = `
            <img class="imageRestaurant" src="${restaurants[i].cover}" alt="">
            <h2 class="nomRestaurant">${restaurants[i].nom}</h2>
            <p class="specialiteRestaurant">${restaurants[i].spécialité}</p>
            <div class="rating">
                ${createStarRating(restaurants[i].notation)}
                <span class="rating-star">${restaurants[i].notation}</span>
            </div>
            <a class="lienRestaurant" href="${restaurants[i].lien}">lien</a>
            <button onclick="getDetail(${restaurants[i].id})">détails</button>
        `;
        boxs.appendChild(box);
    }
}

// Fonction pour gérer l'affichage des détails
function getDetail(restaurantId) {
    window.location.href = `detaile.html?id=${restaurantId}`;
}

// Fonction pour créer les étoiles
function createStarRating(note) {
    const filledWidth = (note / 5) * 100; // Pourcentage d'étoiles pleines
    return `
        <div class="stars">
            <div class="filled" style="width: ${filledWidth}%; overflow: hidden;">★★★★★</div>
        </div>
    `;
}

// Fonction de recherche
function recherche() {
    let inputRecherche = document.getElementById('inputRecherche').value.toLowerCase();
    let resultat = data.filter(restaurant => restaurant.nom.toLowerCase().includes(inputRecherche));
    update(resultat); // Mise à jour avec les résultats filtrés
}

// Charger les données au démarrage
getData();

