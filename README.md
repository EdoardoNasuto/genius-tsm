
# Genius TSM – Site web

Ce dépôt contient le site web statique de l’association Genius TSM.

---

## Prérequis

Avant de commencer, assurez-vous d’avoir installé :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/get-npm) (inclus avec Node.js)

---

## Installation

Installez les dépendances du projet :

```bash
npm install
```

---

## Commandes disponibles

- **Générer le site web**

```bash
npm run build
```

Cette commande :

1. Valide les données JSON via le schéma (AJV)
2. Génère les pages HTML à partir des templates Handlebars et des données JSON
3. Copie les images dans le dossier `dist`

---


## Structure du projet

```
src/
	templates/
		layouts/
		pages/
		partials/
data/           -> Données JSON et schéma de validation
public/
	images/       -> Images et ressources statiques
	styles/       -> Fichiers CSS
	scripts/      -> JS statiques
build.js        -> Script de génération du site
package.json    -> Dépendances et scripts
dist/           -> Site généré (après build)
```

---

## Fonctionnement

Le site est généré statiquement à partir de :

- **Templates Handlebars** : pour la structure des pages
- **Données JSON** : pour le contenu dynamique
- **Validation AJV** : pour garantir la conformité des données

Le script `build.js` assemble les pages, injecte les données, et copie les images dans le dossier `dist`.

---

## Personnalisation du contenu

Pour modifier le contenu du site, éditez les fichiers dans le dossier `data/` (par exemple `data.json`).
Les pages sont définies dans `src/pages/` et le layout principal dans `src/layouts/main.hbs`.

Après modification, relancez la commande :

```bash
npm run build
```

---

## Déploiement

Le dossier `dist/` contient le site prêt à être déployé sur n’importe quel hébergement statique (Netlify, Vercel, GitHub Pages, etc).

---
