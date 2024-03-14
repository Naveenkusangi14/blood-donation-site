import prisma from "../utlis/prismaClient";

export const connectToDB = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log(error);
        
        return new Error('not connected to DB')
    }
}