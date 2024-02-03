/** @type {import('tailwindcss').Config} */
export default {
  content : ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
     extend: {
       screens:{
         xs: "320px",
         sm: "375px",
         sml: "500px",
         md: "668px",
         mdl: "800px",
         lg: "960px",
         lgl: "1024px",
         xl: "1280px",
       },
       fontFamily: {
         bodyFont: ["Poppins", "sans-serif"],
         titleFont: ["Montserrat", "sans-serif"],
       },
       colors: {
         bodyColor: "#FFFFFF",
         lightText: "#c4cfde",
         boxBg: "linear-gradient(145deg, #1e2024, #23272b)",
         designColor: "#0E4B9B",
       },
       boxShadow: {
         shadowOne: "10px 10px 19px #1c1e22, -10px -10px 19px #262a2e",
       },
     },    
   },
}

