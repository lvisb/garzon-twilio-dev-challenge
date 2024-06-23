import { registerDecorator, ValidationOptions, ValidationArguments, isPhoneNumber } from 'class-validator';
import { UpdateUserDto } from '../dtos/update-user.dto.js';

export function OptionalPhoneNumber(property: string, validationOptions?: ValidationOptions) {
  return function (object: UpdateUserDto, propertyName: string) {
    registerDecorator({
      name: 'optionalPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (!!relatedValue || value !== '') 
            return isPhoneNumber(value)

          return true
        }
      },
    });
  };
}

