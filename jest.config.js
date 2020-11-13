module.exports = {
  // "snapshotSerializers": [
  //   "enzyme-to-json/serializer"
  // ],
  "testPathIgnorePatterns": [
    "/node_modules/"
  ],
  "clearMocks": true,
  // "coverageReporters": [
  //   "lcov",
  //   "text-summary"
  // ],
  "moduleNameMapper": {
    "^.+\\.(jpg|jpeg|png|apng|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "^.*i18n.*\\.(json)$": "<rootDir>/tests/i18n_mock.json",
    "^bundle-loader\\?lazy\\!(.*)$": "$1"
  },
  "moduleDirectories": [
    "",
    "node_modules"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!react-native|react-router)"
  ],
  "testURL": "http://localhost:8065"
};
