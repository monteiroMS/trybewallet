export default function validEmail(email) {
  const isValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
  return isValid === null;
}
