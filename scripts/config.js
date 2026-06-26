module.exports = {
    reviewExtensions: [
        ".ts",
        ".js",
        ".html",
        ".scss",
        ".css"
    ],

    skipFiles: [
        "package.json",
        "package-lock.json",
        "angular.json",
        "tsconfig.json",
        ".eslintrc.json"
    ],

    skipFolders: [
        ".github/",
        "dist/",
        "coverage/",
        "node_modules/"
    ]
};