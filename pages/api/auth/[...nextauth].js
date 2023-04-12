import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../backend/models/user";
import bcrypt from "bcryptjs";
import connectMongo from "../../../backend/utils/connectMongo";
export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                connectMongo()
                const { email, password } = credentials;

                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('Invalid email')
                }
                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error('Invalid password')
                }
                return user;

            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
})
