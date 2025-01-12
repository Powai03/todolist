// Interface pour stocker l'utilisateur
interface User {
    username: string;
    password: string;
}

// Fonction pour inscrire un utilisateur
function register(): void {
    const username = (document.getElementById("registerUsername") as HTMLInputElement).value;
    const password = (document.getElementById("registerPassword") as HTMLInputElement).value;

    if (username && password) {
        const storedUsers = localStorage.getItem("users");
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            alert("Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.");
        } else {
            const user: User = { username, password };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Inscription réussie !");
        }
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// Fonction pour connecter un utilisateur
function login(): void {
    const username = (document.getElementById("loginUsername") as HTMLInputElement).value;
    const password = (document.getElementById("loginPassword") as HTMLInputElement).value;
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
        const users: User[] = JSON.parse(storedUsers);

        // Trouver l'utilisateur correspondant dans la liste
        const user = users.find(
            (user) => user.username === username && user.password === password
        );
        if (user) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("loggedInUser", JSON.stringify(user)); // Stocke l'utilisateur connecté
            window.location.href = "profile.html"; 
        } else {
            alert("Identifiants incorrects");
        }
    } else {
        alert("Aucun utilisateur trouvé. Veuillez vous inscrire.");
    }
}


