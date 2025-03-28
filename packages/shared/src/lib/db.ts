import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";

export function initDbConnection(db: D1Database) {
    return new Kysely<D1Database>({
        dialect: new D1Dialect({
            database: db,
        }),
    });
}
