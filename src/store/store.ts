interface Store {
  _publicKey: string;
  _host: string;
  _privateKey?: string;
}

export const store: Store = {
  _publicKey: '',
  _host: 'api.emailjs.com',
};
