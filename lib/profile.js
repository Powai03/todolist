"use strict";
// Fonction pour obtenir l'utilisateur depuis le localStorage
function getUserFromLocalStorage() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        const storedUser = localStorage.getItem("loggedInUser");
        return storedUser ? JSON.parse(storedUser) : null;
    }
    return null; // Si l'utilisateur n'est pas connecté
}
// Fonction pour récupérer les tâches d'un utilisateur depuis le localStorage
function getTasksForUser(username) {
    const tasks = localStorage.getItem(username + "-tasks");
    return tasks ? JSON.parse(tasks) : [];
}
// Fonction pour afficher les tâches de l'utilisateur connecté
function displayTasks(username) {
    const todoColumn = document.getElementById("todoTasks");
    const completedColumn = document.getElementById("completedTasks");
    clearColumns(todoColumn, completedColumn);
    const tasks = getTasksForUser(username);
    console.log(tasks); // Afficher la liste des tâches dans la console pour débogage
    tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span>Deadline: ${task.deadline}</span>`;
        if (task.status === "À faire") {
            // Ajouter les boutons de modification et de suppression uniquement pour les tâches "À faire"
            taskElement.innerHTML += `
        <button class="mark-complete-btn" onclick="markTaskAsCompleted('${task.title}')">Marquer comme terminée</button>
        <button class="delete-btn" onclick="deleteTask('${task.title}')">Supprimer</button>`;
            todoColumn.appendChild(taskElement);
        }
        else if (task.status === "Terminée") {
            taskElement.classList.add("completed");
            completedColumn.appendChild(taskElement);
        }
    });
}
// Fonction pour vider les colonnes avant de réafficher les tâches
function clearColumns(todoColumn, completedColumn) {
    todoColumn.innerHTML = "";
    completedColumn.innerHTML = "";
}
// Fonction pour marquer une tâche comme terminée
function markTaskAsCompleted(title) {
    const user = getUserFromLocalStorage();
    if (user) {
        let tasks = getTasksForUser(user.username);
        const task = tasks.find((task) => task.title === title);
        if (task && task.status === "À faire") {
            task.status = "Terminée";
            localStorage.setItem(user.username + "-tasks", JSON.stringify(tasks));
            displayTasks(user.username);
        }
    }
}
// Fonction pour supprimer une tâche
function deleteTask(title) {
    const user = getUserFromLocalStorage();
    if (user) {
        let tasks = getTasksForUser(user.username);
        tasks = tasks.filter((task) => task.title !== title);
        localStorage.setItem(user.username + "-tasks", JSON.stringify(tasks));
        displayTasks(user.username);
    }
}
// Fonction pour déconnecter l'utilisateur
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
// Fonction pour afficher l'username connecté
function displayUsername() {
    const user = getUserFromLocalStorage();
    if (user) {
        const usernameDisplay = document.getElementById("usernameDisplay");
        usernameDisplay.textContent = `Bienvenue, ${user.username}`;
    }
}
// Fonction pour créer une nouvelle tâche
function createTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const deadline = document.getElementById("taskDeadline").value;
    if (title && description && deadline) {
        const user = getUserFromLocalStorage();
        if (user) {
            const task = {
                title,
                description,
                deadline,
                status: "À faire", // Par défaut, la tâche est "À faire"
                username: user.username, // Ajouter le nom d'utilisateur pour lier la tâche
            };
            // Récupérer les tâches existantes de l'utilisateur ou initialiser un tableau vide
            const tasks = getTasksForUser(user.username);
            tasks.push(task); // Ajouter la nouvelle tâche à la liste des tâches
            localStorage.setItem(user.username + "-tasks", JSON.stringify(tasks)); // Sauvegarder dans localStorage
            // Réafficher les tâches après ajout
            displayTasks(user.username);
        }
    }
    else {
        alert("Veuillez remplir tous les champs.");
    }
}
// Initialisation des tâches lors du chargement de la page de profil
window.onload = () => {
    const user = getUserFromLocalStorage();
    if (user) {
        displayTasks(user.username);
        displayUsername();
    }
    else {
        alert("Vous devez être connecté pour accéder à cette page.");
        window.location.href = "index.html";
    }
    // Ajouter un événement de déconnexion
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", logout);
};
