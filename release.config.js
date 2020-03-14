const path = require("path");

const packageName = path.parse(process.cwd()).name;

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
    [
      "semantic-release-vsce",
      {
        packageVsix: `${packageName}.vsix`
      }
    ],
    [
      "@semantic-release/github",
      {
        successComment: `:tada: This \${issue.pull_request ? 'PR is included' : 'issue has been resolved'} in version \${nextRelease.version} of ${packageName} :tada:\n\nThe release is available on\${releases.map(({name, url}) => '- [' + name + '](' + url + ')').join('\n')}`,
        assets: [
          {
            path: `${packageName}.vsix`,
            label: "Visual Studio Code Extension"
          }
        ]
      }
    ],
    [
      "@semantic-release/git",
      {
        message: `chore(release): ${packageName} \${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`
      }
    ]
  ],
  commitPaths: ["./*"],
  tagFormat: `${packageName}-\${version}`
};
