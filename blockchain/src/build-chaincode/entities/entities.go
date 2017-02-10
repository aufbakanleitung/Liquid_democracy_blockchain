package entities

type ECertResponse struct {
	OK string `json:"OK"`
}

type TestData struct {
	Users  		[]User         	`json:"users"`
	Polls 		[]Poll  	`json:"polls"`
}

type TestDataElement interface {
	ID() string
}

type User struct {
	TestDataElement        `json:"-"`
	UserID           	string        		`json:"userID"`
	Username         	string        		`json:"username"`
	Password         	string        		`json:"password"`
	Salt             	string       		`json:"salt"`
	Hash             	string        		`json:"hash"`
	Address             	string       		`json:"address"`
	Email             	string       		`json:"email"`
	PhoneNumber             string       		`json:"phoneNumber"`
	ExpertiseDomains 	[]string 		`json:"expertiseDomains"`
	DomainDelegation  	[]DomainDelegation	`json:"domainDelegations"`
	Votes            	[]Vote  		`json:"votes"`
}

type Vote struct {
	TestDataElement        `json:"-"`
	VoteID 			string			`json:"voteID"`
	PollID      		string			`json:"pollID"`
	DelegatedTo 		[]string		`json:"delegatedTo"`
	Voted			bool			`json:"voted"`
}

type DomainDelegation struct {
	Domain 			string 			`json:"domain"`
	User 			string			`json:"user"`
}

type Poll struct {
	TestDataElement        `json:"-"`
	PollID			string 			`json:"pollID"`
	Title			string 			`json:"title"`
	Description		string 			`json:"description"`
	CreationDate		int64 			`json:"creationDate"`
	DueDate			int64 			`json:"dueDate"`
	Domain 			string 			`json:"domain"`
	Options			[]Option 		`json:"options"`
}

type Option struct {
	Option 			string 			`json:"option"`
	Votes 			[]string 		`json:"votes"`
}

type UserAuthenticationResult struct {
	User          User
	Authenticated bool
}

type Users struct {
	Users []User `json:"users"`
}

func (t *User) ID() string {
	return t.Username
}

func (t *Poll) ID() string {
	return t.PollID
}

func (t *Vote) ID() string {
	return t.VoteID
}