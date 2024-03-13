alter table "public"."contributors" enable row level security;

alter table "public"."mbtis" enable row level security;

alter table "public"."open_source_licenses" enable row level security;

alter table "public"."questions" enable row level security;

alter table "public"."user_mbti_history" enable row level security;

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


create policy "Enable insert access for service_role"
on "public"."user_mbti_history"
as permissive
for insert
to service_role
with check (true);


create policy "Enable select for authenticated owner only"
on "public"."user_mbti_history"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));



