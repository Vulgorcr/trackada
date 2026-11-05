# Suivi de Projets

Ce script vérifie si les dossiers et fichiers de tes projets sont bien en place et configurés.

## Ce qu'il fait

Le script utilise le fichier track.json pour vérifier :
1. Si le dossier principal existe.
2. Si le dossier de chaque projet a le bon nom.
3. Si Git est initialisé dans chaque projet.
4. Si les fichiers obligatoires sont présents.

---

## Structure des fichiers

Le fichier track.json et le script doivent être placés comme ceci :

```text
OneDrive
  Área de Trabalho
    DOSSIER
      trackada
        votre-projet-1
        votre-projet-2
        tracker
          track.json
          checktrack.js
```

---

## Comment lancer le script

1. Ouvre ton terminal dans le dossier du script.
2. Lance la commande :

```bash
node checktrack.js
```

---

## Exemples de résultat

**Si tout est bon :**
```text
dossier ~/OneDrive/Área de Trabalho/DOSSIER/trackada

dossier du projet nom-du-projet-1
dossier du projet nom-du-projet-2

100% des projets sont initialisés correctement (2/2)
```

**S'il y a des erreurs :**
```text
dossier ~/OneDrive/Área de Trabalho/DOSSIER/trackada

dossier du projet nom-du-projet-1
- le repository git n'est pas initialisé
- il manque style.css et script.js

50% des projets sont initialisés correctement (1/2)
```
