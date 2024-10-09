/* eslint-disable @typescript-eslint/no-unsafe-argument */
const envConfigKeys: Record<string, boolean | string | undefined> = {
  enable_rhf: import.meta.env.VITE_RHF_DEV
    ? (JSON.parse(import.meta.env.VITE_RHF_DEV) as boolean)
    : false, // react hook form dev tool
} as const;

Object.entries(envConfigKeys).forEach(([key, val]) => {
  if (!val && typeof val !== 'boolean') {
    if (!import.meta.env.PROD)
      return console.error(
        `${key} is not existed, please check the envirnmental variables to fix this error!`
      );
    return console.error(
      'Some configurations are missing, please contact the developers to check!'
    );
  }
});

export default envConfigKeys;
