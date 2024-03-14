import { connectToDB } from '@/app/lib/connectdb';
import prisma from '@/app/utlis/prismaClient';
import { hash } from 'bcryptjs';

export  async function POST(req, res) {
  if (req.method === 'POST') {
    const { email, password , name } = await req.json();
    const hashedPassword = await hash(password, 10);

    try {
        await connectToDB()
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name:name,
          mobileNumber:"",
          dob          :"",
          bloodGroup   :"",
        landmark  :"",
          pinCode   :"",
          district  :"",
          town      :"",
          state     :"",
          donations : { create: [] } 
        },
      });

     return Response.json({ message: 'User created successfully', user });
    } catch (error) {
        console.log(error);
     return Response.json({ error: 'Error creating user',error });
    }finally{
        await prisma.$disconnect();
      }
  } else {
   return Response.json({ error: 'Method Not Allowed' });
  }
}

export async function PUT(req, res) {
  const { id, name, mobileNumber, dob, bloodGroup, landmark, pinCode, district, town, state } = await req.json();

  // Prepare an object to hold the fields to update
  const updateFields = {};

 

  if (name) {
    updateFields.name = name;
  }

  if (mobileNumber) {
    updateFields.mobileNumber = mobileNumber;
  }

  if (dob) {
    updateFields.dob = dob;
  }

  if (bloodGroup) {
    updateFields.bloodGroup = bloodGroup;
  }

  if (landmark) {
    updateFields.landmark = landmark;
  }

  if (pinCode) {
    updateFields.pinCode = pinCode;
  }

  if (district) {
    updateFields.district = district;
  }

  if (town) {
    updateFields.town = town;
  }

  if (state) {
    updateFields.state = state;
  }

  try {
    await connectToDB();
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: updateFields,
    });

    return Response.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error updating user' });
  } finally {
    await prisma.$disconnect();
  }
}


  export  async function DELETE(req, res) {
    if (req.method === 'DELETE') {
      const { id } = await req.json();
  
      try {
        await connectToDB();
        const deletedUser = await prisma.user.delete({
          where: {
            id: parseInt(id),
          },
        });
  
        return Response.json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error(error);
        return Response.json({ error: 'Error deleting user' });
      } finally {
        await prisma.$disconnect();
      }
    } else {
      return Response.json({ error: 'Method Not Allowed' });
    }
  }