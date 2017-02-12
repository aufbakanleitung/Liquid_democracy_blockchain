package util

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"errors"
	"encoding/json"
	"build-chaincode/entities"
)

func GetCurrentBlockchainUser(stub shim.ChaincodeStubInterface) (entities.User, error) {
	userIDAsBytes, err := stub.ReadCertAttribute("userID")
	if err != nil {
		return entities.User{}, errors.New("Could not retrieve user by certificate. Reason: " + err.Error())
	}

	return GetUserByID(stub, string(userIDAsBytes))
}

func GetAllPolls(stub shim.ChaincodeStubInterface) ([]entities.Poll, error) {
	pollsIndex, err := GetIndex(stub, PollsIndexName)
	if err != nil {
		return []entities.Poll{}, errors.New("Could not retrieve pollIndex, reason: " + err.Error())
	}

	var polls []entities.Poll
	for _, pollID := range pollsIndex {
		pollAsBytes, err := stub.GetState(pollID)
		if err != nil {
			return []entities.Poll{}, errors.New("Could not retrieve poll with ID: " + pollID + ", reason: " + err.Error())
		}

		var poll entities.Poll
		err = json.Unmarshal(pollAsBytes, &poll)
		if err != nil {
			return []entities.Poll{}, errors.New("Error while unmarshalling poll, reason: " + err.Error())
		}

		polls = append(polls, poll)
	}

	return polls, nil
}

func GetPollByID(stub shim.ChaincodeStubInterface, pollID string) (entities.Poll, error) {
	pollAsBytes, err := stub.GetState(pollID)
	if err != nil {
		return entities.Poll{}, errors.New("Could not retrieve poll for ID " + pollID + " reason: " + err.Error())
	}

	var poll entities.Poll
	err = json.Unmarshal(pollAsBytes, &poll)
	if err != nil {
		return entities.Poll{}, errors.New("Error while unmarshalling pollAsBytes, reason: " + err.Error())
	}

	return poll, nil
}

func GetUserByID(stub shim.ChaincodeStubInterface, username string) (entities.User, error) {
	userAsBytes, err := stub.GetState(username)
	if err != nil {
		return entities.User{}, errors.New("Could not retrieve information for this user")
	}

	var user entities.User
	if err = json.Unmarshal(userAsBytes, &user); err != nil {
		return entities.User{}, errors.New("Cannot get user, reason: " + err.Error())
	}

	return user, nil
}

func GetAllUsers(stub shim.ChaincodeStubInterface) ([]entities.User, error) {
	usersIndex, err := GetIndex(stub, UsersIndexName)
	if err != nil {
		return []entities.User{}, errors.New("Could not retrieve userIndex, reason: " + err.Error())
	}

	var users []entities.User
	for _, userID := range usersIndex {
		userAsBytes, err := stub.GetState(userID)
		if err != nil {
			return []entities.User{}, errors.New("Could not retrieve user with ID: " + userID + ", reason: " + err.Error())
		}

		var user entities.User
		err = json.Unmarshal(userAsBytes, &user)
		if err != nil {
			return []entities.User{}, errors.New("Error while unmarshalling user, reason: " + err.Error())
		}

		users = append(users, user)
	}

	return users, nil
}

func GetPollResults(stub shim.ChaincodeStubInterface, pollID string) (map[string]float64, error) {

	poll, err := GetPollByID(stub, pollID)
	if err != nil {
		return nil, err
	}

	votesForOption := make(map[string]int)
	for _, option := range poll.Options {
		votesForOption[option] = len(option)
	}

	return nil, nil
}

func GetDelegatedUserPerPoll(stub shim.ChaincodeStubInterface, pollID string) (entities.User, error) {

	return nil, nil
}