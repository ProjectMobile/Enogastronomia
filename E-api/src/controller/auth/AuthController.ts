import { compare } from "bcryptjs";
import { Request, Response } from 'express'
import { prisma } from "../../services/prisma";
import { sign } from 'jsonwebtoken'
import { authToken, refreshToken } from "../../config";


class AuthController {
    async execute(req: Request, res: Response) {

        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                throw new Error('Email ou Senha inválidos')
            }

            const isPasswordValid = await compare(password, user.password)

            if (!isPasswordValid) {
                throw new Error('Email ou Senha inválidos')
            }

            const id = user.id;

            const token = sign({ id }, authToken.secret, {
                expiresIn: authToken.expiresIn
            })

            const refreshT = sign({ id }, refreshToken.secret, {
                expiresIn: refreshToken.expiresIn
            })

            return res.status(200).json({ token, refreshT })

        } catch (error) {
            return res.status(400).json(error.message)
        }



    }
}

export { AuthController }