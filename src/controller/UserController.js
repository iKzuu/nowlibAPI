import prisma from "../../prisma/client";
import bcrypt from "bcrypt";

export async function getUser(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let user = await prisma.user.findMany({
            skip: skipValue,
            select: {
                Namalengkap: true,
                Alamat: true,
                Email: true,
                Password: true,
                Username: true,
                Role: true,
            }
        });

        let count = await prisma.user.count();

        res.status(200).json({
            message: "User found successfully",
            total: count,
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export async function getUserID(req, res) {
    const { uid } = req.query;
  
    try {
      let user = await prisma.user.findUnique({
        where: {
          UserID: parseInt(uid),
        },
        include: {
          Profile: true,
        },
      });
  
      res.status(200).json({
        message: "User found successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  export async function createUser(req, res) {

    const { Namalengkap, Alamat, Email, Password, Username} = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      let user = await prisma.user.create({
        data: {
          Namalengkap,
          Alamat,
          Email,
          Password : hashedPassword,
          Username,
        },
      });
      res.status(201).json({
        message: "User created successfully",
        data: user,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }