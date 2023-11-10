import hash from "object-hash";
export default function hashThePassword(password) {
  return hash(password);
}
