import {describe, expect, test} from '@jest/globals';
import UserService from "./user.service";

describe('UserService', () => {
    test('should create a user', async () => {
            const user = await UserService.createUser(
                "John Doe",
                "john@doe.com",
                "password123"
            );
            expect(user).toHaveProperty('_id');
            expect(user.name).toBe("John Doe");
            expect(user.email).toBe("john@doe.com");
        }
    )
});