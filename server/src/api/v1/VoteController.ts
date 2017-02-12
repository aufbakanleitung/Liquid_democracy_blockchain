import {Get, JsonController, Param, Req, UseBefore, Post} from 'routing-controllers';
import {JSONWebToken} from '../../utils/JSONWebToken';
import {UserAuthenticatorMiddleware} from '../../middleware/UserAuthenticatorMiddleware';
import {BlockchainClient} from '../../blockchain/client/blockchainClient';
import {Container} from 'typedi';

@JsonController('/votes')
@UseBefore(UserAuthenticatorMiddleware)
export class VoteController {
  private blockchainClient: BlockchainClient = Container.get(BlockchainClient);

  @Post('/delegate/:delegatedUserID/:pollID')
  public delegateVote(@Param('delegatedUserID') delegatedUserID: string, @Param('pollID') pollID: string, @Req() request: any): any {
    let enrollmentID = new JSONWebToken(request).getUserID();

    return this.blockchainClient.invoke('delegateVote', [delegatedUserID, pollID], enrollmentID);
  }

  @Post('/:voteID/retrieve')
  public retrieveVote(@Param('voteID') voteID: string, @Req() request: any): any {
    let enrollmentID = new JSONWebToken(request).getUserID();

    return this.blockchainClient.invoke('retrieveVote', [voteID], enrollmentID);
  }
}