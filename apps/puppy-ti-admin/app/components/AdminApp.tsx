"use client"; // remove this line if you choose Pages Router
import * as React from "react";
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  fetchUtils,
} from "react-admin";
import {
  supabaseAuthProvider,
  supabaseDataProvider,
  LoginPage,
} from "ra-supabase";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const dataProvider = supabaseDataProvider({
  instanceUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseClient,
  schema: () => "public",
});

export const authProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    return {
      id: user.id,
      fullName: user.email,
    };
  },
});

const AdminApp = () => (
  <Admin
    loginPage={<LoginPage />}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="questions"
      options={{ label: "questions" }}
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="name"
    />
    <Resource
      name="user_mbti_history"
      options={{ label: "user_mbti_history" }}
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="id"
    />
    {/* <Resource
      name="posts"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="title"
    />
    <Resource name="comments" list={ListGuesser} edit={EditGuesser} /> */}
  </Admin>
);

export default AdminApp;
