"use client";
import * as React from "react";
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  fetchUtils,
} from "react-admin";
import { supabaseAuthProvider, LoginPage } from "ra-supabase";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/components/database.types";
import postgrestRestProvider, {
  IDataProviderConfig,
  defaultPrimaryKeys,
  defaultSchema,
} from "@raphiniert/ra-data-postgrest";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const config: IDataProviderConfig = {
  apiUrl: "/api/admin",
  httpClient: fetchUtils.fetchJson,
  defaultListOp: "eq",
  primaryKeys: defaultPrimaryKeys,
  schema: defaultSchema,
};

const dataProvider = postgrestRestProvider(config);

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
      name="contributors"
      options={{ label: "contributors" }}
      list={ListGuesser}
      edit={EditGuesser}
    />
    <Resource
      name="questions"
      options={{ label: "questions" }}
      list={ListGuesser}
      edit={EditGuesser}
    />
    <Resource
      name="open_source_licenses"
      options={{ label: "open_source_licenses" }}
      list={ListGuesser}
      edit={EditGuesser}
    />
    <Resource
      name="mbtis"
      options={{ label: "mbtis" }}
      list={ListGuesser}
      edit={EditGuesser}
    />
    <Resource
      name="user_mbti_history"
      options={{ label: "user_mbti_history" }}
      list={ListGuesser}
      edit={EditGuesser}
    />
  </Admin>
);

export default AdminApp;
