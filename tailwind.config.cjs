const { rose } = require("tailwindcss/colors")
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        main: rose,
        vlr: "#fa4454"
      }
    },
  },

  plugins: [],
};

module.exports = config;
