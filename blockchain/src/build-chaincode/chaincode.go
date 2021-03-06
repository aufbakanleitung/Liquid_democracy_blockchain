package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"os"
	"build-chaincode/util"
	"build-chaincode/entities"
	"reflect"
	"build-chaincode/invokeAndQuery"
)

var logger = shim.NewLogger("fabric-boilerplate")
//======================================================================================================================
//	 Structure Definitions
//======================================================================================================================
//	SimpleChaincode - A blank struct for use with Shim (An IBM Blockchain included go file used for get/put state
//					  and other IBM Blockchain functions)
//==============================================================================================================================
type Chaincode struct {
}

//======================================================================================================================
//	Invoke - Called on chaincode invoke. Takes a function name passed and calls that function. Passes the
//  		 initial arguments passed are passed on to the called function.
//======================================================================================================================

func (t *Chaincode) Invoke(stub shim.ChaincodeStubInterface, functionName string, args []string) ([]byte, error) {
	logger.Infof("Invoke is running " + functionName)

	if functionName == "init" {
		return t.Init(stub, "init", args)
	} else if functionName == "resetIndexes" {
		return nil, util.ResetIndexes(stub, logger)
	} else if functionName == "addUser" {
		return nil, t.addUser(stub, args[0], args[1])
	} else if functionName == "addTestdata" {
		return nil, t.addTestdata(stub, args[0])
	} else if functionName == "createPoll" {
		pollAsJson := args[0]
		fmt.Println("poll as bytes  " + string(pollAsJson))

		var poll entities.Poll
		if err := json.Unmarshal([]byte(pollAsJson), &poll); err != nil {
			return nil, errors.New("Error while unmarshalling poll, reason: " + err.Error())
		}

		invokeAndQuery.CreateVotesForPoll(stub, poll)

		pollAsBytes, err := json.Marshal(poll);
		if err != nil {
			return nil, errors.New("Error marshalling poll, reason: " + err.Error())
		}

		util.StoreObjectInChain(stub, poll.PollID, util.PollsIndexName, pollAsBytes)

		return nil, nil
	} else if functionName == "castVoteByPoll" {
		invokeAndQuery.CastVoteForPoll(stub, args[0], args[1])

		return nil, nil
	} else if functionName == "retrieveVote" {
		invokeAndQuery.RetrieveVote(stub, args[0])

		return nil, nil
	} else if functionName == "delegateVote" {
		invokeAndQuery.DelegateVote(stub, args[0], args[1])

		return nil, nil
	}

	return nil, errors.New("Received unknown invoke function name")
}

//======================================================================================================================
//	Query - Called on chaincode query. Takes a function name passed and calls that function. Passes the
//  		initial arguments passed are passed on to the called function.
//=================================================================================================================================
func (t *Chaincode) Query(stub shim.ChaincodeStubInterface, functionName string, args []string) ([]byte, error) {
	logger.Infof("Query is running " + functionName)

	result, err := t.GetQueryResult(stub, functionName, args)
	if err != nil {
		return nil, err
	}

	return json.Marshal(result)
}

func (t *Chaincode) GetQueryResult(stub shim.ChaincodeStubInterface, functionName string, args []string) (interface{}, error) {
	if functionName == "getUser" {
		user, err := util.GetUserByID(stub, args[0])
		if err != nil {
			return nil, err
		}

		return user, nil
	} else if functionName == "authenticateAsUser" {
		user, err := util.GetUserByID(stub, args[0])
		if err != nil {
			logger.Infof("User with id %v not found.", args[0])
		}

		return t.authenticateAsUser(stub, user, args[1]), nil
	} else if functionName == "getAllUsers" {
		users, err := util.GetAllUsers(stub)
		if err != nil {
			return nil, errors.New("could not retrieve all users, reason: " + err.Error())
		}

		return users, nil
	} else if functionName == "getUserByID" {
		user, err := util.GetUserByID(stub, args[0])
		if err != nil {
			return nil, errors.New("could not retrieve user with id: " + args[0] + ", reason: " + err.Error())
		}

		return user, nil
	} else if functionName == "getAllPolls" {
		polls, err := util.GetAllPolls(stub)
		if err != nil {
			return nil, errors.New("could not retrieve all polls, reason: " + err.Error())
		}

		return polls, nil
	} else if functionName == "getPollByID" {
		pollByID, err := util.GetPollByID(stub, args[0])
		if err != nil {
			return nil, errors.New("could not retrieve polls with id: " + args[0] + ", reason: " + err.Error())
		}

		return pollByID, nil
	} else if functionName == "getAllDelegatedUsers" {
		delegatedUsers, err := util.GetAllDelegatedUsers(stub)
		if err != nil {
			return nil, errors.New("could not retrieve polls with id: " + args[0] + ", reason: " + err.Error())
		}

		return delegatedUsers, nil
		//	GetAllDelegatedUsers
	}

	return nil, errors.New("Received unknown query function name")
}

//======================================================================================================================
//  Main - main - Starts up the chaincode
//======================================================================================================================

func main() {
	// LogDebug, LogInfo, LogNotice, LogWarning, LogError, LogCritical (Default: LogDebug)
	logger.SetLevel(shim.LogInfo)

	logLevel, _ := shim.LogLevel(os.Getenv("SHIM_LOGGING_LEVEL"))
	shim.SetLoggingLevel(logLevel)

	err := shim.Start(new(Chaincode))
	if err != nil {
		fmt.Printf("Error starting SimpleChaincode: %s", err)
	}
}

//======================================================================================================================
//  Init Function - Called when the user deploys the chaincode
//======================================================================================================================

func (t *Chaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	return nil, nil
}

//======================================================================================================================
//  Invoke Functions
//======================================================================================================================

func (t *Chaincode) addUser(stub shim.ChaincodeStubInterface, index string, userJSONObject string) error {
	id, err := util.WriteIDToBlockchainIndex(stub, util.UsersIndexName, index)
	if err != nil {
		return errors.New("Error creating new id for user " + index)
	}

	err = stub.PutState(string(id), []byte(userJSONObject))
	if err != nil {
		return errors.New("Error putting user data on ledger")
	}

	return nil
}

func (t *Chaincode) addTestdata(stub shim.ChaincodeStubInterface, testDataAsJson string) error {
	var testData entities.TestData
	err := json.Unmarshal([]byte(testDataAsJson), &testData)
	if err != nil {
		return errors.New("Error while unmarshalling testdata")
	}

	for _, user := range testData.Users {
		userAsBytes, err := json.Marshal(user);
		if err != nil {
			return errors.New("Error marshalling testUser, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, user.UserID, util.UsersIndexName, userAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}
	}

	for _, poll := range testData.Polls {
		pollAsBytes, err := json.Marshal(poll);
		if err != nil {
			return errors.New("Error marshalling testPolls, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, poll.PollID, util.PollsIndexName, pollAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}

		invokeAndQuery.CreateVotesForPoll(stub, poll)
	}

	return nil
}

//======================================================================================================================
//		Query Functions
//======================================================================================================================

func (t *Chaincode) authenticateAsUser(stub shim.ChaincodeStubInterface, user entities.User, passwordHash string) (entities.UserAuthenticationResult) {
	if reflect.DeepEqual(user, entities.User{}) {
		fmt.Println("User not found")
		return entities.UserAuthenticationResult{
			User: user,
			Authenticated: false,
		}
	}

	if user.Hash != passwordHash {
		fmt.Println("Hash does not match")
		return entities.UserAuthenticationResult{
			User: user,
			Authenticated: false,
		}
	}

	return entities.UserAuthenticationResult{
		User: user,
		Authenticated: true,
	}
}

