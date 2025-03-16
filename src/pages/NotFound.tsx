
import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-blue p-4">
      <div className="glass-card p-8 max-w-lg text-center animate-page-transition opacity-0">
        <div className="flex justify-center mb-6">
          <Shield className="h-16 w-16 text-cyber-green" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-white">404</h1>
        <p className="text-2xl font-medium text-cyber-green mb-6">Access Denied</p>
        
        <p className="text-gray-300 mb-8">
          The page you're looking for has been moved to a secure location or doesn't exist. Our security protocols prevent unauthorized access.
        </p>
        
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-5 py-3 bg-cyber-green text-cyber-blue font-medium rounded-md hover:bg-cyber-light-green transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Return to Safe Zone
        </button>
      </div>
    </div>
  );
};

export default NotFound;
