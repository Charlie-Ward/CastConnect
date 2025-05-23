import { z } from 'zod';

//Creating the format for the sign up form
export const SignUpSchema = z.object({
    username:z.string().min(3, {
        message: "Username must be at least 3 characters"
    }),
    email:z.string().email().refine(value => !!value, {
        message: "Email is mandatory and should be a valid email address"
    }),
    password:z.string()
        .min(8, {message: "Password must be at least 8 characters"})
        .max(15, {message: "Password must not be more than 15 characters"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 
            'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&) and be between 8 to 15 characters long.'
        )
        .refine(value => !!value, {
            message:"Please enter a password"
    }),
    confirmpassword:z.string()
        .refine(value => !!value, {
            message:"Please confirm your password"
    }),
}).refine((data) => data.password === data.confirmpassword, {
    message:"Password did not match",
    path:["confirmpassword"]
})

//Creating the format for the sign in form
export const SignInSchema = z.object({
    email:z.string().email().refine(value => !!value, {
        message: "Email is mandatory and should be a valid email address"
    }),
    password:z.string()
        .min(8, {message: "Password must be at least 8 characters"})
        .max(15, {message: "Password must not be more than 15 characters"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 
            'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&) and be between 8 to 15 characters long.'
        )
        .refine(value => !!value, {
            message:"Please enter a password"
    })
})