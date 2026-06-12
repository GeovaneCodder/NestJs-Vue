export class UserDto {

    constructor(
        public id: number,
        public name: string,
        public email: string,
        public address: Record<string, any>,
        public phone: string,
        public website: string,
        public company: Record<string, any>,
    ) {}
}