// import { readFileSync, existsSync } from "fs";
// import readline from "readline"
// // On importe les fonctions nécessaires depuis le module fs
// const content = readFileSync("track.json", "utf8");
// // On lit le contenu du fichier sous forme de texte
// const trackData = JSON.parse(content);
// // On transforme le texte JSON en données JavaScript
// console.log(trackData);
// // On affiche les données dans le Terminal


// const afficherStatut = (trackada, ok) => {
//   const icone = ok ? "✅" : "❌"
//   console.log(`${icone} dossier du projet ${trackada}`)
// }

// afficherStatut("adapage", true)
// afficherStatut("adalgo",  false)

// const afficherErreurs = (erreurs) => {
//     erreurs.forEach((e) => console.log(`- ${e}`))
//     }

//     afficherErreurs([
//         "Le fichier track.json est manquant",
//         "Le dossier du projet n'existe pas",
//         "Le fichier package.json est manquant"
//     ])


//     const formaterliste = (items) => {
//         if (items.length === 1) {
//             return items[0]
//         }
//         if (items.length === 2) {
//             return items.join(" et ")}
//     const debut = items.slice(0, -1).join(", ")
//     const fin = items[items.length - 1]
//     return `${debut} et ${fin}`
//     }
//     console.log(formaterliste(["indexx.js"]))
//     console.log(formaterliste(["indexx.js", "index.html"]))
//     console.log(formaterliste(["a", "b", "c"]))

// const messageFichiers = (manquants) => `il manque le(s) fichier(s) ${formaterliste(manquants)}`

// console.log(messageFichiers(["indexx.js"]))
// console.log(messageFichiers(["indexx.js", "index.html"]))


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// rl.question("Quel est votre nom ? ", (nom) => {
//     console.log(`Bonjour, ${nom} !`);
//     rl.close();
// })

// const rl1 = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// }); 
// rl1.question("Ton prenom? ", (nom) => {
//     rl1.question("Ton projet prefere? ", (projet) => {
//         console.log(`${nom} aime ${projet}`);
//         rl1.close();
//     });
// });


// const number = (reponse) => {
//   const num = parseInt(reponse.trim(), 10);
//     if (isNaN(num)) {
//         console.log("Veuillez entrer un nombre valide.");
//     }
// };



import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

function runTracker() {
  const currentScriptDir = dirname(fileURLToPath(import.meta.url));
  const BASE_DIR = dirname(currentScriptDir);
  const jsonPath = join(currentScriptDir, "track.json");
  let trackData;
  try {

    const fileContent = readFileSync(jsonPath, "utf-8");
    trackData = JSON.parse(fileContent);
  } catch (error) {
    console.error("❌ Impossible de lire ou de parser le fichier track.json");
    console.error(`Chemin testé : ${jsonPath}`);
    return;
  }

  if (!existsSync(BASE_DIR)) {
    console.log("❌ dossier ~/ada-tech/bloc1/projets");
    console.log("- le dossier n'existe pas : vérifie ton arborescence de la semaine 1");
    return;
  }
  console.log("✅ dossier ~/ada-tech/bloc1/projets\n");

  let correctProjectsCount = 0;
  const totalProjects = trackData.projects.length;

  for (const project of trackData.projects) {
    const projectPath = join(BASE_DIR, project.name);
     if (!existsSync(projectPath)) {
      console.log(`❌ dossier du projet ${project.name}`);
      console.log("- le dossier n'existe pas ou n'est pas nommé correctement\n");
      continue;
    }

    const errors = [];
    const gitPath = join(projectPath, ".git");
    if (!existsSync(gitPath)) {
      errors.push("le repository git n'est pas initialisé");
    }

    const missingFiles = [];
    for (const file of project.required) {
      const filePath = join(projectPath, file);
      if (!existsSync(filePath)) {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length > 0) {
      let missingText = "";
      if (missingFiles.length === 1) {
        missingText = missingFiles[0];
      } else if (missingFiles.length === 2) {
        missingText = `${missingFiles[0]} et ${missingFiles[1]}`;
      } else {
        const lastFile = missingFiles.pop();
        missingText = `${missingFiles.join(", ")} et ${lastFile}`;
      }
      errors.push(`il manque ${missingText}`);
    }

    if (errors.length === 0) {
      console.log(`✅ dossier du projet ${project.name}\n`);
      correctProjectsCount++;
    } else {
      console.log(`❌ dossier du projet ${project.name}`);
      for (const error of errors) {
        console.log(`- ${error}`);
      }
      console.log(""); 
    }
  }

  const percentage = Math.round((correctProjectsCount / totalProjects) * 100);
  const statusIcon = percentage === 100 ? "✅" : "❌";
  console.log(`${statusIcon} ${percentage}% des projets sont initialisés correctement (${correctProjectsCount}/${totalProjects})`);
}

runTracker();
