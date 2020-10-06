const fs = require("fs");
const fsp = fs.promises;
const inquirer = require("inquirer");
const path = require("path");

const PACKAGES_FOLDER = path.resolve(path.join(__dirname, "../packages"));
const TEMPLATE_FOLDER = path.resolve(path.join(__dirname, "template"));

const QUESTIONS = [
    {
        name: "type",
        type: "list",
        message: "Which type do you want to generate?",
        choices: ["component", "template"]
    },
    {
        name: "name",
        type: "input",
        message: "Name:"
    },
    {
        name: "description",
        type: "input",
        message: "Description:"
    },
    {
        name: "author",
        type: "input",
        message: "Your name:"
    }
];

function pascalCase(str) {
    return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
}

function replace(str, modifiers){
    let res = str;

    Object.keys(modifiers).forEach(key => {
        const value = modifiers[key];
        const regexp = new RegExp(`{{\\b${key}\\b}}`, 'gi');
        res = res.replace(regexp, value);
    });

    return res;
}

function folderExists(folder) {
    try {
        return fs.statSync(folder).isDirectory();
    }
    catch {
        return false;
    }
}

async function create({
    originFolder, destinationFolder, replaceFn
}) {
    const files = await fsp.readdir(originFolder);

    for (const file of files) {
        const origin = `${originFolder}/${file}`;
        const stats = fs.statSync(origin);

        if (stats.isFile()) {
            const content = await fsp.readFile(origin, "binary");
            const replaced = replaceFn(content);
            const filename = replaceFn(file);
            const destinationFilename = path.join(destinationFolder, filename);
            await fsp.writeFile(destinationFilename, replaced, "utf-8");
            console.log("✔️", "Written file:", destinationFilename);
        }
        else {
            const destination = `${destinationFolder}/${file}`;
            await fsp.mkdir(destination);
            create({originFolder: origin, destinationFolder: destination, replaceFn});
        }
    }
}

inquirer
    .prompt(QUESTIONS)
    .then(async answers => {
        const { type, name, author, description } = answers;

        if (name.length === 0) throw new Error("Please provide a name.");
        if (author.length === 0) throw new Error("Please provide an author name.");

        const modifiers = {
            "TYPE": pascalCase(type),
            "LOWER_TYPE": type,
            "NAME": pascalCase(name),
            "LOWER_NAME": name,
            "AUTHOR": author,
            "DESCRIPTION": description
        };
        const replaceFn = str => replace(str, modifiers);
        const destinationFolder = path.join(PACKAGES_FOLDER, `${type}-${name}`);

        const found = await folderExists(destinationFolder);
        if (found) throw new Error("Folder already exists");
        await fsp.mkdir(destinationFolder);

        create({originFolder: TEMPLATE_FOLDER, destinationFolder, replaceFn});
    })
    .catch(err => {
        console.log("❌", err);
    });
