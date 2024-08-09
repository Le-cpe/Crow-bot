# Crow Bot

Crow Bot est un bot Discord conçu pour faciliter la gestion des serveurs Discord avec une série de commandes de modération et de configuration. Il inclut des fonctionnalités telles que la gestion des bans, des rôles automatiques, des messages de bienvenue, et plus encore.

## Table des Matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Commandes](#commandes)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Prérequis

Avant de commencer, assurez-vous que vous avez les éléments suivants :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) pour la gestion des paquets
- Un compte Discord et un serveur pour tester le bot

## Installation

1. **Clonez le dépôt :**

    ```bash
    git clone https://github.com/yourusername/CrowBot.git
    cd CrowBot
    ```

2. **Installez les dépendances :**

    ```bash
    npm install
    ```

3. **Créez un fichier `.env` à la racine du projet et ajoutez votre token Discord :**

    ```plaintext
    DISCORD_TOKEN=your-discord-bot-token
    ```

4. **Configurez la base de données et les fichiers de configuration si nécessaire.**

## Configuration

1. **Configurer le fichier de configuration (`config.json`) :**

   Placez vos paramètres de configuration (comme les ID de salons, rôles, etc.) dans le fichier `config.json`. Voici un exemple :

    ```json
    {
        "welcomeChannel": "123456789012345678",
        "autoRole": "987654321098765432"
    }
    ```

2. **Lancer le bot :**

    ```bash
    npm start
    ```

## Commandes

### `+ban @user`
Bannit un utilisateur du serveur.

### `+unban <userID>`
Débannit un utilisateur en utilisant son ID.

### `+clear <nombre>`
Supprime un certain nombre de messages dans le salon actuel.

### `+config_bienvenue <channelID>`
Configure le salon où envoyer un message de bienvenue.

### `+autorole @role`
Configure un rôle à attribuer automatiquement aux nouveaux membres.

## Contribuer

Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes ci-dessous :

1. Forkez le dépôt.
2. Créez une branche (`git checkout -b feature/YourFeature`).
3. Effectuez vos modifications.
4. Commitez vos changements (`git commit -am 'Add new feature'`).
5. Poussez la branche (`git push origin feature/YourFeature`).
6. Ouvrez une Pull Request.

## Licence

Ce projet est sous la [Licence MIT](LICENSE).

---

Si vous avez des questions ou des suggestions, n'hésitez pas à ouvrir une issue ou à contacter l'auteur du bot.
