pragma solidity >=0.4.21 <0.7.0;

contract Contest{
    
    struct Contestant{
        uint id;
        string name;
        uint voteCount;
    }

    struct ContestInit{
        uint id;
        string contestName;
        // to store contestants as a key-value pair (id-Contestant):
        mapping(uint => Contestant) contestants;

        // to store voter has voted or not
        mapping(uint => bool) voters;

        // mapping don't have size property. To maintain #contestants:
        uint contestantCount;
    }
    
    struct State{
        uint id;
        string stateName;
        mapping(uint => ContestInit) contests;
        mapping(uint => bool) contestExist;
        uint contestsCount;
    }

    // logs (kinda reciept)
    event UpdateContestants();

    mapping (uint=>State) public states;
    mapping (uint=>bool) public stateExist;
    uint public statesCount;

    function getContestsCountFromState(uint stateId) public view returns (uint){
        return states[stateId].contestsCount;
    }

    function getContestantsCountFromStateContest(uint stateId,uint contestId) public view returns (uint) {
        return states[stateId].contests[contestId].contestantCount;
    }

    function getContestsFromState(uint stateId,uint contestId) public view returns (uint a,string memory s){

        a = states[stateId].contests[contestId].id;
        s = states[stateId].contests[contestId].contestName;        
    }

    function getContestantFromContestAndState(uint stateId,uint contestId,uint contestantId) public view returns (uint a,string memory s,uint b){

        a = states[stateId].contests[contestId].contestants[contestantId].id;
        s = states[stateId].contests[contestId].contestants[contestantId].name;        
        b = states[stateId].contests[contestId].contestants[contestantId].voteCount;
    }



    function addState(string memory name) public {
        statesCount++;
        states[statesCount] = State({id:statesCount,stateName:name,contestsCount:0});
        stateExist[statesCount] = true;
    }

    function addContest(uint stateId,string memory name) public{
        require(stateExist[stateId]);

        states[stateId].contestsCount++;
        uint ID = states[stateId].contestsCount;
        states[stateId].contests[ID] = ContestInit(ID,name,0);
        states[stateId].contestExist[ID] = true;
    }

    function addContestant(uint stateId, uint contestId, string memory name) public{

        require(stateExist[stateId]);
        require(states[stateId].contestExist[contestId]);

        states[stateId].contests[contestId].contestantCount++;
        uint ct = states[stateId].contests[contestId].contestantCount;

        states[stateId].contests[contestId].contestants[ct] = Contestant(ct,name,0);
    }

    function castVote(uint stateId,uint contestId,uint contestantId,uint adhaar) public {
        
        require(!states[stateId].contests[contestId].voters[adhaar]);
        require(contestId > 0 && contestId <= states[stateId].contestsCount);

        states[stateId].contests[contestId].voters[adhaar] = true;
        states[stateId].contests[contestId].contestants[contestantId].voteCount++;

    }    

    //************ BASIC *************//
    
    // function addContestant(string memory name) public {
    //     contestantCount++;
    //     // adding new contestant with 0 vote count.
    //     contestants[contestantCount] = Contestant(contestantCount,name,0);
    //     emit UpdateContestants();
    // }

    // function castVote(uint contestantId) public {
    //     require(!voters[msg.sender]);
    //     require(contestantId > 0 && contestantCount <= contestantCount);

    //     voters[msg.sender] = true;
    //     contestants[contestantId].voteCount++;

    // }

}