module.exports = {
  content: ["./src/**/*.{html,js,svelte}"],  theme: {
  extend: {},
},
themes: ["valentine"],
daisyui: {
  themes: ["valentine","dark"],
},
plugins: [
  require("daisyui")
],
}