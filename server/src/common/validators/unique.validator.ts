import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    Validate,
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { ObjectType, Connection } from "typeorm";

@ValidatorConstraint({ name: "unique", async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
    constructor(private readonly connection: Connection) {}

    async validate(text: any, args: ValidationArguments) {
        const repository = await this.connection.getRepository(args.constraints[0]);
        const result = await repository.findOne({
            [args.property]: text
        });
        return !result;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} field must contains unique value!`;
    }
}

export const Unique = (entity: ObjectType<object>, message?: string) => {
    return Validate(
        UniqueValidator,
        [entity],
        message ? { message } : undefined,
    );
}