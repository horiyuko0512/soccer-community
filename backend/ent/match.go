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
	"github.com/horiyuko0512/soccer-community/ent/user"
)

// Match is the model entity for the Match schema.
type Match struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// Title holds the value of the "title" field.
	Title string `json:"title,omitempty"`
	// StartAt holds the value of the "start_at" field.
	StartAt time.Time `json:"start_at,omitempty"`
	// EndAt holds the value of the "end_at" field.
	EndAt time.Time `json:"end_at,omitempty"`
	// Location holds the value of the "location" field.
	Location string `json:"location,omitempty"`
	// Level holds the value of the "level" field.
	Level match.Level `json:"level,omitempty"`
	// Participants holds the value of the "participants" field.
	Participants int `json:"participants,omitempty"`
	// Fee holds the value of the "fee" field.
	Fee int `json:"fee,omitempty"`
	// Notes holds the value of the "notes" field.
	Notes string `json:"notes,omitempty"`
	// CreatorID holds the value of the "creator_id" field.
	CreatorID uuid.UUID `json:"creator_id,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// UpdatedAt holds the value of the "updated_at" field.
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// IsApplied holds the value of the "is_applied" field.
	IsApplied bool `json:"is_applied,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the MatchQuery when eager-loading is set.
	Edges        MatchEdges `json:"edges"`
	selectValues sql.SelectValues
}

