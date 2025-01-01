// +build ignore

package main

import (
    "log"

    "entgo.io/ent/entc"
    "entgo.io/ent/entc/gen"
    "entgo.io/contrib/entgql"
)

func main() {
    ex, err := entgql.NewExtension(
			entgql.WithConfigPath("../gqlgen.yml"),
			entgql.WithSchemaGenerator(),
			entgql.WithWhereInputs(true),
			entgql.WithSchemaPath("../graph/schema/ent.graphqls"),
		)
    if err != nil {
        log.Fatalf("creating entgql extension: %v", err)
    }
    if err := entc.Generate("./schema", &gen.Config{}, entc.Extensions(ex)); err != nil {
        log.Fatalf("running ent codegen: %v", err)
    }
}