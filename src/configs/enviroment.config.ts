interface IURL {
  REDIRECT_URL: string;
  API_BASE_URL: string;
}

const prod = {
  REDIRECT_URL: `${window.location.origin}/`,
  API_BASE_URL: "http://oguntescom.com/api"
};

const dev = {
  REDIRECT_URL: "http://localhost:3000",
  API_BASE_URL: "http://localhost:8001/api"
};
const getEnv = (): IURL => {
  switch (process.env.NODE_ENV) {
    case "development":
      if (process.env.REACT_APP_ENVIROMENT) {
        return prod;
      }
      return dev;
    case "production":
      return prod;
    default:
      return dev;
  }
};

export const env = getEnv();