// MatchEdges holds the relations/edges for other nodes in the graph.
type MatchEdges struct {
	// Creator holds the value of the creator edge.
	Creator *User `json:"creator,omitempty"`
	// MatchParticipation holds the value of the match_participation edge.
	MatchParticipation []*Participation `json:"match_participation,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
	// totalCount holds the count of the edges above.
	totalCount [2]map[string]int

	namedMatchParticipation map[string][]*Participation
}

// CreatorOrErr returns the Creator value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e MatchEdges) CreatorOrErr() (*User, error) {
	if e.Creator != nil {
		return e.Creator, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: user.Label}
	}
	return nil, &NotLoadedError{edge: "creator"}
}

// MatchParticipationOrErr returns the MatchParticipation value or an error if the edge
// was not loaded in eager-loading.
func (e MatchEdges) MatchParticipationOrErr() ([]*Participation, error) {
	if e.loadedTypes[1] {
		return e.MatchParticipation, nil
	}
	return nil, &NotLoadedError{edge: "match_participation"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Match) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case match.FieldIsApplied:
			values[i] = new(sql.NullBool)
		case match.FieldParticipants, match.FieldFee:
			values[i] = new(sql.NullInt64)
		case match.FieldTitle, match.FieldLocation, match.FieldLevel, match.FieldNotes:
			values[i] = new(sql.NullString)
		case match.FieldStartAt, match.FieldEndAt, match.FieldCreatedAt, match.FieldUpdatedAt:
			values[i] = new(sql.NullTime)
		case match.FieldID, match.FieldCreatorID:
			values[i] = new(uuid.UUID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Match fields.
func (m *Match) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case match.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				m.ID = *value
			}
		case match.FieldTitle:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field title", values[i])
			} else if value.Valid {
				m.Title = value.String
			}
		case match.FieldStartAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field start_at", values[i])
			} else if value.Valid {
				m.StartAt = value.Time
			}
		case match.FieldEndAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field end_at", values[i])
			} else if value.Valid {
				m.EndAt = value.Time
			}
		case match.FieldLocation:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field location", values[i])
			} else if value.Valid {
				m.Location = value.String
			}
		case match.FieldLevel:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field level", values[i])
			} else if value.Valid {
				m.Level = match.Level(value.String)
			}
		case match.FieldParticipants:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field participants", values[i])
			} else if value.Valid {
				m.Participants = int(value.Int64)
			}
		case match.FieldFee:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field fee", values[i])
			} else if value.Valid {
				m.Fee = int(value.Int64)
			}
		case match.FieldNotes:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field notes", values[i])
			} else if value.Valid {
				m.Notes = value.String
			}
		case match.FieldCreatorID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field creator_id", values[i])
			} else if value != nil {
				m.CreatorID = *value
			}
		case match.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				m.CreatedAt = value.Time
			}
		case match.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				m.UpdatedAt = value.Time
			}
		case match.FieldIsApplied:
			if value, ok := values[i].(*sql.NullBool); !ok {
				return fmt.Errorf("unexpected type %T for field is_applied", values[i])
			} else if value.Valid {
				m.IsApplied = value.Bool
			}
		default:
			m.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Match.
// This includes values selected through modifiers, order, etc.
func (m *Match) Value(name string) (ent.Value, error) {
	return m.selectValues.Get(name)
}

// QueryCreator queries the "creator" edge of the Match entity.
func (m *Match) QueryCreator() *UserQuery {
	return NewMatchClient(m.config).QueryCreator(m)
}

// QueryMatchParticipation queries the "match_participation" edge of the Match entity.
func (m *Match) QueryMatchParticipation() *ParticipationQuery {
	return NewMatchClient(m.config).QueryMatchParticipation(m)
}

// Update returns a builder for updating this Match.
// Note that you need to call Match.Unwrap() before calling this method if this Match
// was returned from a transaction, and the transaction was committed or rolled back.
func (m *Match) Update() *MatchUpdateOne {
	return NewMatchClient(m.config).UpdateOne(m)
}

// Unwrap unwraps the Match entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (m *Match) Unwrap() *Match {
	_tx, ok := m.config.driver.(*txDriver)
	if !ok {
		panic("ent: Match is not a transactional entity")
	}
	m.config.driver = _tx.drv
	return m
}

// String implements the fmt.Stringer.
func (m *Match) String() string {
	var builder strings.Builder
	builder.WriteString("Match(")
	builder.WriteString(fmt.Sprintf("id=%v, ", m.ID))
	builder.WriteString("title=")
	builder.WriteString(m.Title)
	builder.WriteString(", ")
	builder.WriteString("start_at=")
	builder.WriteString(m.StartAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("end_at=")
	builder.WriteString(m.EndAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("location=")
	builder.WriteString(m.Location)
	builder.WriteString(", ")
	builder.WriteString("level=")
	builder.WriteString(fmt.Sprintf("%v", m.Level))
	builder.WriteString(", ")
	builder.WriteString("participants=")
	builder.WriteString(fmt.Sprintf("%v", m.Participants))
	builder.WriteString(", ")
	builder.WriteString("fee=")
	builder.WriteString(fmt.Sprintf("%v", m.Fee))
	builder.WriteString(", ")
	builder.WriteString("notes=")
	builder.WriteString(m.Notes)
	builder.WriteString(", ")
	builder.WriteString("creator_id=")
	builder.WriteString(fmt.Sprintf("%v", m.CreatorID))
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(m.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(m.UpdatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("is_applied=")
	builder.WriteString(fmt.Sprintf("%v", m.IsApplied))
	builder.WriteByte(')')
	return builder.String()
}

// NamedMatchParticipation returns the MatchParticipation named value or an error if the edge was not
// loaded in eager-loading with this name.
func (m *Match) NamedMatchParticipation(name string) ([]*Participation, error) {
	if m.Edges.namedMatchParticipation == nil {
		return nil, &NotLoadedError{edge: name}
	}
	nodes, ok := m.Edges.namedMatchParticipation[name]
	if !ok {
		return nil, &NotLoadedError{edge: name}
	}
	return nodes, nil
}

func (m *Match) appendNamedMatchParticipation(name string, edges ...*Participation) {
	if m.Edges.namedMatchParticipation == nil {
		m.Edges.namedMatchParticipation = make(map[string][]*Participation)
	}
	if len(edges) == 0 {
		m.Edges.namedMatchParticipation[name] = []*Participation{}
	} else {
		m.Edges.namedMatchParticipation[name] = append(m.Edges.namedMatchParticipation[name], edges...)
	}
}

// Matches is a parsable slice of Match.
type Matches []*Match
