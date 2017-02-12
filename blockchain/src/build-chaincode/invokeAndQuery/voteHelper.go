package invokeAndQuery

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"build-chaincode/util"
	"build-chaincode/entities"
	"encoding/json"
	"reflect"
	"fmt"
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

	/*
	1. get current user
	2. copy vote with pollID
	3. add the copied vote to the delegated user
	4. add delegated user id into delegateTo in vote for current user
	5. putState
	*/
	fmt.Println("--------------- DelegateVote ----------------")
	currentUser, err := util.GetCurrentBlockchainUser(stub)
	if err != nil {
		return err
	}

	delegatedUser, err := util.GetUserByID(stub, delegatedUserID)
	if err != nil {
		return err
	}

	for index := range currentUser.Votes {
		fmt.Println("vote of current user", currentUser.Votes[index])
		if currentUser.Votes[index].PollID == pollID && reflect.DeepEqual(currentUser.Votes[index].DelegatedTo, []string{}) {
			fmt.Println("poll id ", pollID)
			delegatedUser.Votes = append(delegatedUser.Votes, currentUser.Votes[index])
			fmt.Println("delegated User ", delegatedUser)

			delegatedUserAsBytes, err := json.Marshal(delegatedUser)
			if err != nil {
				return err
			}
			fmt.Println("delegatedUserAsBytes  ", string(delegatedUserAsBytes))
			stub.PutState(delegatedUser.UserID, delegatedUserAsBytes)

			currentUser.Votes[index].DelegatedTo = append(currentUser.Votes[index].DelegatedTo, delegatedUser.UserID)
			fmt.Println("current User ", currentUser)

			currentUserAsBytes, err := json.Marshal(currentUser)
			if err != nil {
				return err
			}
			fmt.Println("currentUserAsBytes  ", string(currentUserAsBytes))
			stub.PutState(currentUser.UserID, currentUserAsBytes)
		} else {
			return errors.New("The vote is already delegated")
		}
	}

	return nil
}

func RetrieveVote(stub shim.ChaincodeStubInterface, voteID string) error {

	/*
	1. get all users
	2. if user is not the current
		2a. search all the votes for each user to find the user with that ID
		2b. remove that vote from that user
		2c. put state of that user
	3. if user is the current --> set the delegatedTo to []string
	4. put state
	*/
	fmt.Println("--------------- RetrieveVote ----------------")
	users, getAllUsersError := util.GetAllUsers(stub)
	if getAllUsersError != nil {
		return getAllUsersError
	}

	currentUser, err := util.GetCurrentBlockchainUser(stub)
	if err != nil {
		return err
	}
	fmt.Println("currentUser  ", currentUser)
	for index, user := range users {
		if user.UserID != currentUser.UserID {
			fmt.Println("other User  ", user.UserID)
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
			fmt.Println("userAsBytes  ", string(userAsBytes))
			stub.PutState(users[index].UserID, userAsBytes)
		} else {
			for voteIndex := range currentUser.Votes {
				if currentUser.Votes[voteIndex].VoteID == voteID {
					currentUser.Votes[voteIndex].DelegatedTo = []string{}
					fmt.Println("vote after emptying delegatedTo  ", currentUser.Votes[voteIndex].DelegatedTo)
				}
				fmt.Println("votes  ", users[index].Votes[voteIndex])

			}
			currentUserAsBytes, err := json.Marshal(currentUser)
			if err != nil {
				return err
			}
			fmt.Println("currentUserAsBytes  ", string(currentUserAsBytes))
			stub.PutState(currentUser.UserID, currentUserAsBytes)
		}
	}

	return nil
}

