import {Get, JsonController, Param, Req, UseBefore} from 'routing-controllers';
import {JSONWebToken} from '../../utils/JSONWebToken';
import {UserAuthenticatorMiddleware} from '../../middleware/UserAuthenticatorMiddleware';
import {BlockchainClient} from '../../blockchain/client/blockchainClient';
import {Container} from 'typedi';

@JsonController('/users')
@UseBefore(UserAuthenticatorMiddleware)
export class VoteController {
  private blockchainClient: BlockchainClient = Container.get(BlockchainClient);

  @Get('/')
  public getAllUsers(@Req() request: any): any {
    let enrollmentID = new JSONWebToken(request).getUserID();

    return this.blockchainClient.query('getAllUsers', [], enrollmentID);
  }

  @Get('/:id')
  public getUserByID(@Param('id') userID: string, @Req() request: any): any {
    let enrollmentID = new JSONWebToken(request).getUserID();

    return this.blockchainClient.query('getUserByID', [userID], enrollmentID);
  }
}