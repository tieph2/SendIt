import { Migration } from "@mikro-orm/migrations";

export class Migration20230429073402 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "match" ("owner_id" int not null, "matchee_id" int not null, "created_at" timestamptz(0) not null, constraint "match_pkey" primary key ("owner_id", "matchee_id"));'
		);

		this.addSql(
			'alter table "match" add constraint "match_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;'
		);
		this.addSql(
			'alter table "match" add constraint "match_matchee_id_foreign" foreign key ("matchee_id") references "users" ("id") on update cascade;'
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists "match" cascade;');
	}
}
