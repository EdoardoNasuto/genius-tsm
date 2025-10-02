import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const __dirname = path.resolve();

// Définition du helper "eq"
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

// Charge le json
const dataFile = fs.readFileSync("data/data.json", "utf-8");
const data = JSON.parse(dataFile);

// Vérifie le json
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schemaFile = fs.readFileSync("data/schema.json", "utf-8");
const schema = JSON.parse(schemaFile);

const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.error("❌ Erreurs de validation JSON :");
  console.error(validate.errors);
  process.exit(1);
}

console.log("✅ JSON validé avec succès !");

// Supprime le dossier dist s'il existe
if (fs.existsSync("dist")) {
  fs.rmSync("dist", { recursive: true, force: true });
  console.log("🗑️  Dossier dist supprimé");
}


// Charge le layout principal
const layout = fs.readFileSync("src/templates/layouts/main.hbs", "utf-8");

// Enregistre les partials
const partialsDir = "src/templates/partials";
fs.readdirSync(partialsDir).forEach(file => {
  const name = path.parse(file).name;
  const content = fs.readFileSync(path.join(partialsDir, file), "utf-8");
  Handlebars.registerPartial(name, content);
});

// Génère les pages
const pagesDir = "src/templates/pages";
fs.readdirSync(pagesDir).forEach(file => {
  const name = path.parse(file).name;
  const pageContent = fs.readFileSync(path.join(pagesDir, file), "utf-8");

  const template = Handlebars.compile(layout);
  const html = template({
    ...data,
    title: name.charAt(0).toUpperCase() + name.slice(1),
    body: Handlebars.compile(pageContent)(data)
  });

  if (!fs.existsSync("dist")) fs.mkdirSync("dist");
  fs.writeFileSync(`dist/${name}.html`, html, "utf-8");
  console.log(`✅ Page générée : ${name}.html`);
});

// Copie le contenu de public/ directement à la racine de dist/
if (fs.existsSync("public")) {
  fs.readdirSync("public").forEach(item => {
    const srcPath = path.join("public", item);
    const destPath = path.join("dist", item);
    fs.cpSync(srcPath, destPath, { recursive: true });
  });
  console.log("✅ Contenu de public/ copié à la racine de dist/");
}
