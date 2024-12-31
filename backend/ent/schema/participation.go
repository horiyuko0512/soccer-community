package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

// Participation holds the schema definition for the Participation entity.
type Participation struct {
	ent.Schema
}

// Fields of the Participation.
func (Participation) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.UUID("user_id", uuid.UUID{}),
		field.UUID("match_id", uuid.UUID{}),
		field.Enum("status").
			Values("pending", "approved", "rejected", "cancelled").
			Default("pending"),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Participation.
func (Participation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("user_participation").
			Unique().
			Required().
			Field("user_id"),
		edge.From("match", Match.Type).
			Ref("match_participation").
			Unique().
			Required().
			Field("match_id"),
	}
}

func (Participation) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("user_id", "match_id").
      Unique(),
    index.Fields("status"),
    index.Fields("created_at"),
	}
}
