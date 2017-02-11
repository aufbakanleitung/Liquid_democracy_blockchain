/**
 * Created by hermanvanderveer on 11/02/2017.
 */
import {Container} from 'typedi';
import {Get, Post, JsonController, Param, Body, Req, UseBefore} from 'routing-controllers';
import {JSONWebToken} from '../../utils/JSONWebToken';
import {Poll} from '../../entities/poll.model';
import {UserAuthenticatorMiddleware} from '../../middleware/UserAuthenticatorMiddleware';
import {BlockchainClient} from '../../blockchain/client/blockchainClient';
import {User} from "../../entities/user.model";


@JsonController('/user')
@UseBefore(UserAuthenticatorMiddleware)
export class UserController {

    @Get('/')
    public getAllUsers(@Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return this.blockchainClient.query('GetAllUsers', [], enrollmentID);
    }

    @Get('/:id')
    public getUser(@Param('id') pollID: string, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return this.blockchainClient.query('GetUser', [User], enrollmentID);
    }

}
