import bcrypt from "bcryptjs";
import { HttpError } from "../../utils/http-error.js";
import { userRepository } from "./user.repository.js";
import type { CreateUserInput, UpdateUserInput } from "./user.validation.js";

export const userService = {
  listUsers() {
    return userRepository.findAll();
  },

  async getUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new HttpError(404, "User not found");
    const { passwordHash: _p, ...safe } = user;
    return safe;
  },

  async createUser(input: CreateUserInput) {
    const existing = await userRepository.findByUserId(input.userId);
    if (existing) throw new HttpError(409, "User ID already exists");

    const passwordHash = await bcrypt.hash(input.password, 10);
    return userRepository.create({
      userId: input.userId,
      name: input.name,
      email: input.email ?? "",
      passwordHash,
      role: input.role,
      phoneNumber: input.phoneNumber ?? null,
      profileImage: input.profileImage ?? null,
      pageAccess: input.pageAccess,
    });
  },

  async updateUser(id: string, input: UpdateUserInput) {
    const patch: Record<string, any> = { ...input };
    if (input.password) {
      patch.passwordHash = await bcrypt.hash(input.password, 10);
      delete patch.password;
    }
    const updated = await userRepository.update(id, patch);
    if (!updated) throw new HttpError(404, "User not found");
    return updated;
  },

  async deleteUser(id: string) {
    const deleted = await userRepository.delete(id);
    if (!deleted) throw new HttpError(404, "User not found");
    return deleted;
  },

  async verifyCredentials(userId: string, password: string) {
    const user = await userRepository.findByUserId(userId);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;
    const { passwordHash: _p, ...safe } = user;
    return safe;
  },
};
