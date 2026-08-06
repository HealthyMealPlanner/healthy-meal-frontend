import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/common/Button";
import orderConfirmedImage from "../../assets/images/order-confirmed.svg";

function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="flex min-h-screen w-full flex-col">

        {/* Illustration */}
        <div className="flex justify-center pt-16">
          <img
            src={orderConfirmedImage}
            alt="Password reset successful"
            className="h-40 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <div className="mt-10 text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            Password Reset Successful!🎉
          </h1>

          <p className="mx-auto mt-2 max-w-sm px-4 text-sm leading-5 text-slate">
            Your password has been changed
            <br />
            successfully. You can now log in with
            <br />
            your new credentials.
          </p>
        </div>

        {/* Back to Login */}
        <div className="mt-auto pb-8 pt-16">
          <Button
            type="button"
            onClick={() => navigate("/login")}
            className="h-12 rounded-xl"
          >
            Back to Login
          </Button>
        </div>

      </div>
    </AuthLayout>
  );
}

export default ResetSuccess;