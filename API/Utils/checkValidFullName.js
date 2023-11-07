export default async function checkValidFullName(fullName) {
    const names = fullName.split(" ");
    names.forEach((name) => {
        if (!/^[a-zA-Z]+$/.test(name)) {
            throw new Error("Full name must only contain letters");
        }
        if (!/^[A-Z]/.test(name)) {
            throw new Error("Full name must start with capital letter");
        }
    });
    return true;
}