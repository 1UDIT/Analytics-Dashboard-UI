import { useNavigate } from "react-router-dom";
import "./index.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Auth } from "./Api/upload";

type LoginForm = {
  userName: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
   const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const uploadMutation = useMutation({
    mutationFn: Auth,
    onSuccess: (data) => {
      queryClient.setQueryData(["uploadedData"], data);
      navigate("/dashboard"); // ✅ navigate here
    },
  });

  const submit = (data: LoginForm) => {

    uploadMutation.mutate(
      {
        userName: data.userName,
        password: data.password,
      },
      {
        onSuccess: () => {
          alert("File uploaded successfully!"); 
          navigate("/dashboard");
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full bg-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-[1400px] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT: Form */}
          <div className="flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900">
                  Login <span className="align-middle">✌️</span>
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  How do i get started lorem ipsum dolor at?
                </p>
              </div>

              {/* Social buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="cursor-not-allowed flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <GoogleIcon />
                  Sign in with Google
                </button>

                <button
                  type="button"
                  className="cursor-not-allowed flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <FacebookIcon />
                  Sign in with Facebook
                </button>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px w-full bg-slate-200" />
                <span className="shrink-0 text-xs text-slate-400">
                  or Sign in with UserName
                </span>
                <div className="h-px w-full bg-slate-200" />
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit(submit)}>
                <input
                  type="text"
                  placeholder="Enter your User Name"
                  {...register("userName", { required: "Username is required" })}
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm"
                />

                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.userName.message}
                  </p>
                )}

                <input
                  type="password"
                  placeholder="Enter your Password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm"
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="text-sm font-medium text-violet-600 hover:text-violet-700"
                  >
                    Forget Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-violet-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.99]"
                >
                  Login
                </button>
              </form>

              <p className="mt-10 text-center text-xs text-slate-400">
                ©{new Date().getFullYear()} Demo All Right Reserved.
              </p>
            </div>
          </div>

          {/* RIGHT: Hero */}
          <div className="relative hidden overflow-hidden lg:block">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600" />

            {/* Parallax glowing blobs */}
            <div className="absolute inset-0 parallax-slow">
              <div className="glow-blob absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/25" />
              <div className="glow-blob absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/20" />
            </div>

            {/* Parallax wave lines (SVG overlay) */}
            <div className="absolute inset-0 parallax-med opacity-80">
              <svg
                className="h-full w-full"
                viewBox="0 0 1200 800"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="wave-glow"
                  d="M0,120 C180,80 260,220 420,180 C610,130 640,40 820,90 C980,130 1030,250 1200,210"
                />
                <path
                  className="wave-glow-2"
                  d="M0,260 C160,220 320,360 480,320 C640,280 710,160 860,210 C1020,260 1080,390 1200,350"
                />
                <path
                  className="wave-glow"
                  d="M0,420 C200,380 260,540 420,500 C600,460 680,320 840,370 C1000,420 1050,560 1200,520"
                />
                <path
                  className="wave-glow-2"
                  d="M0,600 C170,560 310,690 470,660 C650,630 730,520 880,560 C1030,600 1100,720 1200,690"
                />
              </svg>
            </div>

            {/* Subtle circle rings (extra depth) */}
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/10 parallax-fast" />
            <div className="absolute -left-20 top-20 h-[520px] w-[520px] rounded-full border border-white/10 parallax-med" />
            <div className="absolute -left-10 top-52 h-[520px] w-[520px] rounded-full border border-white/10 parallax-slow" />

            {/* Card */}
            <div className="relative flex h-full items-center justify-center p-10">
              <div className="relative w-full max-w-xl rounded-3xl bg-white/15 p-10 shadow-2xl backdrop-blur-md animate-fadeSlideIn animate-floatY">
                <div className="max-w-sm text-white">
                  <h2 className="text-4xl font-extrabold leading-tight">
                    Very good works are waiting for you{" "}
                    <span className="align-middle">✌️</span>
                  </h2>
                  <p className="mt-2 text-lg font-semibold">Login Now</p>
                </div>

                {/* Avatar image placeholder */}
                <div className="mt-10 flex items-end justify-between">
                  <div className="relative">
                    <div className="h-56 w-44 rounded-2xl bg-white/20" />
                    <div className="absolute -left-5 -bottom-5 grid h-12 w-12 place-items-center rounded-full bg-white shadow-lg animate-softPulse">
                      <span className="text-xl">🤝</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-lg animate-softPulse">
                      <span className="text-xl">💯</span>
                    </div>

                  </div>
                </div>

                {/* Floating handshake */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                  <div className="absolute -left-5 -bottom-5 grid h-12 w-12 place-items-center rounded-full bg-white shadow-lg animate-softPulse">
                    <span className="text-xl">🤝</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Simple inline icons (no deps) */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.69 32.657 29.254 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.233 0-9.657-3.322-11.29-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.03 12.03 0 0 1-4.087 5.565l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06C2 17.08 5.657 21.23 10.438 22v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.475h-1.26c-1.243 0-1.63.778-1.63 1.574v1.89h2.773l-.443 2.91h-2.33V22C18.343 21.23 22 17.08 22 12.06z"
      />
    </svg>
  );
}
