import jwtDecode from "jwt-decode";
//author lay tu localstorgate
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicXV5ZW4iOjEsImlhdCI6MTUxNjIzOTAyMn0.2PaAnWoirYkS_cmDo9OtMlpfoHiQqc3P1PO1_fe0jFA";
export function checkQuyen() {
  // get the decoded payload and header
  const decoded = jwtDecode(token);
  return decoded.quyen;
}
