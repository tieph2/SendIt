import { Migration } from '@mikro-orm/migrations';

export class Migration20230614073030 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" drop column "password";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" add column "password" varchar(255) not null default \'password\';');
  }

}
