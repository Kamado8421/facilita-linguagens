'use server';

import { ADMIN_PASSWORD, ADMIN_USER } from "@/src/constants";

export default async function ValidateAdmin({ user, password }: { user: string, password: string }) {
    //return user === ADMIN_USER && password === ADMIN_PASSWORD
    return user === 'ifma-adm' && password === 'facilita@8421';
}
