drop table if exists decks;

create table decks
(
	id bigserial not null,
  owner bigint not null
  constraint table_name_users_id_fk
    references users,
	name varchar(255) not null,
	slug varchar(255) not null,
	description varchar(255),
	created_at timestamp not null,
	updated_at timestamp not null
);

create unique index decks_id_uindex
	on decks (id);

create unique index decks_slug_uindex
	on decks (owner, slug);

alter table decks
	add constraint decks_pk
		primary key (id);
