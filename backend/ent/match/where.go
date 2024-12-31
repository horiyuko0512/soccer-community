// Code generated by ent, DO NOT EDIT.

package match

import (
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
	"github.com/horiyuko0512/soccer-community/ent/predicate"
)

// ID filters vertices based on their ID field.
func ID(id uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldID, id))
}

// Title applies equality check predicate on the "title" field. It's identical to TitleEQ.
func Title(v string) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldTitle, v))
}

// Date applies equality check predicate on the "date" field. It's identical to DateEQ.
func Date(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldDate, v))
}

// Location applies equality check predicate on the "location" field. It's identical to LocationEQ.
func Location(v string) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldLocation, v))
}

// Participants applies equality check predicate on the "participants" field. It's identical to ParticipantsEQ.
func Participants(v int) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldParticipants, v))
}

// Fee applies equality check predicate on the "fee" field. It's identical to FeeEQ.
func Fee(v int) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldFee, v))
}

// Notes applies equality check predicate on the "notes" field. It's identical to NotesEQ.
func Notes(v string) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldNotes, v))
}

// CreatorID applies equality check predicate on the "creator_id" field. It's identical to CreatorIDEQ.
func CreatorID(v uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldCreatorID, v))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldUpdatedAt, v))
}

// IsApplied applies equality check predicate on the "is_applied" field. It's identical to IsAppliedEQ.
func IsApplied(v bool) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldIsApplied, v))
}

// TitleEQ applies the EQ predicate on the "title" field.
func TitleEQ(v string) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldTitle, v))
}

// TitleNEQ applies the NEQ predicate on the "title" field.
func TitleNEQ(v string) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldTitle, v))
}

// TitleIn applies the In predicate on the "title" field.
func TitleIn(vs ...string) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldTitle, vs...))
}

// TitleNotIn applies the NotIn predicate on the "title" field.
func TitleNotIn(vs ...string) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldTitle, vs...))
}

// TitleGT applies the GT predicate on the "title" field.
func TitleGT(v string) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldTitle, v))
}

// TitleGTE applies the GTE predicate on the "title" field.
func TitleGTE(v string) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldTitle, v))
}

// TitleLT applies the LT predicate on the "title" field.
func TitleLT(v string) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldTitle, v))
}

// TitleLTE applies the LTE predicate on the "title" field.
func TitleLTE(v string) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldTitle, v))
}

// TitleContains applies the Contains predicate on the "title" field.
func TitleContains(v string) predicate.Match {
	return predicate.Match(sql.FieldContains(FieldTitle, v))
}

// TitleHasPrefix applies the HasPrefix predicate on the "title" field.
func TitleHasPrefix(v string) predicate.Match {
	return predicate.Match(sql.FieldHasPrefix(FieldTitle, v))
}

// TitleHasSuffix applies the HasSuffix predicate on the "title" field.
func TitleHasSuffix(v string) predicate.Match {
	return predicate.Match(sql.FieldHasSuffix(FieldTitle, v))
}

// TitleEqualFold applies the EqualFold predicate on the "title" field.
func TitleEqualFold(v string) predicate.Match {
	return predicate.Match(sql.FieldEqualFold(FieldTitle, v))
}

// TitleContainsFold applies the ContainsFold predicate on the "title" field.
func TitleContainsFold(v string) predicate.Match {
	return predicate.Match(sql.FieldContainsFold(FieldTitle, v))
}

// DateEQ applies the EQ predicate on the "date" field.
func DateEQ(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldDate, v))
}

// DateNEQ applies the NEQ predicate on the "date" field.
func DateNEQ(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldDate, v))
}

// DateIn applies the In predicate on the "date" field.
func DateIn(vs ...time.Time) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldDate, vs...))
}

// DateNotIn applies the NotIn predicate on the "date" field.
func DateNotIn(vs ...time.Time) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldDate, vs...))
}

// DateGT applies the GT predicate on the "date" field.
func DateGT(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldDate, v))
}

// DateGTE applies the GTE predicate on the "date" field.
func DateGTE(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldDate, v))
}

// DateLT applies the LT predicate on the "date" field.
func DateLT(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldDate, v))
}

// DateLTE applies the LTE predicate on the "date" field.
func DateLTE(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldDate, v))
}

// LocationEQ applies the EQ predicate on the "location" field.
func LocationEQ(v string) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldLocation, v))
}

