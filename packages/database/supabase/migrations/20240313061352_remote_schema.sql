create type "public"."mbti" as enum ('ISTP', 'ISTJ', 'ISFP', 'INTP', 'INTJ', 'ISFJ', 'INFJ', 'INFP', 'ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENFJ', 'ENFP');

create sequence "public"."user_mbti_history_id_seq";

create table "public"."user_mbti_history" (
    "id" integer not null default nextval('user_mbti_history_id_seq'::regclass),
    "user_id" uuid,
    "name" text not null,
    "mbti" text,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."user_mbti_history" enable row level security;

alter table "public"."contributors" enable row level security;

alter table "public"."mbtis" enable row level security;

alter table "public"."open_source_licenses" enable row level security;

alter table "public"."questions" enable row level security;

alter sequence "public"."user_mbti_history_id_seq" owned by "public"."user_mbti_history"."id";

CREATE UNIQUE INDEX user_mbti_history_pkey ON public.user_mbti_history USING btree (id);

alter table "public"."user_mbti_history" add constraint "user_mbti_history_pkey" PRIMARY KEY using index "user_mbti_history_pkey";

alter table "public"."user_mbti_history" add constraint "user_mbti_history_mbti_mbtis_mbti_fk" FOREIGN KEY (mbti) REFERENCES mbtis(mbti) ON DELETE CASCADE not valid;

alter table "public"."user_mbti_history" validate constraint "user_mbti_history_mbti_mbtis_mbti_fk";

alter table "public"."user_mbti_history" add constraint "user_mbti_history_user_id_users_id_fk" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_mbti_history" validate constraint "user_mbti_history_user_id_users_id_fk";

grant delete on table "public"."user_mbti_history" to "anon";

grant insert on table "public"."user_mbti_history" to "anon";

grant references on table "public"."user_mbti_history" to "anon";

grant select on table "public"."user_mbti_history" to "anon";

grant trigger on table "public"."user_mbti_history" to "anon";

grant truncate on table "public"."user_mbti_history" to "anon";

grant update on table "public"."user_mbti_history" to "anon";

grant delete on table "public"."user_mbti_history" to "authenticated";

grant insert on table "public"."user_mbti_history" to "authenticated";

grant references on table "public"."user_mbti_history" to "authenticated";

grant select on table "public"."user_mbti_history" to "authenticated";

grant trigger on table "public"."user_mbti_history" to "authenticated";

grant truncate on table "public"."user_mbti_history" to "authenticated";

grant update on table "public"."user_mbti_history" to "authenticated";

grant delete on table "public"."user_mbti_history" to "service_role";

grant insert on table "public"."user_mbti_history" to "service_role";

grant references on table "public"."user_mbti_history" to "service_role";

grant select on table "public"."user_mbti_history" to "service_role";

grant trigger on table "public"."user_mbti_history" to "service_role";

grant truncate on table "public"."user_mbti_history" to "service_role";

grant update on table "public"."user_mbti_history" to "service_role";

create policy "Enable read access for all users"
on "public"."contributors"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."mbtis"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."open_source_licenses"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."questions"
as permissive
for select
to public
using (true);



