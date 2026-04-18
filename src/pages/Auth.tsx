<<<<<<< HEAD
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Plane,
  Mountain,
  Palmtree,
  Compass,
  Camera,
  Luggage,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const decorations = [
  {
    Icon: Plane,
    className: "top-[8%] left-[6%]",
    iconClass: "w-20 h-20 text-sky-400",
    floatY: [-8, 10, -8],
    rotate: [-8, 6, -8],
    duration: 7,
    delay: 0,
  },
  {
    Icon: Luggage,
    className: "top-[10%] right-[10%]",
    iconClass: "w-20 h-20 text-orange-400",
    floatY: [0, -12, 0],
    rotate: [4, -4, 4],
    duration: 8,
    delay: 0.4,
  },
  {
    Icon: Mountain,
    className: "bottom-[18%] left-[8%]",
    iconClass: "w-24 h-24 text-emerald-500",
    floatY: [8, -10, 8],
    rotate: [-3, 3, -3],
    duration: 9,
    delay: 0.8,
  },
  {
    Icon: Palmtree,
    className: "bottom-[14%] right-[8%]",
    iconClass: "w-24 h-24 text-lime-500",
    floatY: [0, 14, 0],
    rotate: [5, -5, 5],
    duration: 8.5,
    delay: 1.1,
  },
  {
    Icon: Compass,
    className: "top-[50%] left-[10%]",
    iconClass: "w-18 h-18 text-cyan-500",
    floatY: [-6, 10, -6],
    rotate: [-10, 10, -10],
    duration: 6.5,
    delay: 0.6,
  },
  {
    Icon: Camera,
    className: "top-[52%] right-[10%]",
    iconClass: "w-18 h-18 text-rose-400",
    floatY: [0, -10, 0],
    rotate: [6, -6, 6],
    duration: 7.5,
    delay: 1.2,
  },
];

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/", { replace: true });
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast({
        title: "Lỗi đăng nhập Google",
        description: error.message,
        variant: "destructive",
      });
=======
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Đăng nhập thành công! 🎉" });
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast({
          title: "Đăng ký thành công! 🎉",
          description: "Kiểm tra email để xác nhận tài khoản nhé.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } finally {
>>>>>>> e65370b8647cb5ddf1e3993d4f819f965960e4f7
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-6">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[8%] right-[10%] w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl"
          animate={{
            x: [0, -24, 0],
            y: [0, 16, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-28 left-[18%] w-[28rem] h-[28rem] bg-amber-100/30 rounded-full blur-3xl"
          animate={{
            x: [0, 18, 0],
            y: [0, -22, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Big floating travel icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {decorations.map(
          (
            { Icon, className, iconClass, floatY, rotate, duration, delay },
            index
          ) => (
            <motion.div
              key={index}
              className={`absolute ${className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0.18, 0.35, 0.18],
                y: floatY,
                rotate,
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className={iconClass} strokeWidth={1.8} />
            </motion.div>
          )
        )}
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          className="rounded-[2rem] border border-border/60 bg-background/80 backdrop-blur-xl px-8 py-10 shadow-2xl"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(0,0,0,0.08)",
                  "0 14px 36px rgba(16,185,129,0.18)",
                  "0 10px 30px rgba(0,0,0,0.08)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </motion.div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Jourstic – Khám Phá Việt Nam
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Đăng nhập để tiếp tục hành trình
              </p>
            </div>
          </div>

          <div className="w-full mt-8">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="h-14 w-full rounded-2xl text-base font-semibold shadow-lg flex items-center justify-center gap-3 bg-white text-black border border-gray-300 hover:bg-primary/10 hover:text-black transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {loading ? "Đang chuyển hướng..." : "Tiếp tục với Google"}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Mở bản đồ và bắt đầu chuyến đi của bạn
          </p>
        </motion.div>
      </motion.div>
=======
    <div className="h-screen w-full max-w-lg mx-auto relative overflow-hidden bg-background flex flex-col items-center justify-center px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <MapPin className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Khám Phá Việt Nam
          </h1>
          <p className="text-muted-foreground text-sm text-center">
            {isLogin ? "Đăng nhập để tiếp tục hành trình" : "Tạo tài khoản để bắt đầu khám phá"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-card border-border rounded-xl px-4"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Mật khẩu</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12 bg-card border-border rounded-xl px-4 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 rounded-xl text-base font-semibold mt-2 shadow-lg"
          >
            {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </form>

        {/* Toggle */}
        <p className="text-sm text-muted-foreground">
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-semibold hover:underline"
          >
            {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </p>
      </div>
>>>>>>> e65370b8647cb5ddf1e3993d4f819f965960e4f7
    </div>
  );
};

<<<<<<< HEAD
export default Auth;
=======
export default Auth;
>>>>>>> e65370b8647cb5ddf1e3993d4f819f965960e4f7
