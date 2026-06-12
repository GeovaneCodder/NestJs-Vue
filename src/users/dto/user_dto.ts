export interface UserDto {
    id: number;
    name: string;
    email: string;
    address: Record<string, any>;
    phone: string;
    website: string;
    company: Record<string, any>;
}