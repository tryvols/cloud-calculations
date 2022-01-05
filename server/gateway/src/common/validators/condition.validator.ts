import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    Validate,
} from 'class-validator';

type Condition = (o: any) => boolean;

@ValidatorConstraint({ name: "condition", async: false })
export class ConditionValidator implements ValidatorConstraintInterface {
    validate(text: any, args: ValidationArguments) {
        const condition: Condition = args.constraints[0];
        return condition(args.object);
    }

    defaultMessage(args: ValidationArguments) {
        return `Condition of the field ${args.property} is failed!`;
    }
}

export const ValidIfCondition = (condition: Condition, message?: string) => {
    return Validate(
        ConditionValidator,
        [condition],
        message ? { message } : undefined,
    );
}