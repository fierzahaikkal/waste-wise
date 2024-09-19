export const usernamePassword = `${process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY_DEV}:`;
export const AUTH_STRING = btoa(usernamePassword);
