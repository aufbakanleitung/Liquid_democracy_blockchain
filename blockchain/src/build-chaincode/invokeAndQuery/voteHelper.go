package invokeAndQuery

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"build-chaincode/util"
	"build-chaincode/entities"
	"encoding/json"
	"reflect"
	"errors"
)

func CreateVotesForPoll(stub shim.ChaincodeStubInterface, poll entities.Poll) error {
	users, getAllUsersError := util.GetAllUsers(stub)
	if getAllUsersError != nil {
		return getAllUsersError
	}

	for _, user := range users {
		delegation := []string{}
		if !reflect.DeepEqual(user.DomainDelegations, []entities.DomainDelegation{}) {
			for _, userDelegation := range user.DomainDelegations {

				if poll.Domain == userDelegation.Domain {

					delegation = append(delegation, userDelegation.UserID)

					delegatedUser, err := util.GetUserByID(stub, userDelegation.UserID)
					if err != nil {
						return err
					}

					delegatedVote := entities.Vote{
						VoteID: poll.PollID + string(user.Hash[0:11]),
						PollID: poll.PollID,
						DelegatedTo: []string{},
						Voted: false,
					}

					delegatedUser.Votes = append(delegatedUser.Votes, delegatedVote)

					delegatedUserAsBytes, err := json.Marshal(delegatedUser)
					if err != nil {
						return err
					}

					stub.PutState(delegatedUser.UserID, delegatedUserAsBytes)
				}
			}
		}

		vote := entities.Vote{
			VoteID: poll.PollID + string(user.Hash[0:11]),
			PollID: poll.PollID,
			DelegatedTo: delegation,
			Voted: false,
		}

		user.Votes = append(user.Votes, vote)

		userAsBytes, err := json.Marshal(user)
		if err != nil {
			return err
		}

		stub.PutState(user.UserID, userAsBytes)
	}

	return nil
}

func DelegateVote(stub shim.ChaincodeStubInterface, delegatedUserID string, pollID string) error {
	currentUser, err := util.GetCurrentBlockchainUser(stub)
	if err != nil {
		return err
	}

	delegatedUser, err := util.GetUserByID(stub, delegatedUserID)
	if err != nil {
		return err
	}

	for index := range currentUser.Votes {
		if currentUser.Votes[index].PollID == pollID && reflect.DeepEqual(currentUser.Votes[index].DelegatedTo, []string{}) {
			delegatedUser.Votes = append(delegatedUser.Votes, currentUser.Votes[index])

			delegatedUserAsBytes, err := json.Marshal(delegatedUser)
			if err != nil {
				return err
			}
			stub.PutState(delegatedUser.UserID, delegatedUserAsBytes)

			currentUser.Votes[index].DelegatedTo = append(currentUser.Votes[index].DelegatedTo, delegatedUser.UserID)

			currentUserAsBytes, err := json.Marshal(currentUser)
			if err != nil {
				return err
			}
			stub.PutState(currentUser.UserID, currentUserAsBytes)
		} else {
			return errors.New("The vote is already delegated")
		}
	}

	return nil
}

func RetrieveVote(stub shim.ChaincodeStubInterface, voteID string) error {
	users, getAllUsersError := util.GetAllUsers(stub)
	if getAllUsersError != nil {
		return getAllUsersError
	}

	currentUser, err := util.GetCurrentBlockchainUser(stub)
	if err != nil {
		return err
	}

	for index, user := range users {
		if user.UserID != currentUser.UserID {
			newVotes := []entities.Vote{}
			for voteIndex := range users[index].Votes {
				if users[index].Votes[voteIndex].VoteID != voteID {
					newVotes = append(newVotes, users[index].Votes[voteIndex])
				}
			}
			users[index].Votes = newVotes

			userAsBytes, err := json.Marshal(users[index])
			if err != nil {
				return err
			}
			stub.PutState(users[index].UserID, userAsBytes)
		} else {
			for voteIndex := range currentUser.Votes {
				if currentUser.Votes[voteIndex].VoteID == voteID {
					currentUser.Votes[voteIndex].DelegatedTo = []string{}
				}
			}
			currentUserAsBytes, err := json.Marshal(currentUser)
			if err != nil {
				return err
			}
			stub.PutState(currentUser.UserID, currentUserAsBytes)
		}
	}

	return nil
}

