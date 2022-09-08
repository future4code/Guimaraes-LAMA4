import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "User_lama";

  public createUser = async (user: User): Promise<void> => {
    try {
      await UserDatabase.connection(UserDatabase.TABLE_NAME).insert({
        user,
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public async getUserByEmail(email: string): Promise<User> {
    const result = await UserDatabase.connection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }
}
