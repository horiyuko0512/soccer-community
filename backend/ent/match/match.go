// Code generated by ent, DO NOT EDIT.

package match

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

const (
	// Label holds the string label denoting the match type in the database.
	Label = "match"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldTitle holds the string denoting the title field in the database.
	FieldTitle = "title"
	// FieldStartAt holds the string denoting the start_at field in the database.
	FieldStartAt = "start_at"
	// FieldEndAt holds the string denoting the end_at field in the database.
	FieldEndAt = "end_at"
	// FieldLocation holds the string denoting the location field in the database.
	FieldLocation = "location"
	// FieldLevel holds the string denoting the level field in the database.
	FieldLevel = "level"
	// FieldParticipants holds the string denoting the participants field in the database.
	FieldParticipants = "participants"
	// FieldFee holds the string denoting the fee field in the database.
	FieldFee = "fee"
	// FieldNotes holds the string denoting the notes field in the database.
	FieldNotes = "notes"
	// FieldCreatorID holds the string denoting the creator_id field in the database.
	FieldCreatorID = "creator_id"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// FieldIsApplied holds the string denoting the is_applied field in the database.
	FieldIsApplied = "is_applied"
	// EdgeCreator holds the string denoting the creator edge name in mutations.
	EdgeCreator = "creator"
	// EdgeMatchParticipation holds the string denoting the match_participation edge name in mutations.
	EdgeMatchParticipation = "match_participation"
	// Table holds the table name of the match in the database.
	Table = "matches"
	// CreatorTable is the table that holds the creator relation/edge.
	CreatorTable = "matches"
	// CreatorInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	CreatorInverseTable = "users"
	// CreatorColumn is the table column denoting the creator relation/edge.
	CreatorColumn = "creator_id"
	// MatchParticipationTable is the table that holds the match_participation relation/edge.
	MatchParticipationTable = "participations"
	// MatchParticipationInverseTable is the table name for the Participation entity.
	// It exists in this package in order to avoid circular dependency with the "participation" package.
	MatchParticipationInverseTable = "participations"
	// MatchParticipationColumn is the table column denoting the match_participation relation/edge.
	MatchParticipationColumn = "match_id"
)

// Columns holds all SQL columns for match fields.
var Columns = []string{
	FieldID,
	FieldTitle,
	FieldStartAt,
	FieldEndAt,
	FieldLocation,
	FieldLevel,
	FieldParticipants,
	FieldFee,
	FieldNotes,
	FieldCreatorID,
	FieldCreatedAt,
	FieldUpdatedAt,
	FieldIsApplied,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// TitleValidator is a validator for the "title" field. It is called by the builders before save.
	TitleValidator func(string) error
	// LocationValidator is a validator for the "location" field. It is called by the builders before save.
	LocationValidator func(string) error
	// ParticipantsValidator is a validator for the "participants" field. It is called by the builders before save.
	ParticipantsValidator func(int) error
	// FeeValidator is a validator for the "fee" field. It is called by the builders before save.
	FeeValidator func(int) error
	// NotesValidator is a validator for the "notes" field. It is called by the builders before save.
	NotesValidator func(string) error
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultUpdatedAt holds the default value on creation for the "updated_at" field.
	DefaultUpdatedAt func() time.Time
	// UpdateDefaultUpdatedAt holds the default value on update for the "updated_at" field.
	UpdateDefaultUpdatedAt func() time.Time
	// DefaultIsApplied holds the default value on creation for the "is_applied" field.
	DefaultIsApplied bool
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() uuid.UUID
)

// Level defines the type for the "level" enum field.
type Level string

// Level values.
const (
	LevelBeginner     Level = "beginner"
	LevelIntermediate Level = "intermediate"
	LevelAdvanced     Level = "advanced"
)

func (l Level) String() string {
	return string(l)
}

// LevelValidator is a validator for the "level" field enum values. It is called by the builders before save.
func LevelValidator(l Level) error {
	switch l {
	case LevelBeginner, LevelIntermediate, LevelAdvanced:
		return nil
	default:
		return fmt.Errorf("match: invalid enum value for level field: %q", l)
	}
}

// OrderOption defines the ordering options for the Match queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByTitle orders the results by the title field.
func ByTitle(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldTitle, opts...).ToFunc()
}

// ByStartAt orders the results by the start_at field.
func ByStartAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldStartAt, opts...).ToFunc()
}

// ByEndAt orders the results by the end_at field.
func ByEndAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldEndAt, opts...).ToFunc()
}

// ByLocation orders the results by the location field.
func ByLocation(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLocation, opts...).ToFunc()
}

// ByLevel orders the results by the level field.
func ByLevel(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLevel, opts...).ToFunc()
}

// ByParticipants orders the results by the participants field.
func ByParticipants(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldParticipants, opts...).ToFunc()
}

// ByFee orders the results by the fee field.
func ByFee(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldFee, opts...).ToFunc()
}

// ByNotes orders the results by the notes field.
func ByNotes(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldNotes, opts...).ToFunc()
}

// ByCreatorID orders the results by the creator_id field.
func ByCreatorID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatorID, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}

// ByUpdatedAt orders the results by the updated_at field.
func ByUpdatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUpdatedAt, opts...).ToFunc()
}

// ByIsApplied orders the results by the is_applied field.
func ByIsApplied(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldIsApplied, opts...).ToFunc()
}

// ByCreatorField orders the results by creator field.
func ByCreatorField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newCreatorStep(), sql.OrderByField(field, opts...))
	}
}

// ByMatchParticipationCount orders the results by match_participation count.
func ByMatchParticipationCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newMatchParticipationStep(), opts...)
	}
}

// ByMatchParticipation orders the results by match_participation terms.
func ByMatchParticipation(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newMatchParticipationStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}
func newCreatorStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(CreatorInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, CreatorTable, CreatorColumn),
	)
}
func newMatchParticipationStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(MatchParticipationInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, MatchParticipationTable, MatchParticipationColumn),
	)
}

// MarshalGQL implements graphql.Marshaler interface.
func (e Level) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(e.String()))
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (e *Level) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*e = Level(str)
	if err := LevelValidator(*e); err != nil {
		return fmt.Errorf("%s is not a valid Level", str)
	}
	return nil
}
