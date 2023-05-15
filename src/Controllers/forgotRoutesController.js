import userModel from "../models/userModel.js";
import { isValidPassword, createHash } from "../../utils.js";
import crypto from "crypto"
import mongoose, { Schema } from "mongoose";
import PasswordResetToken from "../models/passwordToken.js";
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"


mongoose.model("usuarios", userModel.schema);



export const rendersForgot = (req, res) => {
    res.render("forgot");
};

export const renderReset =  (req, res) => {
    const { token } = req.params;
    res.render('resetPassword', { token });
};



export const userForgot = async (req, res) => {

    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "El usuario no existe" });
        }

        // generacion de token
        const token = crypto.randomBytes(15).toString("hex");

        await PasswordResetToken.create({
            userId: user._id,
            token,
        });

         // envio mail con link de reseteo
         const transporter = nodemailer.createTransport({
            service: "gmail",
        port:8080,
        auth:{
            user:"vanetala32@gmail.com",
            pass:"qfvjuramvzzdmywm"
            }
        });
        const resetLink = `http://localhost:8080/reset/${token}`;;
        const message = {
            to: user.email,
            subject: "Recuperación de contraseña",
            html:  `<a href="http://localhost:8080/reset/${token}">Enlace de restablecimiento de contraseña</a>`
        };

        await transporter.sendMail(message);

        res.json({ message: "El correo electrónico de restablecimiento de contraseña se ha enviado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const resetPassword = async (req, res) => {
    const { token, password, repeatPassword } = req.body;

    try {
    const passwordResetToken = await PasswordResetToken.findOne({ token }).populate("userId");

    if (!passwordResetToken) {
        return res.status(404).json({ error: "El token no es válido o ha expirado" });
    }

    const { userId } = passwordResetToken;

    if (!password || !repeatPassword) {
        return res.status(400).json({ error: "Faltan campos" });
    }

    if (password !== repeatPassword) {
        return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    const user = await userModel.findById(userId);
    console.log(userId)

    if (!user) {
        return res.status(404).json({ error: "El usuario no existe" });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
        return res.status(400).json({ error: "La nueva contraseña no puede ser igual a la anterior" });
    }

    if (passwordResetToken.expiration < Date.now()) {
        return res.render("reset"); // Render de vista para solicitar un nuevo correo de restablecimiento
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    await userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

    await passwordResetToken.findByIdAndDelete(passwordResetToken._id);

    res.json({ message: "La contraseña se ha actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    /*const { username, password, repeatPassword } = req.body;
    let newPassword = createHash(password);

    if (!username || !password) {
    res.status(400).json({
        message: "error",
        data: "Faltan campos",
    });
    return;
    }
    if (!isValidPassword(repeatPassword, newPassword)) {
    res.status(400).json({
        message: "error",
        data: "Las contraseñas no coinciden",
    });
    return;
    }

    try {
    const response = await userModel.findOne({
        email: username,
    });

    if (!response) {
        res.status(404).json({
        message: "error",
        data: "El usuario no existe",
        });
        return;
    } else {
        const respuesta = await userModel.findOneAndUpdate(
        { email: username },
        { password: repeatPassword }
        );
        if (respuesta) {
        res.status(200).json({
            message: "logged in",
            data: "Contraseña actualizada",
        });
        return;
        }
    }
    } catch (error) {
    res.status(500).json({ error: error.message });
    return;
    }
}*/
