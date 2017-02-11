package invokeAndQuery

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"build-chaincode/util"
	"encoding/json"
)

func CastVoteForPoll(stub shim.ChaincodeStubInterface, pollID string, option string) error {
	poll, err := util.GetPollByID(stub, pollID)
	if err != nil {
		return err
	}

	currentUser, err := util.GetCurrentBlockchainUser(stub)
	if err != nil {
		return err
	}

	users, err := util.GetAllUsers(stub)
	if err != nil {
		return err
	}

	var currentUserVoteIDs []string
	for index, currentUserVote := range currentUser.Votes {
		if currentUserVote.PollID == pollID {
			currentUserVoteIDs = append(currentUserVoteIDs, currentUserVote.VoteID)
			currentUser.Votes[index].Voted = true
		}

		for _, user := range users {
			if user.UserID != currentUser.UserID {
				for index := range user.Votes {
					if user.Votes[index].VoteID == currentUserVote.VoteID {
						user.Votes[index].Voted = true
					}
				}
				userAsBytes, err := json.Marshal(user)
				if err != nil {
					return err
				}
				stub.PutState(user.UserID, userAsBytes)
			}
		}
	}

	for index := range poll.Options {
		if poll.Options[index].Option == option {
			for _, currentUserVote := range currentUserVoteIDs {
				poll.Options[index].Votes = append(poll.Options[index].Votes, currentUserVote)
			}
		}
	}

	pollAsBytes, err := json.Marshal(poll)
	if err != nil {
		return err
	}
	stub.PutState(poll.PollID, pollAsBytes)

	currentUserAsBytes, err := json.Marshal(currentUser)
	if err != nil {
		return err
	}
	stub.PutState(currentUser.UserID, currentUserAsBytes)

	return nil
}
