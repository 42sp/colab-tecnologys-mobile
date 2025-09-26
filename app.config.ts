import 'dotenv/config'; // loads .env locally; in EAS, env comes from the build profile

import appJson from './app.json'; // re-use your existing config

export default ({ config }: { config: any }) => ({
  ...config,
  // keep everything from app.json
  ...appJson,
  expo: {
    // merge app.json's "expo" object
    ...(appJson as any).expo,
    extra: {
      ...(appJson as any).expo?.extra,
      // expose only what you need at runtime
      API_URL: process.env.API_URL,
    },
  },
});
