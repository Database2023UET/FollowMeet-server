import argon2 from argon2;

export default async function hashThePassword(password) {
    const hash = await argon2.hash("password");
    return hash;
}