// LocationNEQ applies the NEQ predicate on the "location" field.
func LocationNEQ(v string) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldLocation, v))
}

// LocationIn applies the In predicate on the "location" field.
func LocationIn(vs ...string) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldLocation, vs...))
}

// LocationNotIn applies the NotIn predicate on the "location" field.
func LocationNotIn(vs ...string) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldLocation, vs...))
}

// LocationGT applies the GT predicate on the "location" field.
func LocationGT(v string) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldLocation, v))
}

// LocationGTE applies the GTE predicate on the "location" field.
func LocationGTE(v string) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldLocation, v))
}

// LocationLT applies the LT predicate on the "location" field.
func LocationLT(v string) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldLocation, v))
}

// LocationLTE applies the LTE predicate on the "location" field.
func LocationLTE(v string) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldLocation, v))
}

// LocationContains applies the Contains predicate on the "location" field.
func LocationContains(v string) predicate.Match {
	return predicate.Match(sql.FieldContains(FieldLocation, v))
}

// LocationHasPrefix applies the HasPrefix predicate on the "location" field.
func LocationHasPrefix(v string) predicate.Match {
	return predicate.Match(sql.FieldHasPrefix(FieldLocation, v))
}

// LocationHasSuffix applies the HasSuffix predicate on the "location" field.
func LocationHasSuffix(v string) predicate.Match {
	return predicate.Match(sql.FieldHasSuffix(FieldLocation, v))
}

// LocationEqualFold applies the EqualFold predicate on the "location" field.
func LocationEqualFold(v string) predicate.Match {
	return predicate.Match(sql.FieldEqualFold(FieldLocation, v))
}

// LocationContainsFold applies the ContainsFold predicate on the "location" field.
func LocationContainsFold(v string) predicate.Match {
	return predicate.Match(sql.FieldContainsFold(FieldLocation, v))
}

// LevelEQ applies the EQ predicate on the "level" field.
func LevelEQ(v Level) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldLevel, v))
}

// LevelNEQ applies the NEQ predicate on the "level" field.
func LevelNEQ(v Level) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldLevel, v))
}

// LevelIn applies the In predicate on the "level" field.
func LevelIn(vs ...Level) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldLevel, vs...))
}

// LevelNotIn applies the NotIn predicate on the "level" field.
func LevelNotIn(vs ...Level) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldLevel, vs...))
}

// ParticipantsEQ applies the EQ predicate on the "participants" field.
func ParticipantsEQ(v int) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldParticipants, v))
}

// ParticipantsNEQ applies the NEQ predicate on the "participants" field.
func ParticipantsNEQ(v int) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldParticipants, v))
}

// ParticipantsIn applies the In predicate on the "participants" field.
func ParticipantsIn(vs ...int) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldParticipants, vs...))
}

// ParticipantsNotIn applies the NotIn predicate on the "participants" field.
func ParticipantsNotIn(vs ...int) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldParticipants, vs...))
}

// ParticipantsGT applies the GT predicate on the "participants" field.
func ParticipantsGT(v int) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldParticipants, v))
}

// ParticipantsGTE applies the GTE predicate on the "participants" field.
func ParticipantsGTE(v int) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldParticipants, v))
}

// ParticipantsLT applies the LT predicate on the "participants" field.
func ParticipantsLT(v int) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldParticipants, v))
}

// ParticipantsLTE applies the LTE predicate on the "participants" field.
func ParticipantsLTE(v int) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldParticipants, v))
}

// FeeEQ applies the EQ predicate on the "fee" field.
func FeeEQ(v int) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldFee, v))
}

// FeeNEQ applies the NEQ predicate on the "fee" field.
func FeeNEQ(v int) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldFee, v))
}

// FeeIn applies the In predicate on the "fee" field.
func FeeIn(vs ...int) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldFee, vs...))
}

// FeeNotIn applies the NotIn predicate on the "fee" field.
func FeeNotIn(vs ...int) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldFee, vs...))
}

// FeeGT applies the GT predicate on the "fee" field.
func FeeGT(v int) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldFee, v))
}

// FeeGTE applies the GTE predicate on the "fee" field.
func FeeGTE(v int) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldFee, v))
}

// FeeLT applies the LT predicate on the "fee" field.
func FeeLT(v int) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldFee, v))
}

