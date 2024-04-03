const themeData = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              light: "#f0c14c",
              main: "#eaa700",
              dark: "#bb8500",
            },
            secondry: {
              light: "#ff9999",
              main: "#cc0000",
              dark: "#660000",
            },
            neutral: {
              light: "#EEEE",
              main: "#9c9c9c",
              medium: "#888888",
              dark: "#666",
            },
            background: {
              default: "#EEE",
              alt: "#FFF",
            },
          }
        : {
            primary: {
              dark: "#f0c14c",
              main: "#eaa700",
              light: "#bb8500",
            },
            secondry: {
              light: "#660000",
              main: "#cc0000",
              dark: "#ff9999",
            },
            neutral: {
              dark: "#EEEE",
              main: "#9c9c9c",
              medium: "#888888",
              light: "#666",
            },
            background: {
              default: "#2f2f2f",
              alt: "#505050",
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export default themeData;
