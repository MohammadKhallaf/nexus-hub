/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const envConfigKeys: Record<string, string | undefined> = {
  supabase_url: import.meta.env.VITE_SUPABASE_URL,
  supabase_api_key: import.meta.env.VITE_SUPABASE_API_KEY,
} as const;

Object.entries(envConfigKeys).forEach(([key, val]) => {
  if (!val && typeof val !== 'boolean') {
    if (!import.meta.env.PROD)
      return console.error(
        `${key} is not existed, please check the environmental variables to fix this error!`
      );
    return console.error(
      'Some configurations are missing, please contact the developers to check!'
    );
  }
});

export default envConfigKeys;
