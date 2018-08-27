
export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
}
export interface User {
 uid:string;
 email:string;
 roles:Roles;
 coId?:string;
 photoURL?: string;
 displayName?: string;

}