const path = require("path");

module.exports = {
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          {
            type: "chore",
            scope: "deps",
            subject: "/\\[security\\].*/",
            release: "patch"
          },
          {
            type: "docs",
            scope: "readme",
            release: "patch"
          }
        ],
        noteKeywords: ["BREAKING CHANGE", "[security]"]
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "semantic-release-vsce",
    "@semantic-release/github",
    "@semantic-release/git"
  ],
  commitPaths: ["./*"],
  tagFormat: `${path.parse(process.cwd()).name}-\${version}`
};
