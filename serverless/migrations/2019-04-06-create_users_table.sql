drop table if exists users;

create table users
(
	id bigserial not null,
	email varchar(255) not null,
	password varchar(255) not null,
	name varchar(255) not null,
	created_at timestamp not null,
	updated_at timestamp not null
);

create unique index users_email_uindex
	on users (email);

create unique index users_id_uindex
	on users (id);

alter table users
	add constraint users_pk
		primary key (id);
