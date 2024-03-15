create or replace view "public"."users" as  SELECT users.id,
    users.phone,
    users.email
   FROM auth.users;


create policy "Enable select for service_role only"
on "public"."user_mbti_history"
as permissive
for select
to service_role
using (true);



