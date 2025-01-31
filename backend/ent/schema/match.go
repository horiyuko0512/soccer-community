package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

// Match holds the schema definition for the Match entity.
type Match struct {
	ent.Schema
}

// Fields of the Match.
func (Match) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.String("title").
			NotEmpty().
			MaxLen(50),
		field.Time("start_at"),
		field.Time("end_at"),
		field.String("location").
			NotEmpty(),
		field.Enum("level").
			Values("beginner", "intermediate", "advanced"),
		field.Int("participants").
			Positive(),
		field.Int("fee").
			NonNegative(),
		field.String("notes").
			MaxLen(500),
		field.UUID("creator_id", uuid.UUID{}),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
		field.Bool("is_applied").
			Default(true),
	}
}

// Edges of the Match.
func (Match) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("creator", User.Type).
			Ref("matches").
			Unique().
			Required().
			Field("creator_id"),
		edge.To("match_participation", Participation.Type),
	}
}

func (Match) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("id", "creator_id").Unique(),
		index.Fields("start_at"),
		index.Fields("end_at"),
		index.Fields("location"),
		index.Fields("level"),
	}
}

func (Match) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}