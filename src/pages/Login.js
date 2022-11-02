import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { loginFunc } from "../client/auth";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const history = useHistory();
  const schema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters"),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const { mutate, isLoading } = useMutation(loginFunc, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.user || "");
      toast.success("Login successfully!");
      history.push("/");
    },
    onError: () => toast.error("Invalid email or password!"),
  });

  return (
    <div className="boxWrapper">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit(mutate)}>
        <TextField {...register("email")} style={{ marginBottom: 20 }} placeholder="Email" label="Email" size="small" error={!!errors.email} helperText={errors.email?.message} />
        <TextField
          {...register("password")}
          style={{ marginBottom: 20 }}
          type="password"
          placeholder="Password"
          label="Password"
          size="small"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <LoadingButton color="success" loading={isLoading} variant="contained" type="submit">
          LOGIN
        </LoadingButton>
      </form>

      <p>
        Don't have an account? <Link to="/register">REGISTER</Link>
      </p>
    </div>
  );
}

export default Login;
