import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


// Zod is a TypeScript-first schema declaration and validation library. 
// Zod will automatically infer the static TypeScript type for our data structure and we only declare a validator once. 
// Zod eliminates the duplicative type declaration once in Zod and again in TypeScript
// as below I am required to have a "Schema" this will be inferred in the type we pass below

const validationSchema = z
  .object({
    firstName: z.string().min(1, { message: "This field is required!" }),
    lastName: z.string().min(1, { message: "This field is required!" }),
    email: z.string().min(1, { message: "This field is required!" })
    .email({message: "Must be a valid email!"}),
    // phone: z.string()
    // .min(13, { message: 'Invalid phone number (Ex: +39 XXXXXXXXXX)' })
    // .refine((val) => !Number.isNaN(parseInt(val, 13)), {
    //   message: "Invalid phone number (Ex: +39 XXXXXXXXXX)"
    // }),
    phone: z.coerce.number({ invalid_type_error: "Enter a valid phone number! (Ex: +39 XXXXXXXXXX)"})
    .min(1, {message: "This field is required!"}),
    password: z.string().min(8, { message: "Password must be atleast 8 characters!" }),
    confirmPassword: z.string().min(1, { message: "This field is required!" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
  })

  // we need to validate to match both password and confirmPassword. 
  // Zod lets us provide custom validation logic via refinements i.e. refine.

  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match!",
  });

  // here we are extracting the type as I said earlier above the Schema
  
type ValidationSchema = z.infer<typeof validationSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.firstName && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="firstName"
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs italic text-red-500 mt-2 ">
              {errors.firstName?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.lastName && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.lastName?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.email && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="phone"
        >
          Phone number
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.phone && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="phone"
          type="text"
          placeholder="Phone number"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.phone?.message}
          </p>
        )}
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.password && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="c_password"
          >
            Confirm Password
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.confirmPassword && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="c_password"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <input 
        type="checkbox" 
        id="terms" 
        {...register("terms")} />
        <label
          htmlFor="terms"
          className={`ml-2 mb-2 text-sm font-bold ${
            errors.terms ? "text-red-500" : "text-gray-700"
          }`}
        >
          Accept Terms & Conditions
        </label>
        {errors.terms && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.terms?.message}
          </p>
        )}
      </div>
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-violet-600 rounded-full hover:bg-violet-400  hover:text-gray-800 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register Account
        </button>
      </div>
      <hr className="mb-6 border-t" />
      <div className="text-center">
        <a
          className="inline-block text-sm text-violet-600 text  hover:text-blue-800"
          href="#test"
        >
          Forgot Password?
        </a>
      </div>
      <div className="text-center">
        <a
          className="inline-block text-sm text-violet-600  hover:text-blue-800"
          href="./index.html"
        >
          Already have an account? Login!
        </a>
      </div>
    </form>
  );
};

export default Form;