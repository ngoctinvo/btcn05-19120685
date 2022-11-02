import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { registerFunc } from "../client/auth";

const Register = () => {
  const history = useHistory();
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Confirmed password does not match"),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const { mutate, isLoading } = useMutation(registerFunc, {
    onSuccess: () => {
      toast.success("Register successfully!");
      history.push("/login");
    },
    onError: (res) => toast.error(res.error || "Register failed!"),
  });

  return (
    <div className="boxWrapper">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit(mutate)}>
        <TextField
          style={{ marginBottom: 20 }}
          placeholder="Your name..."
          label="Name"
          size="small"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name")}
        />
        <TextField
          style={{ marginBottom: 20 }}
          placeholder="Your email..."
          label="Email"
          size="small"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          style={{ marginBottom: 20 }}
          type="password"
          placeholder="Your password..."
          label="Password"
          size="small"
          error={!!errors.password}
          helperText={errors?.password?.message}
          {...register("password")}
        />
        <TextField
          style={{ marginBottom: 20 }}
          type="password"
          placeholder="Confirm password"
          label="Confirm password"
          size="small"
          error={!!errors.confirmedPassword}
          helperText={errors?.confirmedPassword?.message}
          {...register("confirmedPassword")}
        />
        <LoadingButton color="success" loading={isLoading} variant="contained" type="submit">
          REGISTER
        </LoadingButton>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
