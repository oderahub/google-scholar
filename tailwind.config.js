// filepath: c:\Users\personal\Desktop\OpenCampus\my-nextjs-app\tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./ui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          ocidprimary: "#141BEB", 
          ocidborder: "#DDDDEB", 
        },
      },
    },
    plugins: [],
  };