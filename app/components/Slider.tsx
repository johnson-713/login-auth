"use client";

export const Slider = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsLogin: any;
}) => {
  return (
    <div className="flex justify-between shadow-md cursor-pointer bg-gray-200 rounded-lg">
      <div
        onClick={() => setIsLogin(false)}
        className={`w-1/2 text-center py-2 hover:bg-white hover:text-black transition-colors duration-300 ${
          !isLogin
            ? "text-black bg-white rounded-lg"
            : "text-[#808080] bg-gray-200 rounded-l-lg"
        }`}
      >
        Sign up
      </div>
      <div
        onClick={() => setIsLogin(true)}
        className={`w-1/2 text-center py-2 hover:bg-white hover:text-black   transition-colors duration-300 ${
          isLogin
            ? "text-black bg-white rounded-lg"
            : "text-[#808080] bg-gray-200 rounded-r-lg"
        }`}
      >
        Log in
      </div>
    </div>
  );
};
