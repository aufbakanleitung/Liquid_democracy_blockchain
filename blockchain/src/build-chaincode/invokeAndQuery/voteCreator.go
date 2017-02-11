package invokeAndQuery

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"build-chaincode/util"
	"build-chaincode/entities"
	"encoding/json"
	"reflect"
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
