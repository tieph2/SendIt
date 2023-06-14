import { Migration } from "@mikro-orm/migrations";

export class Migration20230607034138 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "boulders" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "zone" int not null, "color" varchar(255) not null, "score" int not null, "grade" int not null, "note" varchar(255) not null, "img_uri" varchar(255) not null);'
		);

		this.addSql(
			'create table "scores" ("athlete" varchar(255) not null, "score" int not null default 0, constraint "scores_pkey" primary key ("athlete"));'
		);

		this.addSql(
			'create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "email" varchar(255) not null, "name" varchar(255) not null, "skill_level" int not null, "password" varchar(255) not null default \'password\', "role" text check ("role" in (\'Admin\', \'User\', \'Judge\', \'Climber\')) not null, "img_uri" varchar(255) not null);'
		);
		this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

		this.addSql(
			'create table "queue" ("climber_id" int not null, "boulder_id" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "queue_pkey" primary key ("climber_id", "boulder_id"));'
		);

		this.addSql(
			'create table "attempts" ("climber_id" int not null, "boulder_id" int not null, "count" int not null default 0, "successful" boolean not null default false, "note" varchar(255) not null default \'\', "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "attempts_pkey" primary key ("climber_id", "boulder_id"));'
		);

		this.addSql(
			'alter table "queue" add constraint "queue_climber_id_foreign" foreign key ("climber_id") references "users" ("id") on update cascade;'
		);
		this.addSql(
			'alter table "queue" add constraint "queue_boulder_id_foreign" foreign key ("boulder_id") references "boulders" ("id") on update cascade;'
		);

		this.addSql(
			'alter table "attempts" add constraint "attempts_climber_id_foreign" foreign key ("climber_id") references "users" ("id") on update cascade;'
		);
		this.addSql(
			'alter table "attempts" add constraint "attempts_boulder_id_foreign" foreign key ("boulder_id") references "boulders" ("id") on update cascade;'
		);
	}
}
