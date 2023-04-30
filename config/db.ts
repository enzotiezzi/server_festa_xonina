export class DbConfig {
    static readonly connectionString: string = process.env.CONNECTIONSTRING || "";
}