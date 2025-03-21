// Code generated by ent, DO NOT EDIT.

package ent

import (
	"time"

	"github.com/google/uuid"
	"github.com/horiyuko0512/soccer-community/ent/match"
	"github.com/horiyuko0512/soccer-community/ent/participation"
	"github.com/horiyuko0512/soccer-community/ent/schema"
	"github.com/horiyuko0512/soccer-community/ent/user"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	matchFields := schema.Match{}.Fields()
	_ = matchFields
	// matchDescTitle is the schema descriptor for title field.
	matchDescTitle := matchFields[1].Descriptor()
	// match.TitleValidator is a validator for the "title" field. It is called by the builders before save.
	match.TitleValidator = func() func(string) error {
		validators := matchDescTitle.Validators
		fns := [...]func(string) error{
			validators[0].(func(string) error),
			validators[1].(func(string) error),
		}
		return func(title string) error {
			for _, fn := range fns {
				if err := fn(title); err != nil {
					return err
				}
			}
			return nil
		}
	}()
	// matchDescLocation is the schema descriptor for location field.
	matchDescLocation := matchFields[4].Descriptor()
	// match.LocationValidator is a validator for the "location" field. It is called by the builders before save.
	match.LocationValidator = matchDescLocation.Validators[0].(func(string) error)
	// matchDescParticipants is the schema descriptor for participants field.
	matchDescParticipants := matchFields[6].Descriptor()
	// match.ParticipantsValidator is a validator for the "participants" field. It is called by the builders before save.
	match.ParticipantsValidator = matchDescParticipants.Validators[0].(func(int) error)
	// matchDescFee is the schema descriptor for fee field.
	matchDescFee := matchFields[7].Descriptor()
	// match.FeeValidator is a validator for the "fee" field. It is called by the builders before save.
	match.FeeValidator = matchDescFee.Validators[0].(func(int) error)
	// matchDescNotes is the schema descriptor for notes field.
	matchDescNotes := matchFields[8].Descriptor()
	// match.NotesValidator is a validator for the "notes" field. It is called by the builders before save.
	match.NotesValidator = matchDescNotes.Validators[0].(func(string) error)
	// matchDescCreatedAt is the schema descriptor for created_at field.
	matchDescCreatedAt := matchFields[10].Descriptor()
	// match.DefaultCreatedAt holds the default value on creation for the created_at field.
	match.DefaultCreatedAt = matchDescCreatedAt.Default.(func() time.Time)
	// matchDescUpdatedAt is the schema descriptor for updated_at field.
	matchDescUpdatedAt := matchFields[11].Descriptor()
	// match.DefaultUpdatedAt holds the default value on creation for the updated_at field.
	match.DefaultUpdatedAt = matchDescUpdatedAt.Default.(func() time.Time)
	// match.UpdateDefaultUpdatedAt holds the default value on update for the updated_at field.
	match.UpdateDefaultUpdatedAt = matchDescUpdatedAt.UpdateDefault.(func() time.Time)
	// matchDescIsApplied is the schema descriptor for is_applied field.
	matchDescIsApplied := matchFields[12].Descriptor()
	// match.DefaultIsApplied holds the default value on creation for the is_applied field.
	match.DefaultIsApplied = matchDescIsApplied.Default.(bool)
	// matchDescID is the schema descriptor for id field.
	matchDescID := matchFields[0].Descriptor()
	// match.DefaultID holds the default value on creation for the id field.
	match.DefaultID = matchDescID.Default.(func() uuid.UUID)
	participationFields := schema.Participation{}.Fields()
	_ = participationFields
	// participationDescCreatedAt is the schema descriptor for created_at field.
	participationDescCreatedAt := participationFields[4].Descriptor()
	// participation.DefaultCreatedAt holds the default value on creation for the created_at field.
	participation.DefaultCreatedAt = participationDescCreatedAt.Default.(func() time.Time)
	// participationDescUpdatedAt is the schema descriptor for updated_at field.
	participationDescUpdatedAt := participationFields[5].Descriptor()
	// participation.DefaultUpdatedAt holds the default value on creation for the updated_at field.
	participation.DefaultUpdatedAt = participationDescUpdatedAt.Default.(func() time.Time)
	// participation.UpdateDefaultUpdatedAt holds the default value on update for the updated_at field.
	participation.UpdateDefaultUpdatedAt = participationDescUpdatedAt.UpdateDefault.(func() time.Time)
	// participationDescID is the schema descriptor for id field.
	participationDescID := participationFields[0].Descriptor()
	// participation.DefaultID holds the default value on creation for the id field.
	participation.DefaultID = participationDescID.Default.(func() uuid.UUID)
	userFields := schema.User{}.Fields()
	_ = userFields
	// userDescNickName is the schema descriptor for nickName field.
	userDescNickName := userFields[1].Descriptor()
	// user.NickNameValidator is a validator for the "nickName" field. It is called by the builders before save.
	user.NickNameValidator = func() func(string) error {
		validators := userDescNickName.Validators
		fns := [...]func(string) error{
			validators[0].(func(string) error),
			validators[1].(func(string) error),
		}
		return func(nickName string) error {
			for _, fn := range fns {
				if err := fn(nickName); err != nil {
					return err
				}
			}
			return nil
		}
	}()
	// userDescEmail is the schema descriptor for email field.
	userDescEmail := userFields[2].Descriptor()
	// user.EmailValidator is a validator for the "email" field. It is called by the builders before save.
	user.EmailValidator = userDescEmail.Validators[0].(func(string) error)
	// userDescPasswordHash is the schema descriptor for password_hash field.
	userDescPasswordHash := userFields[3].Descriptor()
	// user.PasswordHashValidator is a validator for the "password_hash" field. It is called by the builders before save.
	user.PasswordHashValidator = userDescPasswordHash.Validators[0].(func(string) error)
	// userDescIntroduction is the schema descriptor for introduction field.
	userDescIntroduction := userFields[4].Descriptor()
	// user.IntroductionValidator is a validator for the "introduction" field. It is called by the builders before save.
	user.IntroductionValidator = func() func(string) error {
		validators := userDescIntroduction.Validators
		fns := [...]func(string) error{
			validators[0].(func(string) error),
			validators[1].(func(string) error),
		}
		return func(introduction string) error {
			for _, fn := range fns {
				if err := fn(introduction); err != nil {
					return err
				}
			}
			return nil
		}
	}()
	// userDescCreatedAt is the schema descriptor for created_at field.
	userDescCreatedAt := userFields[5].Descriptor()
	// user.DefaultCreatedAt holds the default value on creation for the created_at field.
	user.DefaultCreatedAt = userDescCreatedAt.Default.(func() time.Time)
	// userDescUpdatedAt is the schema descriptor for updated_at field.
	userDescUpdatedAt := userFields[6].Descriptor()
	// user.DefaultUpdatedAt holds the default value on creation for the updated_at field.
	user.DefaultUpdatedAt = userDescUpdatedAt.Default.(func() time.Time)
	// user.UpdateDefaultUpdatedAt holds the default value on update for the updated_at field.
	user.UpdateDefaultUpdatedAt = userDescUpdatedAt.UpdateDefault.(func() time.Time)
	// userDescID is the schema descriptor for id field.
	userDescID := userFields[0].Descriptor()
	// user.DefaultID holds the default value on creation for the id field.
	user.DefaultID = userDescID.Default.(func() uuid.UUID)
}
