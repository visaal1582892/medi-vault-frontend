const LoadingPage = () => {
  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">

        {/* App Name */}
        <h1 className="text-slate-100 text-3xl font-semibold tracking-wide">
          MEDI VAULT
        </h1>

        {/* Loader */}
        <div className="relative w-16 h-16">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-100/30 animate-spin"></div>

          {/* Inner pulsing core */}
          <div className="absolute inset-2 rounded-full bg-slate-100 animate-pulse"></div>
        </div>

        {/* Subtitle */}
        <p className="text-slate-100/80 text-sm tracking-widest uppercase">
          Securing your data
        </p>

      </div>
    </div>
  );
};

export default LoadingPage;
