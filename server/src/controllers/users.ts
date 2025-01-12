import type { IUser, IUserForUpdate } from "@contapp/shared";
import type { Reply, Request } from "../types";
import Services from "../services";
import { comparePassword, hashPassword } from "../utils/password";

export async function me(request: Request, reply: Reply) {
    const { password, ...user } = request.user as IUser;
    return reply.code(200).send({ success: true, message: "Ok", data: user });
}

export class UserController {
    static async updateUser(req: Request, reply: Reply) {
        const { id, password } = req.user as IUser;
        const userUpdates = req.body as IUserForUpdate;

        if (userUpdates.password && password) {
            if (!await comparePassword(userUpdates.old_password, password)) {
                return reply
                    .status(400)
                    .send({ success: false, message: "Invalid password", errors: [] });
            }
            const hashedPassword = await hashPassword(userUpdates.password);
            userUpdates.password = hashedPassword;
        }

        try {
            const updated = await Services.user.updateUser(id, userUpdates);
            reply
                .status(200)
                .send({ success: true, message: "User updated", data: updated });
        } catch (error) {
            console.error({error});
            reply
                .status(400)
                .send({ success: false, message: "Error updating user", errors: [] });
        }
    }
}
