import React, { Component } from "react";
import ContestContractMeta from '../contracts/Contest.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'


let instance = null

export default class ContestContract{

    constructor(){

        if(!instance){
            instance = this
            this.web3 = getWeb3()
            this.contract = contract(ContestContractMeta)
            this.contract.setProvider(this.web3.currentProvider)
        }
        return instance
    }

    async addState(name){
        const contractInstance = await this.contract.deployed()
        let account = await this.web3.eth.getCoinbase((err,acc)=>{
            if(err === null){
                return acc
            }
        })
        return contractInstance.addState(name,{from:account})
    }

    async addContest(stateId,contestName){
        const contractInstance = await this.contract.deployed()
        let account = await this.web3.eth.getCoinbase((err,acc)=>{
            if(err === null){
                return acc
            }
        })
        return contractInstance.addContest(stateId,contestName,{from:account})
    }

    async addContestant(stateId,contestId,name){
        const contractInstance = await this.contract.deployed()
        let account = await this.web3.eth.getCoinbase((err,acc)=>{
            if(err === null){
                return acc
            }
        })

        return contractInstance.addContestant(stateId,contestId,name,{from: account})
    }

    async getAllStates(){
        const contractInstance = await this.contract.deployed()

        const count = await contractInstance.statesCount()

        const states = []

        for(var i=1;i<=count;i++){
            const state = await contractInstance.states(i)
            states.push({id:state[0].toNumber(),name:state[1]})
        }
        return states
    }

    async getAllContestsInState(stateId){

        const contractInstance = await this.contract.deployed()
        
        const count = await contractInstance.getContestsCountFromState(stateId)

        const contests = []

        for(var i=1;i<=count;i++){
            const {a,s} = await contractInstance.getContestsFromState(stateId,i);
            contests.push({id:a.toNumber(),name:s})
        }
        return contests

    }
    
    async getAllContestants(stateId,contestId) {
        const contractInstance = await this.contract.deployed()

        const count = await contractInstance.getContestantsCountFromStateContest(stateId,contestId)

        const contestants = []

        for(var i=1;i<=count;i++){

            const {a,s,b} = await contractInstance.getContestantFromContestAndState(stateId,contestId,i)
            contestants.push({id:a.toNumber(), name:s, voteCount: b.toNumber()})
        }

        return contestants

    }
    

    async castVote(stateId,contestId,contestantId,adhaar){
        const contractInstance = await this.contract.deployed()
        let account = await this.web3.eth.getCoinbase((err,acc)=>{
            if(err === null){
                return acc
            }
        })

        return contractInstance.castVote(stateId,contestId,contestantId,adhaar,{from: account})

    }


}
