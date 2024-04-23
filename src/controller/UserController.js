import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { useId } from "react";

export async function getUser(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
    let user = await prisma.user.findMany({
      skip: skipValue,
      select: {
        UserID: true,
        Profile: true,
        Namalengkap: true,
        Alamat: true,
        Email: true,
        Username: true,
        Role: true,
      },
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
  const { id } = req.query;

  try {
    let user = await prisma.user.findUnique({
      where: {
        UserID: parseInt(id),
      },
      select: {
        UserID: true,
        Profile: true,
        Namalengkap: true,
        Alamat: true,
        Email: true,
        Username: true,
        Role: true,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "User tidak di temukan",
        data: user,
      });
    }

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

//pengguna biasa wirr

export async function createUser(req, res) {
  const { Namalengkap, Alamat, Email, Password, Username } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    let userRole = "pengguna";
    if (Email.includes("@smk.admin.id")) {
      userRole = "admin";
    }

    let user = await prisma.user.create({
      data: {
        Namalengkap,
        Alamat,
        Email,
        Password: hashedPassword,
        Username,
        Role: userRole,
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

//edit user
export async function editUser(req, res) {
  const { userId } = req.query;
  const { Profile, Namalengkap, Alamat, Email, Username } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: { UserID: parseInt(userId) },
    });

    if (!user) {
      res.status(401).json({
        message: "data yang anda maksud tidak ada www",
      });
    }

    let dataToUpdate = {};
    if (Profile) dataToUpdate.Profile = Profile;
    if (Namalengkap) dataToUpdate.Namalengkap = Namalengkap;
    if (Username) dataToUpdate.Username = Username;
    if (Email) dataToUpdate.Email = Email;
    if (Alamat) dataToUpdate.Alamat = Alamat;

    await prisma.user.update({
      where: { UserID: parseInt(userId) },
      data: dataToUpdate,
    });

    user = await prisma.user.findUnique({
      where: { UserID: parseInt(userId) },
    });

    let editedField = "";
    if (Profile) editedField = "Profile";
    else if (Namalengkap) editedField = "Namalengkap";
    else if (Alamat) editedField = "Alamat";
    else if (Email) editedField = "Email";
    else if (Username) editedField = "Username";

    res.status(201).json({
      message: `Edited ${editedField} successfully`,
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

export async function login(req, res) {
  const { Username, Password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { Username: Username },
    });

    if (!user || !(await bcrypt.compare(Password, user.Password))) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const { Password: _, ...userData } = user;

    let role = "pengguna";
    if (user.Role === "admin") {
      role = "admin";
    }
    if (user.Role === "petugas") {
      role = "petugas";
    }

    const token = jwt.sign(
      {
        userId: user?.UserID,
        nama: user?.Namalengkap,
        role: user?.Role,
        email: user?.Email,
        alamat: user?.Alamat,
      },
      "iniadalahaku",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Login berhasil",
      data: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//khusus petugas
export async function loginPetugas(req, res) {
  const { Username, Password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { Username: Username },
    });

    if (!user || !(await bcrypt.compare(Password, user.Password))) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    let role = "petugas";
    if (user.Role === "admin") {
      role = "admin";
    }

    const { Password: _, ...userData } = user;

    const token = jwt.sign(
      {
        userId: user?.UserID,
        nama: user?.Namalengkap,
        role: user?.Role,
        email: user?.Email,
        alamat: user?.Alamat,
      },
      "iniadalahaku",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Login berhasil",
      data: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function createPetugas(req, res) {
  const { Namalengkap, Alamat, Email, Password, Username, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    let user = await prisma.user.create({
      data: {
        Namalengkap,
        Alamat,
        Email,
        Password: hashedPassword,
        Username,
        Role: role || "admin", // Default role is "petugas"
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

//all role
export async function logout(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Ambil token dari header
    const decoded = jwt.verify(token, "iniadalahaku"); // Verifikasi token
    const role = decoded.role; // Ambil role dari token

    // Lakukan proses logout di sini
    res.status(200).json({
      message: "Logout berhasil",
      role: role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
