const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Fonction pour charger les données depuis le fichier JSON
function loadData() {
    return JSON.parse(fs.readFileSync('data.json', 'utf8'));
}

// Fonction pour sauvegarder les données dans le fichier JSON
function saveData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

// Accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API!');
});

// Liste des restaurants
app.get('/restaurants', (req, res) => {
    const restaurants = loadData();
    res.json(restaurants);
});

// Détails d'un restaurant
app.get('/restaurants/:id', (req, res) => {
    const restaurants = loadData();
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send('Restaurant non trouvé');
    res.json(restaurant);
});

// Ajouter un restaurant
app.post('/restaurants', (req, res) => {
    const restaurants = loadData();
    const nouveauRestaurant = {
        id: Date.now(),
        nom: req.body.nom,
        adresse: req.body.adresse,
        spécialité: req.body.spécialité,
        notation: req.body.notation,
        numéro_de_téléphone: req.body.numéro_de_téléphone,
        avis: req.body.avis,
        cover: req.body.cover || '', // Ajout des champs optionnels
        lien: req.body.lien || ''
    };

    // Validation simple
    // if (!nouveauRestaurant.nom  || !nouveauRestaurant.adresse || !nouveauRestaurant.specialite) {
    //     return res.status(400).send('Tous les champs obligatoires doivent être remplis');
    // }

    restaurants.push(nouveauRestaurant);
    saveData(restaurants);
    res.status(201).json(nouveauRestaurant);
});

// Modifier un restaurant
app.put('/restaurants/:id', (req, res) => {
    const restaurants = loadData();
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send('Restaurant non trouvé');

    // Mise à jour des champs
    restaurant.nom = req.body.nom || restaurant.nom;
    restaurant.adresse = req.body.adresse || restaurant.adresse;
    restaurant.spécialité = req.body.specialite || restaurant.spécialité;
    restaurant.notation = req.body.notation || restaurant.notation;
    restaurant.numéro_de_téléphone = req.body.numéro_de_téléphone || restaurant.numéro_de_téléphone;
    restaurant.avis = req.body.avis || restaurant.avis;
    restaurant.cover = req.body.cover || restaurant.cover;
    restaurant.lien = req.body.lien || restaurant.lien;

    saveData(restaurants);
    res.json(restaurant);
});

// Supprimer un restaurant
app.delete('/restaurants/:id', (req, res) => {
    const restaurants = loadData();
    const index = restaurants.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Restaurant non trouvé');

    restaurants.splice(index, 1);
    saveData(restaurants);
    res.sendStatus(204);
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
function saveData(data) {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erreur de sauvegarde des données :', error);
    }
}