// FeeLTE applies the LTE predicate on the "fee" field.
func FeeLTE(v int) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldFee, v))
}

// NotesEQ applies the EQ predicate on the "notes" field.
func NotesEQ(v string) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldNotes, v))
}

// NotesNEQ applies the NEQ predicate on the "notes" field.
func NotesNEQ(v string) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldNotes, v))
}

// NotesIn applies the In predicate on the "notes" field.
func NotesIn(vs ...string) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldNotes, vs...))
}

// NotesNotIn applies the NotIn predicate on the "notes" field.
func NotesNotIn(vs ...string) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldNotes, vs...))
}

// NotesGT applies the GT predicate on the "notes" field.
func NotesGT(v string) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldNotes, v))
}

// NotesGTE applies the GTE predicate on the "notes" field.
func NotesGTE(v string) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldNotes, v))
}

// NotesLT applies the LT predicate on the "notes" field.
func NotesLT(v string) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldNotes, v))
}

// NotesLTE applies the LTE predicate on the "notes" field.
func NotesLTE(v string) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldNotes, v))
}

// NotesContains applies the Contains predicate on the "notes" field.
func NotesContains(v string) predicate.Match {
	return predicate.Match(sql.FieldContains(FieldNotes, v))
}

// NotesHasPrefix applies the HasPrefix predicate on the "notes" field.
func NotesHasPrefix(v string) predicate.Match {
	return predicate.Match(sql.FieldHasPrefix(FieldNotes, v))
}

// NotesHasSuffix applies the HasSuffix predicate on the "notes" field.
func NotesHasSuffix(v string) predicate.Match {
	return predicate.Match(sql.FieldHasSuffix(FieldNotes, v))
}

// NotesEqualFold applies the EqualFold predicate on the "notes" field.
func NotesEqualFold(v string) predicate.Match {
	return predicate.Match(sql.FieldEqualFold(FieldNotes, v))
}

// NotesContainsFold applies the ContainsFold predicate on the "notes" field.
func NotesContainsFold(v string) predicate.Match {
	return predicate.Match(sql.FieldContainsFold(FieldNotes, v))
}

// CreatorIDEQ applies the EQ predicate on the "creator_id" field.
func CreatorIDEQ(v uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldCreatorID, v))
}

// CreatorIDNEQ applies the NEQ predicate on the "creator_id" field.
func CreatorIDNEQ(v uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldCreatorID, v))
}

// CreatorIDIn applies the In predicate on the "creator_id" field.
func CreatorIDIn(vs ...uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldCreatorID, vs...))
}

// CreatorIDNotIn applies the NotIn predicate on the "creator_id" field.
func CreatorIDNotIn(vs ...uuid.UUID) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldCreatorID, vs...))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.Match {
	return predicate.Match(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.Match {
	return predicate.Match(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.Match {
	return predicate.Match(sql.FieldLTE(FieldUpdatedAt, v))
}

// IsAppliedEQ applies the EQ predicate on the "is_applied" field.
func IsAppliedEQ(v bool) predicate.Match {
	return predicate.Match(sql.FieldEQ(FieldIsApplied, v))
}

// IsAppliedNEQ applies the NEQ predicate on the "is_applied" field.
func IsAppliedNEQ(v bool) predicate.Match {
	return predicate.Match(sql.FieldNEQ(FieldIsApplied, v))
}

// HasCreator applies the HasEdge predicate on the "creator" edge.
func HasCreator() predicate.Match {
	return predicate.Match(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, CreatorTable, CreatorColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasCreatorWith applies the HasEdge predicate on the "creator" edge with a given conditions (other predicates).
func HasCreatorWith(preds ...predicate.User) predicate.Match {
	return predicate.Match(func(s *sql.Selector) {
		step := newCreatorStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasMatchParticipation applies the HasEdge predicate on the "match_participation" edge.
func HasMatchParticipation() predicate.Match {
	return predicate.Match(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, MatchParticipationTable, MatchParticipationColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasMatchParticipationWith applies the HasEdge predicate on the "match_participation" edge with a given conditions (other predicates).
func HasMatchParticipationWith(preds ...predicate.Participation) predicate.Match {
	return predicate.Match(func(s *sql.Selector) {
		step := newMatchParticipationStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Match) predicate.Match {
	return predicate.Match(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Match) predicate.Match {
	return predicate.Match(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Match) predicate.Match {
	return predicate.Match(sql.NotPredicates(p))
}
