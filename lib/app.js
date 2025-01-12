"use strict";
// Fonction pour inscrire un utilisateur
function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    if (username && password) {
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            alert("Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.");
        }
        else {
            const user = { username, password };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Inscription réussie !");
        }
    }
    else {
        alert("Veuillez remplir tous les champs.");
    }
}
// Fonction pour connecter un utilisateur
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
        const users = JSON.parse(storedUsers);
        // Trouver l'utilisateur correspondant dans la liste
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("loggedInUser", JSON.stringify(user)); // Stocke l'utilisateur connecté
            window.location.href = "profile.html";
        }
        else {
            alert("Identifiants incorrects");
        }
    }
    else {
        alert("Aucun utilisateur trouvé. Veuillez vous inscrire.");
    }
}
