import { z } from 'zod';

import { messageValidationREQ, messageValidationRES } from '@/typescript/message';

export const messageValidater = z
  .string()
  .min(2, 'Message Must be atleast 2 Characters')
  .max(200, 'Message Must be less than 200 Characters');

export const validateMessage = (input: messageValidationREQ): messageValidationRES => {
  const { message } = input;
  if (!message) {
    return {
      status: false,
      message: 'Please Provide Message',
    };
  }

  const result = messageValidater.safeParse(message);

  if (!result.success) {
    return {
      status: false,
      message: result.error.errors[0].message,
    };
  }

  return {
    status: true,
    message: 'Message successfully validated',
  };
};
