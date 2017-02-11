import {Container} from 'typedi';
import {Get, Post, JsonController, Param, Body, Req, UseBefore} from 'routing-controllers';
import {JSONWebToken} from '../../utils/JSONWebToken';
import {Poll} from '../../entities/poll.model';
import {UserAuthenticatorMiddleware} from '../../middleware/UserAuthenticatorMiddleware';
import {BlockchainClient} from '../../blockchain/client/blockchainClient';

@JsonController('/polls')
@UseBefore(UserAuthenticatorMiddleware)
export class PollsController {
    private blockchainClient: BlockchainClient = Container.get(BlockchainClient);

    @Get('/')
    public getAllPolls(@Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return this.blockchainClient.query('getAllPolls', [], enrollmentID);
    }

    @Get('/:id')
    public getPollByID(@Param('id') pollID: string, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return this.blockchainClient.query('getPollByID', [pollID], enrollmentID);
    }

    @Post('/')
    public createPoll(@Body() poll: Poll, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();
        console.log(poll);

        return this.blockchainClient.invoke('createPoll', [JSON.stringify(poll)], enrollmentID);
    }

    @Post('/:id/vote')
    public castVoteByPoll(@Param('id') pollID: string, @Body() option: any, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();
        console.log(option);

        return this.blockchainClient.invoke('castVoteByPoll', [pollID, option.option], enrollmentID);
    }
}