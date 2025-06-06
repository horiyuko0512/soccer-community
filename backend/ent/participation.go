// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
	"github.com/horiyuko0512/soccer-community/ent/match"
	"github.com/horiyuko0512/soccer-community/ent/participation"
	"github.com/horiyuko0512/soccer-community/ent/user"
)

// Participation is the model entity for the Participation schema.
type Participation struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// UserID holds the value of the "user_id" field.
	UserID uuid.UUID `json:"user_id,omitempty"`
	// MatchID holds the value of the "match_id" field.
	MatchID uuid.UUID `json:"match_id,omitempty"`
	// Status holds the value of the "status" field.
	Status participation.Status `json:"status,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// UpdatedAt holds the value of the "updated_at" field.
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ParticipationQuery when eager-loading is set.
	Edges        ParticipationEdges `json:"edges"`
	selectValues sql.SelectValues
}

// ParticipationEdges holds the relations/edges for other nodes in the graph.
type ParticipationEdges struct {
	// User holds the value of the user edge.
	User *User `json:"user,omitempty"`
	// Match holds the value of the match edge.
	Match *Match `json:"match,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
	// totalCount holds the count of the edges above.
	totalCount [2]map[string]int
}

// UserOrErr returns the User value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ParticipationEdges) UserOrErr() (*User, error) {
	if e.User != nil {
		return e.User, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: user.Label}
	}
	return nil, &NotLoadedError{edge: "user"}
}

// MatchOrErr returns the Match value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ParticipationEdges) MatchOrErr() (*Match, error) {
	if e.Match != nil {
		return e.Match, nil
	} else if e.loadedTypes[1] {
		return nil, &NotFoundError{label: match.Label}
	}
	return nil, &NotLoadedError{edge: "match"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Participation) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case participation.FieldStatus:
			values[i] = new(sql.NullString)
		case participation.FieldCreatedAt, participation.FieldUpdatedAt:
			values[i] = new(sql.NullTime)
		case participation.FieldID, participation.FieldUserID, participation.FieldMatchID:
			values[i] = new(uuid.UUID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Participation fields.
func (pa *Participation) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case participation.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				pa.ID = *value
			}
		case participation.FieldUserID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field user_id", values[i])
			} else if value != nil {
				pa.UserID = *value
			}
		case participation.FieldMatchID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field match_id", values[i])
			} else if value != nil {
				pa.MatchID = *value
			}
		case participation.FieldStatus:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field status", values[i])
			} else if value.Valid {
				pa.Status = participation.Status(value.String)
			}
		case participation.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				pa.CreatedAt = value.Time
			}
		case participation.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				pa.UpdatedAt = value.Time
			}
		default:
			pa.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Participation.
// This includes values selected through modifiers, order, etc.
func (pa *Participation) Value(name string) (ent.Value, error) {
	return pa.selectValues.Get(name)
}

// QueryUser queries the "user" edge of the Participation entity.
func (pa *Participation) QueryUser() *UserQuery {
	return NewParticipationClient(pa.config).QueryUser(pa)
}

// QueryMatch queries the "match" edge of the Participation entity.
func (pa *Participation) QueryMatch() *MatchQuery {
	return NewParticipationClient(pa.config).QueryMatch(pa)
}

// Update returns a builder for updating this Participation.
// Note that you need to call Participation.Unwrap() before calling this method if this Participation
// was returned from a transaction, and the transaction was committed or rolled back.
func (pa *Participation) Update() *ParticipationUpdateOne {
	return NewParticipationClient(pa.config).UpdateOne(pa)
}

// Unwrap unwraps the Participation entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (pa *Participation) Unwrap() *Participation {
	_tx, ok := pa.config.driver.(*txDriver)
	if !ok {
		panic("ent: Participation is not a transactional entity")
	}
	pa.config.driver = _tx.drv
	return pa
}

// String implements the fmt.Stringer.
func (pa *Participation) String() string {
	var builder strings.Builder
	builder.WriteString("Participation(")
	builder.WriteString(fmt.Sprintf("id=%v, ", pa.ID))
	builder.WriteString("user_id=")
	builder.WriteString(fmt.Sprintf("%v", pa.UserID))
	builder.WriteString(", ")
	builder.WriteString("match_id=")
	builder.WriteString(fmt.Sprintf("%v", pa.MatchID))
	builder.WriteString(", ")
	builder.WriteString("status=")
	builder.WriteString(fmt.Sprintf("%v", pa.Status))
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(pa.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(pa.UpdatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// Participations is a parsable slice of Participation.
type Participations []*Participation
