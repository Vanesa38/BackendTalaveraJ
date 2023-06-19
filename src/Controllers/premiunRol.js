import userModel from "../models/userModel";

export const changeRol = async (req, res) => {
    const uid = req.params.uid;
    const newRole = req.body.role;

    try {
        const user = await userModel.findOneAndUpdate(
            { cartID: uid },
            { rol: newRole },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
