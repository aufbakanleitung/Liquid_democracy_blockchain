import {Get, JsonController, Param, Req, UseBefore} from 'routing-controllers';
import {JSONWebToken} from '../../utils/JSONWebToken';
import {UserAuthenticatorMiddleware} from '../../middleware/UserAuthenticatorMiddleware';
import {BlockchainClient} from '../../blockchain/client/blockchainClient';
import {Container} from 'typedi';

@JsonController('/user')
@UseBefore(UserAuthenticatorMiddleware)
export class UserController {
    private blockchainClient: BlockchainClient = Container.get(BlockchainClient);

    @Get('/')
    public getAllUsers(@Req() request: any): any {
        // console.log('getAllUsers is requested');
        let enrollmentID = new JSONWebToken(request).getUserID();

        // return JSON.stringify('Get all users, bitches');
        return this.blockchainClient.query('getAllUsers', [], enrollmentID);
    }

    @Get('/:id')
    public getUserByID(@Param('id') userID: string, @Req() request: any): any {
        console.log('getUser is requested');
        let enrollmentID = new JSONWebToken(request).getUserID();

        return this.blockchainClient.query('getUserByID', [userID], enrollmentID);
    }
}