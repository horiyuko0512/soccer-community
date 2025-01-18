"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { makeClient } from "./apollo";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}