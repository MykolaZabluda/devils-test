export const LS_BOOKS = 'books';
export const LS_ROLE = 'role';
export const LS_USERS = 'users';

export const UserName = {
    admin: 'admin',
    user: 'user',
    mentor: 'mentor'
} as const;

export const UserPassword = {
    admin: 'admin',
    user: 'user',
    mentor: 'mentor'
} as const;

export const UserRole = {
    admin: 'admin',
    user: 'user',
    mentor: 'mentor'
} as const;

export const DEFAULT_PERMISSIONS = [
    {
        username: UserName.admin,
        password: UserPassword.admin,
        role: UserRole.admin
    },
    {
        username: UserName.mentor,
        password: UserPassword.mentor,
        role: UserRole.mentor
    },
    {
        username: UserName.user,
        password: UserPassword.user,
        role: UserRole.user
    }
];