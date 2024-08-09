export type Book = {
    title: string;
    author: string;
    description: string;
    year: number | null;
    addedBy?: string;
};

export type UserPermissions = {
    username: string;
    password: string;
    role: string;
};
