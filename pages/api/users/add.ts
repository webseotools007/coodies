import { NextApiRequest, NextApiResponse } from 'next';
import { Gender } from '../../../types/common.types';
/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from '../../../Utils/mongodb';
import User from './models/UserSchema';
import { sendOtp } from './otp/generate';

/**
 * @swagger
 * '/api/users/add':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a hero
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: fazle
 *              email:
 *                type: string
 *                default: fazlerabby07@gmail.com
 *              country:
 *                type: string
 *                default: Bangladesh
 *              gender:
 *                type: string
 *                default: male
 *              dob:
 *                type: string
 *                default: 1992-09-07
 *              profilePic:
 *                type: string
 *                default: profilePic.jpg
 *              mobile:
 *                type: number
 *                default: 01811223344
 *     responses:
 *      201:
 *        description: Created
 */

// interface
interface IUserRequest extends NextApiRequest {
    body: {
        firstName: string;
        lastName: string;
        email: string;
        userName: string;
        password: string;
        gender: Gender;
        linkedin_url?: string;
        github?: string;
        leetcode_url?: string;
        hackerrank_url?: string;
        codepen_url?: string;
        medium_url?: string;
        codeforces_url?: string;
    };
}

interface IUserResponse extends NextApiResponse {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
}

export default async (req: NextApiRequest, res: any) => {
    try {
        await connectToDatabase();
        if (!req.body)
            return res.status(400).json({ status: 'error', message: 'body param missing' });

        const { userName, email, password } = JSON.parse(req.body);
        if (!userName || !email || !password) {
            return res.status(400).json({ status: 'error', message: 'required param missing' });
        }

        const newUser = await User.create({ userName, email, password });

        // user created.
        // send OTP for verification

        const callback = (result: any) => {
            console.log(result);
        };
        sendOtp(email, callback);

        return res.status(200).json(newUser);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something went wrong please try again later',
        });
    }
};
